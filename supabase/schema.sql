-- AlgoShare Database Schema for Supabase
-- Run this in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  github_username TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Algorithm categories
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  algorithm_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Algorithms table
CREATE TABLE public.algorithms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  subcategory TEXT,
  time_complexity_best TEXT,
  time_complexity_average TEXT,
  time_complexity_worst TEXT,
  space_complexity TEXT,
  description TEXT,
  use_cases TEXT[],
  implementations JSONB,
  related_algorithms TEXT[],
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  tags TEXT[],
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_verified BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Algorithm submissions (for review)
CREATE TABLE public.submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  algorithm_name TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  description TEXT,
  time_complexity TEXT,
  space_complexity TEXT,
  implementations JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewer_notes TEXT,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User favorites/bookmarks
CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  algorithm_id UUID REFERENCES public.algorithms(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, algorithm_id)
);

-- Algorithm ratings/reviews
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  algorithm_id UUID REFERENCES public.algorithms(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, algorithm_id)
);

-- User submissions history
CREATE TABLE public.user_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  submission_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_algorithms_category ON public.algorithms(category_id);
CREATE INDEX idx_algorithms_slug ON public.algorithms(slug);
CREATE INDEX idx_algorithms_difficulty ON public.algorithms(difficulty);
CREATE INDEX idx_algorithms_name_search ON public.algorithms USING gin(to_tsvector('english', name));
CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_favorites_algorithm ON public.algorithms(view_count);
CREATE INDEX idx_reviews_algorithm ON public.reviews(algorithm_id);
CREATE INDEX idx_submissions_status ON public.submissions(status);
CREATE INDEX idx_profiles_username ON public.profiles(username);

-- Row Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.algorithms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Algorithms policies
CREATE POLICY "Anyone can view algorithms" 
  ON public.algorithms FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view verified algorithms" 
  ON public.algorithms FOR SELECT 
  USING (is_verified = true OR auth.uid() = author_id);

-- Submissions policies
CREATE POLICY "Users can view their own submissions" 
  ON public.submissions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions" 
  ON public.submissions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending submissions" 
  ON public.submissions FOR UPDATE 
  USING (auth.uid() = user_id AND status = 'pending');

-- Favorites policies
CREATE POLICY "Users can view own favorites" 
  ON public.favorites FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites" 
  ON public.favorites FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own favorites" 
  ON public.favorites FOR DELETE 
  USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" 
  ON public.reviews FOR SELECT 
  USING (true);

CREATE POLICY "Users can create reviews" 
  ON public.reviews FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" 
  ON public.reviews FOR UPDATE 
  USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update algorithm count in category
CREATE OR REPLACE FUNCTION public.update_category_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.categories
  SET algorithm_count = (
    SELECT COUNT(*) FROM public.algorithms 
    WHERE category_id = NEW.category_id
  )
  WHERE id = NEW.category_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update category count
CREATE TRIGGER on_algorithm_created
  AFTER INSERT ON public.algorithms
  FOR EACH ROW EXECUTE FUNCTION public.update_category_count();

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Sorting', 'sorting', 'Algorithms for arranging elements in a specific order', 'BarChart3'),
  ('Searching', 'searching', 'Algorithms for finding elements in data structures', 'Search'),
  ('Graph', 'graph', 'Algorithms for traversing and analyzing graphs', 'Network'),
  ('Dynamic Programming', 'dynamic-programming', 'Algorithms that solve problems by breaking them into subproblems', 'Brain'),
  ('Cryptography', 'cryptography', 'Algorithms for encryption and security', 'Lock'),
  ('Machine Learning', 'machine-learning', 'Algorithms for AI and prediction models', 'Cpu'),
  ('String Algorithms', 'string', 'Algorithms for text processing and pattern matching', 'FileText'),
  ('Data Structures', 'data-structures', 'Ways to organize and store data', 'Database'),
  ('Geometric Algorithms', 'geometric', 'Algorithms for spatial computations', 'Binary'),
  ('Company-Specific', 'company-specific', 'Algorithms used by major tech companies', 'Hash')
ON CONFLICT (slug) DO NOTHING;
