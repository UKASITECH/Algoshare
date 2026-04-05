import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', 'Algorithms Data');
const OUTPUT_FILE = path.join(__dirname, '..', 'raw-algorithms.json');

const SUPPORTED_EXTENSIONS = {
  '.py': 'Python',
  '.js': 'JavaScript',
  '.ts': 'TypeScript',
  '.java': 'Java',
  '.cpp': 'C++',
  '.c': 'C',
  '.cs': 'C#',
  '.go': 'Go',
  '.rs': 'Rust',
  '.kt': 'Kotlin',
  '.swift': 'Swift',
  '.rb': 'Ruby'
};

const CATEGORY_MAP = {
  'sort': 'Sorting',
  'sorts': 'Sorting',
  'sorting': 'Sorting',
  'search': 'Searching',
  'searches': 'Searching',
  'graph': 'Graph',
  'graphs': 'Graph',
  'tree': 'Tree',
  'trees': 'Tree',
  'string': 'String',
  'strings': 'String',
  'math': 'Math',
  'maths': 'Math',
  'dynamic_programming': 'Dynamic Programming',
  'dynamicprogramming': 'Dynamic Programming',
  'dp': 'Dynamic Programming',
  'machine_learning': 'Machine Learning',
  'machinelearning': 'Machine Learning',
  'ml': 'Machine Learning',
  'cipher': 'Cryptography',
  'ciphers': 'Cryptography',
  'crypto': 'Cryptography',
  'cryptography': 'Cryptography',
  'data_structure': 'Data Structures',
  'data_structures': 'Data Structures',
  'datastructure': 'Data Structures',
  'datastructures': 'Data Structures',
  'backtrack': 'Backtracking',
  'backtracking': 'Backtracking',
  'bit_manipulation': 'Bit Manipulation',
  'bitmanipulation': 'Bit Manipulation',
  'greedy': 'Greedy',
  'boolean_algebra': 'Boolean Algebra',
  'boolean': 'Boolean Algebra',
  'divide_and_conquer': 'Divide and Conquer',
  'divideandconquer': 'Divide and Conquer',
  'file_transfer': 'File Transfer',
  'filetransfer': 'File Transfer',
  'linear_algebra': 'Linear Algebra',
  'linearalgebra': 'Linear Algebra',
  'geometry': 'Geometry',
  'genetic_algorithm': 'Genetic Algorithm',
  'geneticalgorithm': 'Genetic Algorithm',
  'audio_filters': 'Audio Filters',
  'audiofilters': 'Audio Filters',
  'financial': 'Financial',
  'blockchain': 'Blockchain',
  'knapsack': 'Knapsack',
  'quantum': 'Quantum',
  'networking_flow': 'Networking Flow',
  'networkingflow': 'Networking Flow',
  'network': 'Networking Flow',
  'physics': 'Physics',
  'image_data': 'Image Data',
  'imagedata': 'Image Data',
  'neural_network': 'Neural Network',
  'neuralnetwork': 'Neural Network',
  'compression': 'Compression',
  'matrix': 'Matrix',
  'number_theory': 'Number Theory',
  'numbertheory': 'Number Theory',
  'prime': 'Prime'
};

function normalizeName(filename) {
  const nameWithoutExt = filename.split('.').slice(0, -1).join('.');
  let normalized = nameWithoutExt
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase/PascalCase
    .replace(/_/g, ' ') // snake_case
    .replace(/-/g, ' ') // kebab-case
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return normalized;
}

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function inferCategory(filePath) {
  const parts = filePath.split(path.sep).map(p => p.toLowerCase());
  
  // Check each part for exact matches
  for (const part of parts) {
    const clean = part.replace(/[^a-z0-9_]/g, '');
    if (CATEGORY_MAP[clean]) {
      return CATEGORY_MAP[clean];
    }
  }
  
  // Try partial matches
  for (const part of parts) {
    const clean = part.replace(/[^a-z0-9_]/g, '');
    for (const [key, value] of Object.entries(CATEGORY_MAP)) {
      if (clean.includes(key)) {
        return value;
      }
    }
  }
  
  return 'Miscellaneous';
}

async function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === '__pycache__') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath, callback);
    } else {
      await callback(fullPath);
    }
  }
}

async function extract() {
  console.log('🔍 Scanning TheAlgorithms-All/ for code files...');
  
  const algorithmsByName = {};

  await walkDir(ROOT_DIR, (filePath) => {
    const ext = path.extname(filePath);
    if (!SUPPORTED_EXTENSIONS[ext]) return;

    const filename = path.basename(filePath);
    const name = normalizeName(filename);
    const slug = toSlug(name);
    const language = SUPPORTED_EXTENSIONS[ext];
    const category = inferCategory(filePath);

    let code = '';
    try {
      code = fs.readFileSync(filePath, 'utf-8');
      // Skip large files (likely binary or incorrect)
      if (code.length > 1000000) return;
    } catch (e) {
      return;
    }

    if (!algorithmsByName[slug]) {
      algorithmsByName[slug] = {
        name,
        slug,
        category,
        implementations: {}
      };
    }

    algorithmsByName[slug].implementations[language] = code;
  });

  const algorithms = Object.values(algorithmsByName);
  console.log(`✅ Found ${algorithms.length} unique algorithms`);
  console.log(`📝 Writing to raw-algorithms.json...`);
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(algorithms, null, 2));
  console.log(`✨ Extraction complete! ${algorithms.length} algorithms extracted.`);
  
  return algorithms;
}

extract().catch(console.error);
