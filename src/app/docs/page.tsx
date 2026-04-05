import Link from "next/link";
import { 
  Terminal, 
  BookOpen, 
  ChevronRight, 
  Code2, 
  Zap,
  Clock,
  HardDrive,
  Users,
  GitBranch,
  FileText,
  Search,
  Lock,
  Database,
  Cpu,
  Layers,
  BarChart3,
  Network,
  Brain,
  FileSearch,
  Binary,
  Hash
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { categories, algorithms } from "@/data/algorithms";

const categoryIcons: Record<string, React.ElementType> = {
  "sorting": BarChart3,
  "searching": Search,
  "graph": Network,
  "dynamic-programming": Brain,
  "cryptography": Lock,
  "machine-learning": Cpu,
  "string": FileSearch,
  "data-structures": Database,
  "geometric": Binary,
  "company-specific": Hash,
};

const docSections = [
  {
    title: "Getting Started",
    description: "Learn the fundamentals of AlgoShare.",
    icon: Terminal,
    items: [
      { title: "Introduction", description: "What is AlgoShare and why use it?" },
      { title: "Quick Start", description: "Get up and running in 5 minutes" },
      { title: "Navigation", description: "How to find algorithms quickly" },
    ],
  },
  {
    title: "Algorithm Categories",
    description: "Deep dive into each algorithm category.",
    icon: Layers,
    items: categories.map(cat => ({
      title: cat.name,
      description: `${cat.algorithmCount} algorithms`
    })),
  },
  {
    title: "Using Algorithms",
    description: "Learn how to use and implement algorithms.",
    icon: Code2,
    items: [
      { title: "Complexity Analysis", description: "Understanding Big O notation" },
      { title: "Code Implementations", description: "Multi-language examples" },
      { title: "Visualizations", description: "See algorithms in action" },
    ],
  },
  {
    title: "Contributing",
    description: "Help build the algorithm database.",
    icon: Users,
    items: [
      { title: "Submitting Algorithms", description: "Add new algorithms to the database" },
      { title: "Code Style Guide", description: "Follow our coding standards" },
      { title: "Review Process", description: "How submissions are reviewed" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <StaggerContainer>
            <StaggerItem>
              <div className="flex items-center gap-2 text-[#525252] mb-4">
                <span className="text-[#525252]">$</span>
                <span className="text-[#a0a0a0]">cat docs/index.md</span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-[#737373] text-lg max-w-2xl mb-8">
                Everything you need to know about algorithms, from basic concepts 
                to advanced implementations. Built for developers, by developers.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="flex flex-wrap gap-4">
                <Link href="/algorithms" className="inline-flex items-center gap-2 text-[#ffffff] hover:text-[#a0a0a0] transition-colors">
                  <Code2 className="h-4 w-4" />
                  Browse Algorithms
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link href="/submit" className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-[#ffffff] transition-colors">
                  <Users className="h-4 w-4" />
                  Contribute
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ffffff]">{algorithms.length}+</div>
              <div className="text-sm text-[#525252]">Algorithms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ffffff]">{categories.length}</div>
              <div className="text-sm text-[#525252]">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ffffff]">6+</div>
              <div className="text-sm text-[#525252]">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#ffffff]">100%</div>
              <div className="text-sm text-[#525252]">Free</div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docSections.map((section, index) => (
            <FadeIn key={section.title} delay={index * 0.1}>
              <Card className="bg-[#0a0a0a] border-[#262626] hover:border-[#404040] transition-colors h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <section.icon className="h-5 w-5 text-[#a0a0a0]" />
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-[#737373]">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={`/docs/${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="group flex items-start gap-3"
                        >
                          <ChevronRight className="h-4 w-4 text-[#404040] mt-1 group-hover:text-[#ffffff] transition-colors flex-shrink-0" />
                          <div>
                            <div className="text-[#a0a0a0] group-hover:text-[#ffffff] transition-colors">
                              {item.title}
                            </div>
                            <div className="text-xs text-[#525252]">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Complexity Guide */}
      <div className="border-t border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-2 text-[#525252] mb-6">
            <span className="text-[#525252]">$</span>
            <span className="text-[#a0a0a0]">cat docs/complexity-guide.md</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Understanding Big O Notation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { complexity: "O(1)", name: "Constant", description: "Execution time doesn't depend on input size" },
              { complexity: "O(log n)", name: "Logarithmic", description: "Time increases logarithmically with input" },
              { complexity: "O(n)", name: "Linear", description: "Time increases directly with input size" },
              { complexity: "O(n log n)", name: "Linearithmic", description: "Common in efficient sorting algorithms" },
              { complexity: "O(n²)", name: "Quadratic", description: "Nested iterations over the input" },
              { complexity: "O(2^n)", name: "Exponential", description: "Time doubles with each input element" },
              { complexity: "O(n!)", name: "Factorial", description: "Extremely slow, often impractical" },
            ].map((item) => (
              <Card key={item.complexity} className="bg-[#111111] border-[#262626]">
                <CardContent className="pt-4">
                  <div className="font-mono text-lg text-[#ffffff] mb-1">{item.complexity}</div>
                  <div className="text-[#a0a0a0] text-sm font-medium mb-2">{item.name}</div>
                  <div className="text-xs text-[#525252]">{item.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="border-t border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8">Algorithm Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(0, 9).map((category) => {
              const Icon = categoryIcons[category.id] || Layers;
              return (
                <Link key={category.id} href={`/algorithms?category=${category.id}`}>
                  <Card className="bg-[#0a0a0a] border-[#262626] hover:border-[#525252] hover:bg-[#111111] transition-all cursor-pointer h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Icon className="h-6 w-6 text-[#737373]" />
                        <span className="text-xs text-[#525252]">{category.algorithmCount}</span>
                      </div>
                      <CardTitle className="text-lg mt-2">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[#737373]">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
