"use client";

import { useState } from "react";
import { Terminal, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const categories = [
  { value: "sorting", label: "Sorting" },
  { value: "searching", label: "Searching" },
  { value: "graph", label: "Graph" },
  { value: "dynamic-programming", label: "Dynamic Programming" },
  { value: "cryptography", label: "Cryptography" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "string", label: "String Algorithms" },
  { value: "data-structures", label: "Data Structures" },
  { value: "other", label: "Other" },
];

const languages = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
];

export default function SubmitPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    timeComplexity: "",
    spaceComplexity: "",
    implementations: {} as Record<string, string>,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Algorithm submitted successfully!", {
      description: "Our team will review your submission.",
    });

    setFormData({
      name: "",
      category: "",
      description: "",
      timeComplexity: "",
      spaceComplexity: "",
      implementations: {},
    });
    setIsSubmitting(false);
  };

  const updateImplementation = (lang: string, code: string) => {
    setFormData((prev) => ({
      ...prev,
      implementations: { ...prev.implementations, [lang]: code },
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-5 w-5" />
            <span className="text-sm text-[#a0a0a0]">Submit Algorithm</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Contribute an Algorithm</h1>
          <p className="text-[#a0a0a0]">
            Know an algorithm that&apos;s missing from our database? Submit it for review.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-[#0a0a0a] border-[#262626]">
          <CardHeader>
            <CardTitle>Algorithm Details</CardTitle>
            <CardDescription className="text-[#a0a0a0]">
              Provide information about the algorithm you want to submit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Algorithm Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Quick Sort"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-[#0a0a0a] border-[#262626]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: string | null) => value && setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger className="bg-[#0a0a0a] border-[#262626]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this algorithm does, its use cases, and any important details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="min-h-[120px] bg-[#0a0a0a] border-[#262626]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeComplexity">Time Complexity</Label>
                  <Input
                    id="timeComplexity"
                    placeholder="e.g., O(n log n)"
                    value={formData.timeComplexity}
                    onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
                    className="bg-[#0a0a0a] border-[#262626]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spaceComplexity">Space Complexity</Label>
                  <Input
                    id="spaceComplexity"
                    placeholder="e.g., O(n)"
                    value={formData.spaceComplexity}
                    onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
                    className="bg-[#0a0a0a] border-[#262626]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base">Implementations</Label>
                  <p className="text-sm text-[#a0a0a0] mt-1">
                    Add code implementations in at least one language.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {languages.slice(0, 4).map((lang) => (
                    <div key={lang.value} className="space-y-2">
                      <Label htmlFor={lang.value}>{lang.label}</Label>
                      <Textarea
                        id={lang.value}
                        placeholder={`// ${lang.label} implementation`}
                        value={formData.implementations[lang.value] || ""}
                        onChange={(e) => updateImplementation(lang.value, e.target.value)}
                        className="min-h-[100px] font-mono text-sm bg-[#0a0a0a] border-[#262626]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-[#1a1a1a] border border-[#262626]">
                <AlertCircle className="h-5 w-5 text-[#a0a0a0]" />
                <p className="text-sm text-[#a0a0a0]">
                  Submissions are reviewed by our team before being published.
                </p>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Algorithm
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
