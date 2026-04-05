"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlgorithmEntry, AnimationStep } from "@/lib/algorithms-data";
import { cn } from "@/lib/utils";

type AlgorithmVisualizerProps = {
  algorithm: AlgorithmEntry;
  onStepChange?: (step: AnimationStep) => void;
};

function clampStepIndex(index: number, steps: AnimationStep[]) {
  return Math.min(Math.max(index, 0), Math.max(steps.length - 1, 0));
}

export function AlgorithmVisualizer({ algorithm, onStepChange }: AlgorithmVisualizerProps) {
  const steps = algorithm.animationSteps;
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);

  const activeStep = steps[currentStep] ?? steps[0];

  useEffect(() => {
    if (activeStep) {
      onStepChange?.(activeStep);
    }
  }, [activeStep, onStepChange]);

  useEffect(() => {
    if (!isPlaying || steps.length <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setCurrentStep((previous) => (previous >= steps.length - 1 ? 0 : previous + 1));
    }, speed);
    return () => window.clearInterval(timer);
  }, [isPlaying, speed, steps.length]);

  const visualState = useMemo(() => activeStep?.state ?? {}, [activeStep]);
  const values = (visualState.values as number[] | undefined) ?? [];

  const handlePrev = () => {
    setCurrentStep((previous) => clampStepIndex(previous - 1, steps));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentStep((previous) => clampStepIndex(previous + 1, steps));
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="text-sm font-medium text-slate-200">Visualization</div>
          <div className="text-xs text-slate-500">Step {currentStep + 1} / {steps.length}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handlePrev} className="text-slate-300 hover:text-white">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon" onClick={() => setIsPlaying((value) => !value)} className="bg-slate-700 text-white hover:bg-slate-600">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNext} className="text-slate-300 hover:text-white">
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleReset} className="text-slate-300 hover:text-white">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-900/80 p-4">
        {algorithm.visualizationConfig.type === "array-bars" || algorithm.visualizationConfig.type === "number-line" ? (
          <ArrayVisualizer step={activeStep} algorithm={algorithm} values={values} />
        ) : algorithm.visualizationConfig.type === "tree" ? (
          <TreeVisualizer step={activeStep} />
        ) : algorithm.visualizationConfig.type === "graph" ? (
          <GraphVisualizer step={activeStep} />
        ) : algorithm.visualizationConfig.type === "grid" ? (
          <GridVisualizer step={activeStep} />
        ) : (
          <ArrayVisualizer step={activeStep} algorithm={algorithm} values={values} />
        )}
      </div>

      <div className="mt-4 space-y-4">
        <div className="text-sm text-slate-300">{activeStep?.description}</div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Speed</span>
            <span>{speed} ms</span>
          </div>
          <input
            type="range"
            min={200}
            max={2000}
            step={100}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-slate-300"
          />
        </div>
      </div>
    </div>
  );
}

function ArrayVisualizer({ step, algorithm, values }: { step?: AnimationStep; algorithm: AlgorithmEntry; values: number[] }) {
  const active = step?.activeIndices ?? [];
  const sorted = step?.sortedIndices ?? [];
  const maxValue = Math.max(...values, 1);
  const colorScheme = algorithm.visualizationConfig.colorScheme!;

  return (
    <div className="flex h-72 items-end gap-2 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3">
      {values.map((value, index) => {
        const isActive = active.includes(index);
        const isSorted = sorted.includes(index);
        const height = Math.max((value / maxValue) * 100, 12);
        return (
          <div key={`${value}-${index}`} className="flex min-w-[48px] flex-1 flex-col items-center justify-end gap-2">
            <div className={cn("flex w-full items-end justify-center rounded-t-lg transition-all duration-300", isSorted ? "bg-slate-200" : isActive ? "bg-slate-400" : "bg-slate-600")}
                 style={{ height: `${height}%`, backgroundColor: isSorted ? colorScheme.sorted : isActive ? colorScheme.comparing : colorScheme.default }}>
              <span className="mb-1 text-[11px] font-semibold text-slate-950">{value}</span>
            </div>
            <span className={cn("text-[11px]", isActive ? "text-slate-200" : isSorted ? "text-white" : "text-slate-500")}>{index}</span>
          </div>
        );
      })}
    </div>
  );
}

function TreeVisualizer({ step }: { step?: AnimationStep }) {
  const nodes = (step?.state.nodes as Array<{ id: string; label: string; x: number; y: number; status?: string }> | undefined) ?? [];
  const edges = nodes.length > 1 ? nodes.slice(1).map((node, index) => ({ from: nodes[Math.floor((index + 1) / 2)] ?? nodes[0], to: node })) : [];
  return (
    <svg viewBox="0 0 640 260" className="h-72 w-full rounded-xl bg-slate-950">
      {edges.map((edge, index) => (
        <line
          key={`${edge.from.id}-${edge.to.id}-${index}`}
          x1={edge.from.x}
          y1={edge.from.y}
          x2={edge.to.x}
          y2={edge.to.y}
          className="stroke-slate-700"
          strokeWidth="2"
        />
      ))}
      {nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          <circle r="22" className={cn("transition-all duration-300", node.status === "active" ? "fill-slate-300" : node.status === "visited" ? "fill-slate-100" : "fill-slate-600")} />
          <text textAnchor="middle" dominantBaseline="middle" className="fill-white text-xs font-semibold">{node.label}</text>
        </g>
      ))}
    </svg>
  );
}

function GraphVisualizer({ step }: { step?: AnimationStep }) {
  const nodes = (step?.state.nodes as Array<{ id: string; label: string; x: number; y: number }> | undefined) ?? [];
  const edges = (step?.state.edges as Array<{ from: string; to: string; weight: number }> | undefined) ?? [];

  return (
    <svg viewBox="0 0 520 240" className="h-72 w-full rounded-xl bg-slate-950">
      {edges.map((edge) => {
        const from = nodes.find((node) => node.id === edge.from);
        const to = nodes.find((node) => node.id === edge.to);
        if (!from || !to) {
          return null;
        }
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="stroke-slate-600" strokeWidth="2" />
            <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 6} className="fill-slate-400 text-[10px]">{edge.weight}</text>
          </g>
        );
      })}
      {nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          <circle r="20" className="fill-slate-300 transition-all duration-300" />
          <text textAnchor="middle" dominantBaseline="middle" className="fill-white text-xs font-semibold">{node.label}</text>
        </g>
      ))}
    </svg>
  );
}

function GridVisualizer({ step }: { step?: AnimationStep }) {
  const grid = (step?.state.grid as string[][] | undefined) ?? [
    ["S", ".", "."],
    [".", "#", "."],
    [".", ".", "E"],
  ];
  return (
    <div className="grid gap-1 rounded-xl bg-slate-950 p-3" style={{ gridTemplateColumns: `repeat(${grid[0]?.length ?? 1}, minmax(0, 1fr))` }}>
      {grid.flatMap((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <div key={`${rowIndex}-${columnIndex}`} className={cn("flex aspect-square items-center justify-center rounded-md border border-slate-800 text-sm font-semibold", cell === "#" ? "bg-slate-800 text-slate-500" : cell === "S" ? "bg-slate-700 text-slate-100" : cell === "E" ? "bg-slate-300 text-black" : "bg-slate-900 text-slate-300")}>
            {cell}
          </div>
        ))
      )}
    </div>
  );
}
