"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlgorithmCard } from "@/components/algorithms/AlgorithmCard";
import {
  algorithmsData,
  categories,
  getCategoryBadgeClasses,
} from "@/lib/algorithms-data";

const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "difficulty", label: "Difficulty" },
  { value: "category", label: "Category" },
] as const;

export default function AlgorithmsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("name");
  const pageSize = 60;
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredAlgorithms = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = algorithmsData.filter((algorithm) => {
      const matchesSearch =
        algorithm.name.toLowerCase().includes(search) ||
        algorithm.description.toLowerCase().includes(search) ||
        algorithm.tags.some((tag) => tag.toLowerCase().includes(search));
      const matchesCategory = category === "All" || algorithm.category === category;
      const matchesDifficulty = difficulty === "All" || algorithm.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    return filtered.sort((left, right) => {
      if (sortBy === "difficulty") {
        const order = { Beginner: 0, Intermediate: 1, Advanced: 2 } as const;
        return order[left.difficulty] - order[right.difficulty] || left.name.localeCompare(right.name);
      }
      if (sortBy === "category") {
        return left.category.localeCompare(right.category) || left.name.localeCompare(right.name);
      }
      return left.name.localeCompare(right.name);
    });
  }, [query, category, difficulty, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAlgorithms.length / pageSize));
  const visibleAlgorithms = filteredAlgorithms.slice(0, page * pageSize);

  useEffect(() => {
    setPage(1);
  }, [query, category, difficulty, sortBy]);

  useEffect(() => {
    if (!loadMoreRef.current || page >= totalPages) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setPage((current) => Math.min(current + 1, totalPages));
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="border-b border-slate-800 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="text-slate-200">$</span>
            <span>./list-algorithms.sh</span>
          </div>
          <div className="mt-4 max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Algorithms</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">A static library of interactive algorithm demos.</h1>
            <p className="max-w-2xl text-base leading-7 text-slate-400">
              Browse sorting, graph, tree, dynamic programming, string, math, backtracking, and greedy algorithms with step-by-step visualizations and multi-language implementations.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search algorithms, tags, and descriptions"
                className="h-12 border-slate-800 bg-slate-950/80 pl-11 text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <Select value={category} onValueChange={(value) => value && setCategory(value)}>
              <SelectTrigger className="h-12 border-slate-800 bg-slate-950/80 text-slate-100">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All categories</SelectItem>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={difficulty} onValueChange={(value) => value && setDifficulty(value)}>
              <SelectTrigger className="h-12 border-slate-800 bg-slate-950/80 text-slate-100">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All difficulties</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => value && setSortBy(value)}>
              <SelectTrigger className="h-12 border-slate-800 bg-slate-950/80 text-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-slate-500" />
                  <SelectValue placeholder="Sort" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1.5">
              Showing <span className="text-white">{filteredAlgorithms.length}</span> of <span className="text-white">{algorithmsData.length}</span> algorithms
            </span>
            <span className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-1.5">
              Static TypeScript data
            </span>
            <Button variant="ghost" className="text-slate-400 hover:bg-slate-900 hover:text-white">
              <span className="mr-2 text-slate-200">⌘K</span> Quick search
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 max-w-full overflow-x-auto">
          <div className="flex min-w-max gap-2 pb-2">
          <Button
            variant={category === "All" ? "default" : "outline"}
            onClick={() => {
              setCategory("All");
              setPage(1);
            }}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? "default" : "outline"}
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
              className="rounded-full"
            >
              <span className={getCategoryBadgeClasses(item)} />
              {item}
            </Button>
          ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleAlgorithms.map((algorithm) => (
            <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
          ))}
        </div>

        {filteredAlgorithms.length > visibleAlgorithms.length ? (
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="text-sm text-slate-400">
              Page {page} of {totalPages}
            </div>
            <Button
              variant="outline"
              className="border-slate-700 bg-slate-950 text-slate-100 hover:bg-slate-900"
              onClick={() => setPage((current) => Math.min(current + 1, totalPages))}
            >
              Load more ({filteredAlgorithms.length - visibleAlgorithms.length} remaining)
            </Button>
            <div ref={loadMoreRef} className="h-1 w-full" />
          </div>
        ) : null}

        {filteredAlgorithms.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-slate-800 bg-slate-950/60 p-10 text-center text-slate-400">
            No algorithms match the current filters.
          </div>
        ) : null}
      </section>
    </div>
  );
}
