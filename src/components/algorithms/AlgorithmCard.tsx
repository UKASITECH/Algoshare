import Link from "next/link";
import { ChevronRight, Clock, HardDrive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AlgorithmEntry,
  getCategoryBadgeClasses,
  getDifficultyBadgeClasses,
} from "@/lib/algorithms-data";

type AlgorithmCardProps = {
  algorithm: AlgorithmEntry;
};

export function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  return (
    <Link href={`/algorithms/${algorithm.id}`} className="group block h-full">
      <Card className="h-full border border-slate-800/80 bg-slate-950 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-slate-600 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.45)]">
        <CardHeader className="space-y-3 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <CardTitle className="text-lg text-white transition-colors group-hover:text-slate-100">
                {algorithm.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge className={cn("border-0", getCategoryBadgeClasses(algorithm.category))}>
                  {algorithm.category}
                </Badge>
                <Badge className={cn("border-0", getDifficultyBadgeClasses(algorithm.difficulty))}>
                  {algorithm.difficulty}
                </Badge>
              </div>
            </div>
            <ChevronRight className="mt-1 h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-200" />
          </div>
          <CardDescription className="line-clamp-2 text-slate-400">
            {algorithm.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-mono">{algorithm.timeComplexity.average}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1">
              <HardDrive className="h-3.5 w-3.5" />
              <span className="font-mono">{algorithm.spaceComplexity}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {algorithm.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-800 bg-slate-900 px-2 py-1 text-[11px] uppercase tracking-wide text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
