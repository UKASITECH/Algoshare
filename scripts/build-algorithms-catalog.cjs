const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sourceRoot = path.join(root, "Algorithms Data");
const outputPath = path.join(root, "src/data/algorithms-catalog.json");

const codeExts = new Set([
  ".py", ".java", ".js", ".ts", ".cpp", ".c", ".go", ".rs", ".cs", ".php", ".rb", ".swift",
  ".kt", ".scala", ".m", ".jl", ".lua", ".dart", ".r", ".sol", ".nim", ".ex", ".exs", ".hs",
  ".clj", ".f90", ".zig", ".jule", ".mojo", ".elm", ".ml", ".fs", ".s", ".h", ".hpp"
]);

const ignoredDirs = new Set([".git", "node_modules", "__pycache__", ".next", "out", "build"]);

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

function toTitle(input) {
  return input
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeName(fileBase, parentDir) {
  const clean = fileBase.replace(/[_-]+/g, " ").trim();
  const numericOrShort = /^\d+$/.test(clean) || clean.length < 3;
  if (numericOrShort) {
    return `${toTitle(parentDir)} ${clean}`.trim();
  }
  return toTitle(clean);
}

function mapDifficulty(depth) {
  if (depth <= 2) return "Beginner";
  if (depth <= 4) return "Intermediate";
  return "Advanced";
}

function extractTextMetadata(fullPath) {
  try {
    const raw = fs.readFileSync(fullPath, "utf8");
    const lines = raw.split(/\r?\n/);
    const first80 = lines.slice(0, 80);

    const commentLines = [];
    for (const line of first80) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith("#") || trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*")) {
        commentLines.push(trimmed.replace(/^#\s?|^\/\/\s?|^\/\*\s?|^\*\s?/, ""));
      } else if (trimmed.startsWith('"""') || trimmed.startsWith("'''")) {
        commentLines.push(trimmed.replace(/^"""|^'''|"""$|'''$/g, "").trim());
      }
      if (commentLines.length >= 6) break;
    }

    const merged = commentLines.join(" ").replace(/\s+/g, " ").trim();
    const description = merged.length >= 20 ? merged.slice(0, 220) : "";

    return {
      lineCount: lines.length,
      description,
      sourcePreview: lines.slice(0, 180).join("\n").slice(0, 12000),
    };
  } catch {
    return { lineCount: 0, description: "", sourcePreview: "" };
  }
}

const records = [];

function walk(currentDir) {
  const dirEntries = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const entry of dirEntries) {
    const fullPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!codeExts.has(ext)) continue;

    const relativePath = path.relative(sourceRoot, fullPath).replace(/\\/g, "/");
    const parts = relativePath.split("/");
    if (parts.length < 2) continue;

    const languageFolder = parts[0];
    const categoryFolder = parts[1] || "General";
    const subcategoryFolder = parts.length > 3 ? parts[2] : "";
    const fileBase = path.basename(entry.name, ext);
    const parentDir = parts.length > 2 ? parts[parts.length - 2] : categoryFolder;

    const { lineCount, description, sourcePreview } = extractTextMetadata(fullPath);
    const name = normalizeName(fileBase, parentDir);

    const id = slugify(`${languageFolder}-${parts.slice(1, -1).join("-")}-${fileBase}`);
    const depth = parts.length - 1;

    const category = toTitle(categoryFolder);
    const subcategory = subcategoryFolder ? toTitle(subcategoryFolder) : undefined;

    const summary = description || `${name} implementation in ${languageFolder} under ${category}.`;

    records.push({
      id,
      name,
      category,
      subcategory,
      difficulty: mapDifficulty(depth),
      tags: Array.from(new Set([
        languageFolder.toLowerCase(),
        category.toLowerCase(),
        subcategory ? subcategory.toLowerCase() : "",
        ext.replace(".", ""),
        parentDir.toLowerCase().replace(/[_\s-]+/g, "-"),
      ].filter(Boolean))),
      sourcePath: relativePath,
      sourceLanguage: languageFolder,
      sourceExtension: ext.replace(".", ""),
      description: summary,
      explanation: [
        `${name} is sourced from ${languageFolder}/${categoryFolder}.`,
        `Original source file: ${relativePath}.`,
        `This entry is indexed directly from repository code for production browsing.`,
      ].join("\n"),
      useCases: [
        `Study ${name} in ${languageFolder}.`,
        "Compare implementations across languages and folders.",
        "Navigate directly to original source for production reference.",
      ],
      lineCount,
      sourcePreview,
    });
  }
}

walk(sourceRoot);

const deduped = [];
const seen = new Set();
for (const record of records) {
  let nextId = record.id;
  let i = 2;
  while (seen.has(nextId)) {
    nextId = `${record.id}-${i++}`;
  }
  seen.add(nextId);
  deduped.push({ ...record, id: nextId });
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(deduped, null, 2));

console.log(`Catalog generated: ${deduped.length} entries`);
console.log(`Output: ${path.relative(root, outputPath)}`);
