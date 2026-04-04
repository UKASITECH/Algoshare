import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, HardDrive, Sparkles, Tag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlgorithmDetailShell } from "@/components/algorithms/AlgorithmDetailShell";
import { CodeBlockImplementation } from "@/components/algorithms/CodeBlock";
import { highlightCode } from "@/lib/highlight-code";
import {
  algorithmsData,
  getAlgorithmById,
  getCategoryBadgeClasses,
  getDifficultyBadgeClasses,
} from "@/lib/algorithms-data";

const languageLabels: Record<CodeBlockImplementation["language"], string> = {
  python: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
  java: "Java",
  cpp: "C++",
  c: "C",
  go: "Go",
  rust: "Rust",
  plaintext: "Source",
};

function mapLanguage(sourceLanguage: string, sourceExtension: string): CodeBlockImplementation["language"] {
  const ext = sourceExtension.toLowerCase();
  const language = sourceLanguage.toLowerCase();

  if (ext === "py" || language === "python") return "python";
  if (ext === "js" || language === "javascript") return "javascript";
  if (ext === "ts" || language === "typescript") return "typescript";
  if (ext === "java" || language === "java") return "java";
  if (ext === "cpp" || ext === "cc" || ext === "cxx" || language.includes("plus-plus")) return "cpp";
  if (ext === "c" || ext === "h") return "c";
  if (ext === "go" || language === "go") return "go";
  if (ext === "rs" || language === "rust") return "rust";
  return "plaintext";
}

export default async function AlgorithmDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const algorithm = getAlgorithmById(id);

  if (!algorithm) {
    notFound();
  }

  const sourceCode = algorithm.sourcePreview || `// Source preview unavailable for ${algorithm.name}`;

  const sourceLanguage = mapLanguage(algorithm.sourceLanguage, algorithm.sourceExtension);
  const implementationsSource: CodeBlockImplementation[] = [
    {
      language: sourceLanguage,
      label: languageLabels[sourceLanguage],
      code: sourceCode,
      html: "",
    },
  ];

  const implementations = await Promise.all(
    implementationsSource.map(async (implementation) => ({
      ...implementation,
      html: await highlightCode(implementation.code, implementation.language),
    }))
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-slate-800 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link href="/algorithms">
            <Button variant="ghost" className="mb-6 gap-2 text-slate-400 hover:bg-slate-900 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back to Algorithms
            </Button>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Badge className={getCategoryBadgeClasses(algorithm.category)}>{algorithm.category}</Badge>
            <Badge className={getDifficultyBadgeClasses(algorithm.difficulty)}>{algorithm.difficulty}</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{algorithm.name}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">{algorithm.description}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5">
              <Clock className="h-4 w-4 text-slate-300" />
              Avg {algorithm.timeComplexity.average}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5">
              <HardDrive className="h-4 w-4 text-slate-300" />
              Space {algorithm.spaceComplexity}
            </span>
            {algorithm.origin ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5">
                <Sparkles className="h-4 w-4 text-slate-300" />
                {algorithm.origin}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/80 px-3 py-1.5">
              <BookOpen className="h-4 w-4 text-slate-300" />
              {algorithm.lineCount} lines
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <AlgorithmDetailShell
          algorithm={algorithm}
          implementations={implementations}
          highlightedLinesByStep={algorithm.animationSteps[0]?.highlightedLines ?? []}
        />

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-slate-800 bg-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="h-4 w-4 text-slate-300" />
                Explanation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-300">
              <div className="whitespace-pre-line">{algorithm.explanation}</div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-slate-800 bg-slate-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Tag className="h-4 w-4 text-slate-300" />
                  Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-300">
                {algorithm.useCases.map((useCase) => (
                  <div key={useCase} className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                    {useCase}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Zap className="h-4 w-4 text-slate-300" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {algorithm.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-slate-800 bg-slate-900/60 text-slate-300">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
