import Link from "next/link";
import { 
  Terminal, 
  Layers, 
  Code2, 
  BookOpen, 
  Search, 
  Zap, 
  ChevronRight,
  ArrowRight,
  Cpu,
  Database,
  Lock,
  Brain,
  Network,
  FileText,
  GitBranch,
  Hash,
  BarChart3,
  Binary,
  Terminal as TerminalIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem, TypingText, SlideIn } from "@/components/ui/animations";

const stats = [
  { label: "Algorithms", value: "1,247", icon: Code2 },
  { label: "Categories", value: "52", icon: Layers },
  { label: "Implementations", value: "8,500+", icon: TerminalIcon },
  { label: "Contributors", value: "450+", icon: GitBranch },
];

const categories = [
  { 
    name: "Sorting", 
    description: "Element arrangement algorithms", 
    count: 45, 
    slug: "sorting",
    icon: BarChart3,
    examples: ["Quick Sort", "Merge Sort", "Heap Sort", "Radix Sort"]
  },
  { 
    name: "Searching", 
    description: "Data retrieval methods", 
    count: 38, 
    slug: "searching",
    icon: Search,
    examples: ["Binary Search", "BFS", "DFS", "A* Search"]
  },
  { 
    name: "Graph", 
    description: "Network traversal & paths", 
    count: 52, 
    slug: "graph",
    icon: Network,
    examples: ["Dijkstra", "Bellman-Ford", "Prim's", "Kruskal's"]
  },
  { 
    name: "Dynamic Programming", 
    description: "Optimization techniques", 
    count: 67, 
    slug: "dynamic-programming",
    icon: Brain,
    examples: ["Knapsack", "LCS", "Fibonacci", "Edit Distance"]
  },
  { 
    name: "Cryptography", 
    description: "Encryption & security", 
    count: 31, 
    slug: "cryptography",
    icon: Lock,
    examples: ["AES", "RSA", "SHA-256", "bcrypt"]
  },
  { 
    name: "Machine Learning", 
    description: "AI & prediction models", 
    count: 89, 
    slug: "machine-learning",
    icon: Cpu,
    examples: ["Gradient Descent", "K-Means", "SVM", "PCA"]
  },
  { 
    name: "String Algorithms", 
    description: "Text processing", 
    count: 42, 
    slug: "string",
    icon: FileText,
    examples: ["KMP", "Rabin-Karp", "Z-Algorithm", "Boyer-Moore"]
  },
  { 
    name: "Data Structures", 
    description: "Organization methods", 
    count: 73, 
    slug: "data-structures",
    icon: Database,
    examples: ["Arrays", "Trees", "Heaps", "Tries"]
  },
  { 
    name: "Geometric", 
    description: "Spatial computations", 
    count: 28, 
    slug: "geometric",
    icon: Binary,
    examples: ["Convex Hull", "Line Intersection", "Voronoi"]
  },
  { 
    name: "Company-Specific", 
    description: "Industry algorithms", 
    count: 512, 
    slug: "company-specific",
    icon: Hash,
    examples: ["PageRank", "Collaborative Filtering", "Load Balancing"]
  },
];

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find algorithms by name, category, complexity, or use case with intelligent fuzzy matching.",
  },
  {
    icon: Code2,
    title: "Multi-Language Code",
    description: "Copy-paste implementations in Python, JavaScript, C++, Java, Go, Rust, and more.",
  },
  {
    icon: TerminalIcon,
    title: "Interactive Visualizations",
    description: "Watch algorithms in action with step-by-step animated visualizations.",
  },
  {
    icon: BookOpen,
    title: "Deep Documentation",
    description: "Detailed explanations, complexity analysis, and real-world use cases.",
  },
];

