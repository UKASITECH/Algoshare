"use client";

import { useState } from "react";
import { AlgorithmEntry } from "@/lib/algorithms-data";
import { AlgorithmVisualizer } from "@/components/algorithms/AlgorithmVisualizer";
import { CodeBlock, type CodeBlockImplementation } from "@/components/algorithms/CodeBlock";

type AlgorithmDetailShellProps = {
  algorithm: AlgorithmEntry;
  implementations: CodeBlockImplementation[];
  highlightedLinesByStep: number[];
};

export function AlgorithmDetailShell({ algorithm, implementations, highlightedLinesByStep }: AlgorithmDetailShellProps) {
  const [highlightedLines, setHighlightedLines] = useState<number[]>(algorithm.animationSteps[0]?.highlightedLines ?? []);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <AlgorithmVisualizer
        key={algorithm.id}
        algorithm={algorithm}
        onStepChange={(step) => setHighlightedLines(step.highlightedLines ?? highlightedLinesByStep)}
      />
      <CodeBlock implementations={implementations} highlightedLines={highlightedLines} />
    </div>
  );
}
