import algorithmsCatalog from "@/data/algorithms-catalog.json";

export interface AlgorithmEntry {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  origin?: string;
  sourcePath: string;
  sourceLanguage: string;
  sourceExtension: string;
  sourcePreview: string;
  lineCount: number;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  stable?: boolean;
  description: string;
  explanation: string;
  useCases: string[];
  implementations: {
    language: "python" | "javascript" | "typescript" | "java" | "cpp" | "c" | "go" | "rust" | "plaintext";
    code: string;
  }[];
  animationSteps: AnimationStep[];
  visualizationConfig: VisualizationConfig;
}

export interface AnimationStep {
  stepIndex: number;
  description: string;
  highlightedLines?: number[];
  state: Record<string, unknown>;
  action:
    | "compare"
    | "swap"
    | "visit"
    | "insert"
    | "delete"
    | "highlight"
    | "split"
    | "merge"
    | "enqueue"
    | "dequeue"
    | "push"
    | "pop"
    | "return"
    | "recurse"
    | "backtrack";
  activeIndices?: number[];
  sortedIndices?: number[];
}

export interface VisualizationConfig {
  type: "array-bars" | "tree" | "graph" | "grid" | "linked-list" | "stack-queue" | "string-chars" | "number-line";
  defaultInput?: unknown;
  colorScheme?: {
    default: string;
    active: string;
    sorted: string;
    comparing: string;
    pivot?: string;
  };
}

type CatalogItem = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  difficulty: AlgorithmEntry["difficulty"];
  tags: string[];
  sourcePath: string;
  sourceLanguage: string;
  sourceExtension: string;
  sourcePreview: string;
  description: string;
  explanation: string;
  useCases: string[];
  lineCount: number;
};

const catalog = algorithmsCatalog as CatalogItem[];

const colorPalettes = [
  "bg-zinc-800 text-zinc-100 ring-1 ring-zinc-700",
  "bg-zinc-900 text-zinc-100 ring-1 ring-zinc-700",
  "bg-neutral-800 text-neutral-100 ring-1 ring-neutral-700",
  "bg-neutral-900 text-neutral-100 ring-1 ring-neutral-700",
  "bg-gray-800 text-gray-100 ring-1 ring-gray-700",
  "bg-gray-900 text-gray-100 ring-1 ring-gray-700",
  "bg-stone-800 text-stone-100 ring-1 ring-stone-700",
  "bg-stone-900 text-stone-100 ring-1 ring-stone-700",
];

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function colorSchemeFor(category: string) {
  const offset = hashString(category) % 8;
  const baseLightness = 44 + offset;
  return {
    default: `hsl(0 0% ${baseLightness}%)`,
    active: "hsl(0 0% 72%)",
    sorted: "hsl(0 0% 88%)",
    comparing: "hsl(0 0% 62%)",
    pivot: "hsl(0 0% 78%)",
  };
}

function visualizationFor(category: string): VisualizationConfig {
  const lower = category.toLowerCase();
  const type: VisualizationConfig["type"] =
    lower.includes("graph")
      ? "graph"
      : lower.includes("tree")
        ? "tree"
        : lower.includes("maze") || lower.includes("grid")
          ? "grid"
          : lower.includes("string")
            ? "string-chars"
            : lower.includes("math")
              ? "number-line"
              : "array-bars";

  return {
    type,
    defaultInput: type === "grid" ? [["S", ".", "."], [".", "#", "."], [".", ".", "E"]] : [5, 3, 8, 1, 2],
    colorScheme: colorSchemeFor(category),
  };
}

function genericSteps(name: string): AnimationStep[] {
  return [
    {
      stepIndex: 0,
      description: `${name}: initialize the algorithm state.`,
      state: { values: [5, 3, 8, 1, 2] },
      action: "highlight",
      highlightedLines: [1],
    },
    {
      stepIndex: 1,
      description: `${name}: process the next state transition.`,
      state: { values: [5, 3, 8, 1, 2] },
      action: "compare",
      activeIndices: [0, 1],
      highlightedLines: [2, 3],
    },
    {
      stepIndex: 2,
      description: `${name}: apply the update rule and continue.`,
      state: { values: [3, 5, 8, 1, 2] },
      action: "swap",
      activeIndices: [0, 1],
      highlightedLines: [4],
    },
    {
      stepIndex: 3,
      description: `${name}: finalize and return output.`,
      state: { values: [1, 2, 3, 5, 8] },
      action: "return",
      sortedIndices: [0, 1, 2, 3, 4],
      highlightedLines: [5],
    },
  ];
}

export const algorithmsData: AlgorithmEntry[] = catalog.map((item) => ({
  id: item.id,
  name: item.name,
  category: item.category,
  subcategory: item.subcategory,
  difficulty: item.difficulty,
  tags: item.tags,
  origin: `Algorithms Data/${item.sourcePath}`,
  sourcePath: item.sourcePath,
  sourceLanguage: item.sourceLanguage,
  sourceExtension: item.sourceExtension,
  sourcePreview: item.sourcePreview,
  lineCount: item.lineCount,
  timeComplexity: { best: "Unknown", average: "Unknown", worst: "Unknown" },
  spaceComplexity: "Unknown",
  description: item.description,
  explanation: item.explanation,
  useCases: item.useCases,
  implementations: [],
  animationSteps: genericSteps(item.name),
  visualizationConfig: visualizationFor(item.category),
}));

export const algorithmsById = new Map(algorithmsData.map((algorithm) => [algorithm.id, algorithm]));

export const categories = Array.from(new Set(algorithmsData.map((algorithm) => algorithm.category))).sort((a, b) => a.localeCompare(b));

export function getAlgorithmById(id: string) {
  return algorithmsById.get(id);
}

export function getAlgorithmsByCategory(category: string) {
  return algorithmsData.filter((algorithm) => algorithm.category === category);
}

export function getCategoryBadgeClasses(category: string) {
  return colorPalettes[hashString(category) % colorPalettes.length];
}

export function getDifficultyBadgeClasses(difficulty: AlgorithmEntry["difficulty"]) {
  switch (difficulty) {
    case "Beginner":
      return "bg-zinc-800 text-zinc-100 ring-1 ring-zinc-700";
    case "Intermediate":
      return "bg-zinc-900 text-zinc-100 ring-1 ring-zinc-700";
    case "Advanced":
      return "bg-neutral-900 text-neutral-100 ring-1 ring-neutral-700";
    default:
      return "bg-gray-900 text-gray-100 ring-1 ring-gray-700";
  }
}
