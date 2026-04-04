# AlgoShare Data Seeding Pipeline

Complete automated pipeline to extract, enrich, and seed 500+ algorithms from TheAlgorithms GitHub organization into your Supabase database.

## Prerequisites

- Node.js 16+
- Supabase project with `algorithms` and `categories` tables
- Groq API key (free tier available)
- `.env.local` file with required credentials

## Setup

### 1. Get Your API Keys

**Groq API Key (Free):**
1. Visit https://console.groq.com/keys
2. Create a new API key
3. Copy it

**Supabase Credentials:**
1. Go to your Supabase project settings
2. Find your URL and Service Role Key
3. Copy them

### 2. Set Environment Variables

Create/update `.env.local`:

```bash
export GROQ_KEY="your_groq_api_key_here"
export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

Or add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export GROQ_KEY="your_groq_api_key_here"
export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your_service_role_key_here"
```

### 3. Create Supabase Tables

Run these SQL queries in your Supabase SQL editor:

**Categories Table:**
```sql
CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

**Algorithms Table:**
```sql
CREATE TABLE algorithms (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT,
  explanation TEXT,
  how_it_works TEXT[] DEFAULT ARRAY[]::TEXT[],
  time_complexity JSONB DEFAULT '{}'::JSONB,
  space_complexity TEXT,
  difficulty TEXT,
  implementations JSONB DEFAULT '{}'::JSONB,
  animation_steps JSONB[] DEFAULT ARRAY[]::JSONB[],
  use_cases TEXT[] DEFAULT ARRAY[]::TEXT[],
  pros TEXT[] DEFAULT ARRAY[]::TEXT[],
  cons TEXT[] DEFAULT ARRAY[]::TEXT[],
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  related_algorithms TEXT[] DEFAULT ARRAY[]::TEXT[],
  real_world_examples TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_algorithms_slug ON algorithms(slug);
CREATE INDEX idx_algorithms_category ON algorithms(category);
```

## Quick Start

Run the complete pipeline in one command:

```bash
npm run seed:all
```

This will:
1. Extract all algorithms from `Algorithms Data/` folder
2. Enrich each with explanations and visualizations using Groq AI
3. Insert everything into your Supabase database

**Estimated time:** ~30-60 minutes for 500+ algorithms (depends on API rate limits)

## Individual Commands

### Step 1: Extract

```bash
npm run extract
```

Scans all code files in `Algorithms Data/` and creates `raw-algorithms.json` with:
- Algorithm name (cleaned from filename)
- Category (inferred from folder structure)
- Language (from file extension)
- Raw source code

**Output:** `raw-algorithms.json`

### Step 2: Enrich

```bash
npm run enrich
```

Calls Groq API for each algorithm to generate:
- Short description
- Detailed markdown explanation
- Step-by-step breakdown
- Time/space complexity analysis
- Animation steps for visualization
- Use cases, pros, cons
- Related algorithms

**Features:**
- Saves progress after EVERY algorithm (crash-safe)
- Skips already enriched algorithms (resume-friendly)
- Automatic retry on failure
- 600ms delay between API calls (respects rate limits)

**Output:** `enriched-algorithms.json`

### Step 3: Seed

```bash
npm run seed
```

Reads enriched data and batch-inserts into Supabase in chunks of 20.

**Features:**
- Upserts by slug (safe to re-run)
- Auto-generates and updates categories
- Detailed progress logging
- Handles errors gracefully

## Monitoring Progress

### Extract
```
🔍 Scanning TheAlgorithms-All/ for code files...
✅ Found 500 unique algorithms
📝 Writing to raw-algorithms.json...
✨ Extraction complete! 500 algorithms extracted.
```

### Enrich
```
📊 Total algorithms: 500
✅ Already enriched: 0
⏳ To process: 500

⏳ [1/500] Bubble Sort...
✅ [1/500] Bubble Sort
⏳ [2/500] Merge Sort...
✅ [2/500] Merge Sort
... continues ...
🎉 Enrichment complete!
📝 Total enriched: 500
```

### Seed
```
📂 Loading enriched-algorithms.json...
📊 Total algorithms to seed: 500
🏷️  Seeding 25 categories...
✅ Categories seeded successfully

✅ Inserted chunk 1/25 (20 algorithms)
✅ Inserted chunk 2/25 (20 algorithms)
... continues ...
🎉 Seeding complete!
✅ Successfully inserted: 500
❌ Errors: 0
📊 Total: 500
```

## Troubleshooting

### GROQ_KEY not set
```
❌ GROQ_KEY environment variable not set
```
**Solution:** Export the key before running:
```bash
export GROQ_KEY="your_key"
npm run enrich
```

### Missing enriched-algorithms.json
```
❌ enriched-algorithms.json not found. Run "npm run extract" first.
```
**Solution:** Run extract step first:
```bash
npm run extract && npm run enrich
```

### Supabase connection failed
```
❌ Missing Supabase credentials
```
**Solution:** Check your `.env.local` has both:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

### Rate limit errors from Groq
The enrich script automatically:
- Retries once after 2 seconds
- Saves minimal data on failure
- Waits 600ms between calls

If still hitting limits, increase delay in `scripts/enrich.js`:
```javascript
const GROQ_DELAY_MS = 1000; // Change from 600
```

## File Structure

```
AlgoShare/
├── scripts/
│   ├── extract.js          # Step 1: Extract algorithms
│   ├── enrich.js           # Step 2: AI enrichment
│   ├── seed.js             # Step 3: Supabase seeding
│   └── README.md           # This file
├── raw-algorithms.json     # Step 1 output
├── enriched-algorithms.json# Step 2 output
├── Algorithms Data/        # Input: TheAlgorithms repos
├── .env.local              # Your credentials
└── package.json            # npm scripts
```

## Output Schema

Each algorithm in the database contains:

```javascript
{
  name: "Bubble Sort",
  slug: "bubble-sort",
  category: "Sorting",
  short_description: "Simple sorting algorithm that repeatedly swaps adjacent elements",
  explanation: "Detailed markdown...",
  how_it_works: ["Step 1...", "Step 2...", ...],
  time_complexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  space_complexity: "O(1)",
  difficulty: "Beginner",
  implementations: {
    Python: "# code...",
    JavaScript: "// code...",
    Java: "// code...",
    "C++": "// code..."
  },
  animation_steps: [
    {
      step: 1,
      description: "...",
      array: [5,3,8,1,9,2],
      highlight: [0, 1],
      action: "compare"
    },
    ...
  ],
  use_cases: ["..."],
  pros: ["..."],
  cons: ["..."],
  tags: ["sorting", "comparison", "beginner"],
  related_algorithms: ["Insertion Sort", "Selection Sort"],
  real_world_examples: ["..."]
}
```

## Performance Notes

- **Extract:** ~2-5 seconds for all repos
- **Enrich:** ~1-2 minutes per 100 algorithms (waiting for Groq API)
- **Seed:** ~30 seconds for 500 algorithms

Total time: ~1-2 hours for full 500+ algorithms

## Safety Features

✅ **Resume-friendly:** Each step saves progress incrementally
✅ **Idempotent:** Can re-run safely (upserts don't duplicate)
✅ **Fault-tolerant:** Handles API failures gracefully
✅ **Rate-limit aware:** Built-in delays and retries
✅ **Crash-safe:** Progress saved after every item

## Support

For issues or questions:
- Check the Troubleshooting section above
- Review Groq docs: https://console.groq.com
- Review Supabase docs: https://supabase.com/docs

## License

This pipeline is part of AlgoShare. See LICENSE for details.