const popularAlgorithms = [
  { name: "Quick Sort", category: "Sorting", complexity: "O(n log n)" },
  { name: "Dijkstra's Algorithm", category: "Graph", complexity: "O((V+E) log V)" },
  { name: "A* Search", category: "Graph", complexity: "O(E)" },
  { name: "K-Means Clustering", category: "Machine Learning", complexity: "O(n * k * i)" },
  { name: "AES Encryption", category: "Cryptography", complexity: "O(n)" },
  { name: "Knapsack Problem", category: "Dynamic Programming", complexity: "O(nW)" },
  { name: "LRU Cache", category: "Data Structures", complexity: "O(1)" },
  { name: "Boyer-Moore", category: "String", complexity: "O(nm)" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative border-b border-[#262626] overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 dot-matrix opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <StaggerContainer>
            {/* Terminal prompt */}
            <StaggerItem className="mb-6">
              <div className="flex items-center gap-2 text-[#525252] text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#ff5f56] rounded-full" />
                  <span className="w-2 h-2 bg-[#ffbd2e] rounded-full" />
                  <span className="w-2 h-2 bg-[#27c93f] rounded-full" />
                </span>
                <span className="ml-2">~ algoshare</span>
              </div>
            </StaggerItem>
            
            {/* Main heading */}
            <StaggerItem>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                <span className="text-[#ffffff]">Every Algorithm.</span>
                <br />
                <span className="text-[#a0a0a0]">One Platform.</span>
              </h1>
            </StaggerItem>
            
            {/* Typing description */}
            <StaggerItem className="mb-8">
              <p className="text-lg md:text-xl text-[#737373] max-w-2xl font-mono">
                <TypingText 
                  text="The world's largest algorithm database. From sorting to machine learning, cryptography to graph theory." 
                  speed={30}
                />
              </p>
            </StaggerItem>
            
            {/* CTA Buttons */}
            <StaggerItem className="mb-12">
              <div className="flex flex-wrap gap-4">
                <Link href="/algorithms">
                  <Button size="lg" className="gap-2 bg-[#ffffff] text-[#000000] hover:bg-[#e5e5e5]">
                    <Zap className="h-4 w-4" />
                    Browse Algorithms
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="gap-2 border-[#262626] text-[#a0a0a0] hover:text-[#ffffff] hover:border-[#525252]">
                    <BookOpen className="h-4 w-4" />
                    Documentation
                  </Button>
                </Link>
              </div>
            </StaggerItem>
            
            {/* Quick stats */}
            <StaggerItem>
              <div className="flex flex-wrap gap-8 md:gap-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="group">
                    <div className="flex items-center gap-2 text-[#525252] mb-1">
                      <stat.icon className="h-4 w-4 group-hover:text-[#ffffff] transition-colors" />
                      <span className="text-xs uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-[#ffffff] group-hover:glow-text transition-all">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Popular Algorithms */}
      <section className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-[#525252] text-sm">
              <span className="text-[#525252]">$</span>
              <span className="text-[#a0a0a0]">./popular-algorithms.sh</span>
            </div>
            <Link href="/algorithms" className="text-sm text-[#525252] hover:text-[#ffffff] transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularAlgorithms.map((algo, index) => (
              <FadeIn key={algo.name} delay={index * 0.05}>
                <Link href={`/algorithms/${algo.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="group bg-[#111111] border border-[#262626] p-3 hover:border-[#525252] transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-[#ffffff] group-hover:glow-text text-sm">
                        {algo.name}
                      </span>
                      <ChevronRight className="h-3 w-3 text-[#525252] group-hover:text-[#ffffff] transition-colors" />
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#525252]">
                      <span>{algo.category}</span>
                      <span>•</span>
                      <span className="font-mono">{algo.complexity}</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-[#525252] mb-2">
                <span className="text-[#525252]">$</span>
                <span className="text-[#a0a0a0]">ls categories/</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Algorithm Categories</h2>
            </div>
            <Link href="/algorithms">
              <Button variant="ghost" className="gap-2 text-[#a0a0a0] hover:text-[#ffffff]">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <FadeIn key={category.slug} delay={index * 0.05}>
                <Link href={`/algorithms?category=${category.slug}`}>
                  <Card className="bg-[#0a0a0a] border-[#262626] hover:border-[#525252] hover:bg-[#111111] transition-all cursor-pointer group h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <category.icon className="h-5 w-5 text-[#525252] group-hover:text-[#ffffff] transition-colors" />
                        <span className="text-xs text-[#525252]">{category.count}</span>
                      </div>
                      <CardTitle className="text-base mt-2">{category.name}</CardTitle>
                      <CardDescription className="text-[#737373] text-xs">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {category.examples.slice(0, 3).map((example) => (
                          <span 
                            key={example}
                            className="text-xs px-1.5 py-0.5 bg-[#1a1a1a] text-[#737373]"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-2 text-[#525252] mb-2">
            <span className="text-[#525252]">$</span>
            <span className="text-[#a0a0a0]">cat features.md</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Everything You Need</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={index * 0.1}>
                <Card className="bg-[#0a0a0a] border-[#262626] h-full">
                  <CardHeader>
                    <feature.icon className="h-8 w-8 mb-2 text-[#a0a0a0]" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#737373]">{feature.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-2 text-[#525252] mb-4">
            <span className="text-[#525252]">$</span>
            <span className="text-[#a0a0a0]">./contribute.sh</span>
          </div>
          <Card className="bg-[#111111] border-[#262626] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#262626] via-[#525252] to-[#262626]" />
            <CardContent className="py-12 text-center">
              <Terminal className="h-12 w-12 mx-auto mb-4 text-[#525252]" />
              <h2 className="text-2xl font-bold mb-4">Contribute to AlgoShare</h2>
              <p className="text-[#737373] mb-6 max-w-lg mx-auto">
                Know an algorithm that&apos;s missing from our database? 
                Submit it to help build the most comprehensive algorithm collection.
              </p>
              <Link href="/submit">
                <Button className="gap-2">
                  <Code2 className="h-4 w-4" />
                  Submit Algorithm
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-[#525252]" />
              <span className="font-bold">
                <span className="text-[#a0a0a0]">algo</span>
                <span className="text-[#ffffff]">share</span>
              </span>
              <span className="text-[#525252]">_</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#525252]">
              <span className="flex items-center gap-1">
                <span className="text-[#737373]">Built for</span>
                <span className="text-[#a0a0a0]">developers</span>
                <span className="text-[#737373]">, by</span>
                <span className="text-[#a0a0a0]">developers</span>
              </span>
              <span className="text-[#404040]">|</span>
              <span>© 2024 AlgoShare</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
