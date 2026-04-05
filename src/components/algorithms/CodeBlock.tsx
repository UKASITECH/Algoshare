"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type CodeBlockImplementation = {
  language: "python" | "javascript" | "typescript" | "java" | "cpp" | "c" | "go" | "rust" | "plaintext";
  label: string;
  code: string;
  html: string;
};

type CodeBlockProps = {
  implementations: CodeBlockImplementation[];
  highlightedLines?: number[];
};

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

export function CodeBlock({ implementations, highlightedLines = [] }: CodeBlockProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(implementations[0]?.language ?? "python");
  const [copied, setCopied] = useState<string | null>(null);

  const selectedImplementation = useMemo(
    () => implementations.find((implementation) => implementation.language === selectedLanguage) ?? implementations[0],
    [implementations, selectedLanguage]
  );

  const handleCopy = async () => {
    if (!selectedImplementation) {
      return;
    }
    await navigator.clipboard.writeText(selectedImplementation.code);
    setCopied(selectedImplementation.language);
    window.setTimeout(() => setCopied(null), 2000);
  };

  const highlightCss = highlightedLines.length
    ? highlightedLines.map((line) => `div[data-highlight-lines] .line:nth-child(${line})`).join(",\n")
    : "";
  const highlightRule = highlightCss
    ? `\n                ${highlightCss} {\n                  background: rgba(148, 163, 184, 0.18);\n                }`
    : "";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/95 shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="text-sm font-medium text-slate-200">Code</div>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-2 text-slate-300 hover:text-white">
          {copied === selectedImplementation?.language ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied === selectedImplementation?.language ? "Copied" : "Copy"}
        </Button>
      </div>
      <Tabs value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as CodeBlockImplementation["language"])} className="w-full">
        <TabsList className="h-auto w-full overflow-x-auto border-b border-slate-800 bg-transparent p-3">
          <div className="flex min-w-max gap-2">
          {implementations.map((implementation) => (
            <TabsTrigger
              key={implementation.language}
              value={implementation.language}
              className="shrink-0 rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs whitespace-nowrap text-slate-300 data-[state=active]:border-slate-500 data-[state=active]:bg-slate-700/40 data-[state=active]:text-slate-100"
            >
              {languageLabels[implementation.language]}
            </TabsTrigger>
          ))}
          </div>
        </TabsList>
        {implementations.map((implementation) => (
          <TabsContent key={implementation.language} value={implementation.language} className="m-0">
            <div className="overflow-hidden rounded-b-2xl">
              <div className="overflow-x-auto bg-[#0b1020] px-0 py-0">
                <div
                  data-highlight-lines={highlightedLines.join(",")}
                  dangerouslySetInnerHTML={{ __html: implementation.html }}
                />
              </div>
              <style>{`
                div[data-highlight-lines] pre {
                  counter-reset: line;
                  margin: 0;
                  border-radius: 0;
                  background: transparent !important;
                  padding: 1rem !important;
                }
                div[data-highlight-lines] .line {
                  display: block;
                  padding-left: 3.5rem;
                  position: relative;
                }
                div[data-highlight-lines] .line::before {
                  counter-increment: line;
                  content: counter(line);
                  position: absolute;
                  left: 0;
                  width: 2.5rem;
                  text-align: right;
                  color: rgba(148, 163, 184, 0.55);
                }
                ${highlightRule}
              `}</style>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
