"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Terminal,
  Search,
  Menu,
  X,
  BookOpen,
  Code2,
  Layers,
  Home,
  PlusCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const navItems = [
  { href: "/", label: "home" },
  { href: "/algorithms", label: "algorithms" },
  { href: "/docs", label: "docs" },
  { href: "/submit", label: "submit" },
];

const algorithmCategories = [
  { name: "Sorting", items: ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"] },
  { name: "Searching", items: ["Binary Search", "Linear Search", "BFS", "DFS"] },
  { name: "Dynamic Programming", items: ["Fibonacci", "Knapsack", "LCS", "Edit Distance"] },
  { name: "Graph", items: ["Dijkstra", "Bellman-Ford", "A*", "Floyd-Warshall"] },
  { name: "Cryptography", items: ["AES", "RSA", "SHA-256", "bcrypt"] },
  { name: "Machine Learning", items: ["Gradient Descent", "K-Means", "PCA", "Random Forest"] },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#262626] bg-[#000000]/98 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Terminal className="h-6 w-6 group-hover:text-[#a0a0a0] transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ffffff] rounded-full animate-pulse" />
            </div>
            <span className="font-bold text-lg tracking-wider">
              <span className="text-[#a0a0a0]">algo</span>
              <span className="text-[#ffffff]">share</span>
              <span className="text-[#525252]">_</span>
            </span>
          </Link>

          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center bg-[#0a0a0a] border border-[#262626] px-1">
              <span className="text-[#525252] px-2 text-sm">$</span>
              {navItems.map((item, index) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    size="sm"
                    className={`h-9 px-3 text-sm ${
                      pathname === item.href 
                        ? "bg-[#262626] text-[#ffffff]" 
                        : "text-[#a0a0a0] hover:text-[#ffffff] hover:bg-[#1a1a1a]"
                    }`}
                  >
                    {item.label}
                    {index < navItems.length - 1 && (
                      <span className="ml-3 text-[#404040]">|</span>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>

          {/* Right side - Search & Actions */}
          <div className="flex items-center gap-3">
            <div 
              className="hidden md:flex items-center gap-2 bg-[#0a0a0a] border border-[#262626] px-3 py-1.5 cursor-pointer hover:border-[#404040] transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4 text-[#525252]" />
              <span className="text-sm text-[#525252]">search...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 border border-[#262626] bg-[#1a1a1a] px-1.5 text-xs text-[#737373]">
                ⌘K
              </kbd>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#262626] bg-[#0a0a0a] p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start text-left"
                >
                  <span className="text-[#525252] mr-2">$</span>
                  {item.label}
                </Button>
              </Link>
            ))}
            <div 
              className="flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-2 mt-2 cursor-pointer"
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
            >
              <Search className="h-4 w-4 text-[#525252]" />
              <span className="text-sm text-[#525252]">Search algorithms...</span>
            </div>
          </div>
        </div>
      )}

      {/* Command Palette */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <div className="bg-[#0a0a0a] border border-[#262626]">
          <CommandInput 
            placeholder="Type a command or search..."
            className="bg-transparent border-none outline-none text-[#ffffff] placeholder:text-[#525252]"
          />
        </div>
        <CommandList className="bg-[#0a0a0a] border border-[#262626] border-t-0 max-h-[400px]">
          <CommandEmpty className="py-6 text-[#525252] text-center">
            <span className="text-[#737373]">No results found.</span>
          </CommandEmpty>
          <CommandGroup heading={<span className="text-[#525252] text-xs">Quick Actions</span>}>
            <CommandItem 
              onSelect={() => { setIsSearchOpen(false); window.location.href = "/algorithms"; }}
              className="text-[#a0a0a0] hover:text-[#ffffff] hover:bg-[#1a1a1a]"
            >
              <Layers className="mr-2 h-4 w-4" />
              <span>Browse All Algorithms</span>
            </CommandItem>
            <CommandItem 
              onSelect={() => { setIsSearchOpen(false); window.location.href = "/submit"; }}
              className="text-[#a0a0a0] hover:text-[#ffffff] hover:bg-[#1a1a1a]"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Submit Algorithm</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-2 bg-[#262626]" />
          {algorithmCategories.map((category) => (
            <CommandGroup key={category.name} heading={<span className="text-[#525252] text-xs">{category.name}</span>}>
              {category.items.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={() => {
                    setIsSearchOpen(false);
                    window.location.href = `/algorithms/${item.toLowerCase().replace(/\s+/g, "-")}`;
                  }}
                  className="text-[#a0a0a0] hover:text-[#ffffff] hover:bg-[#1a1a1a]"
                >
                  <Code2 className="mr-2 h-4 w-4" />
                  <span>{item}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </header>
  );
}
