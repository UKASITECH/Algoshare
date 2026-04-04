import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_INPUT = path.join(__dirname, '..', 'raw-algorithms.json');
const ENRICHED_OUTPUT = path.join(__dirname, '..', 'enriched-algorithms.json');

const GROQ_DELAY_MS = 600;
const RETRY_DELAY_MS = 2000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanJsonResponse(text) {
  // Remove markdown code blocks if present
  let cleaned = text.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  }
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

async function callGroq(prompt) {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const groqKey = process.env.GROQ_KEY;

  if (!groqKey) {
    throw new Error('GROQ_KEY environment variable not set');
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + groqKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 3000,
      messages: [{
        role: "user",
        content: prompt
      }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  return content;
}

function buildPrompt(algo) {
  const codePreview = algo.implementations.Python
    ? algo.implementations.Python.slice(0, 500)
    : Object.values(algo.implementations)[0].slice(0, 500);

  return `You are an expert algorithm educator. Analyze this algorithm and provide educational content.

Algorithm: ${algo.name}
Category: ${algo.category}
Code Preview:
\`\`\`
${codePreview}
\`\`\`

Return ONLY valid JSON. No markdown. No explanation. No backticks. Return this exact structure:
{
  "shortDescription": "One line explanation of what this algorithm does",
  "explanation": "Detailed markdown explanation covering what it is, how it works, where it came from, and why it matters (200-300 words). Use markdown formatting.",
  "howItWorks": ["Step 1: description", "Step 2: description", "Step 3: description", "Step 4: description", "Step 5: description", "Step 6: description", "Step 7: description"],
  "timeComplexity": {
    "best": "O(n)",
    "average": "O(n log n)",
    "worst": "O(n²)"
  },
  "spaceComplexity": "O(1)",
  "difficulty": "Beginner",
  "animationSteps": [
    {"step": 1, "description": "Start with unsorted array", "array": [5,3,8,1,9,2], "highlight": [0,1], "action": "compare"},
    {"step": 2, "description": "Compare first two elements", "array": [5,3,8,1,9,2], "highlight": [0,1], "action": "compare"},
    {"step": 3, "description": "Swap if first is larger", "array": [3,5,8,1,9,2], "highlight": [0,1], "action": "swap"},
    {"step": 4, "description": "Move to next pair", "array": [3,5,8,1,9,2], "highlight": [1,2], "action": "compare"},
    {"step": 5, "description": "Compare elements", "array": [3,5,8,1,9,2], "highlight": [1,2], "action": "compare"},
    {"step": 6, "description": "Continue comparisons", "array": [3,5,8,1,9,2], "highlight": [2,3], "action": "compare"},
    {"step": 7, "description": "Element in position", "array": [3,5,1,8,9,2], "highlight": [3], "action": "visit"},
    {"step": 8, "description": "Compare next pair", "array": [3,5,1,8,9,2], "highlight": [3,4], "action": "compare"},
    {"step": 9, "description": "Continue sorting", "array": [3,5,1,8,2,9], "highlight": [4,5], "action": "swap"},
    {"step": 10, "description": "Array sorted", "array": [1,2,3,5,8,9], "highlight": [], "action": "done"}
  ],
  "useCases": ["Use case 1", "Use case 2", "Use case 3"],
  "pros": ["Advantage 1", "Advantage 2", "Advantage 3"],
  "cons": ["Disadvantage 1", "Disadvantage 2"],
  "tags": ["tag1", "tag2", "tag3"],
  "relatedAlgorithms": ["Related Algorithm 1", "Related Algorithm 2"],
  "realWorldExamples": ["Real-world use 1", "Real-world use 2"]
}`;
}

async function enrich() {
  if (!fs.existsSync(RAW_INPUT)) {
    console.error('❌ raw-algorithms.json not found. Run "npm run extract" first.');
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(RAW_INPUT, 'utf-8'));
  let enrichedData = [];

  // Load existing enriched data if it exists
  if (fs.existsSync(ENRICHED_OUTPUT)) {
    console.log('📂 Loading existing enriched-algorithms.json...');
    enrichedData = JSON.parse(fs.readFileSync(ENRICHED_OUTPUT, 'utf-8'));
  }

  const enrichedSlugs = new Set(enrichedData.map(a => a.slug));
  const toProcess = rawData.filter(a => !enrichedSlugs.has(a.slug));

  console.log(`📊 Total algorithms: ${rawData.length}`);
  console.log(`✅ Already enriched: ${enrichedData.length}`);
  console.log(`⏳ To process: ${toProcess.length}`);
  console.log('');

  let processed = 0;
  for (const algo of toProcess) {
    processed++;
    const progress = `[${enrichedData.length + processed}/${rawData.length}]`;

    try {
      console.log(`⏳ ${progress} ${algo.name}...`);
      const prompt = buildPrompt(algo);
      let response = await callGroq(prompt);

      // Attempt to clean and parse JSON
      response = cleanJsonResponse(response);
      let enriched = JSON.parse(response);

      // Merge with original
      enriched = {
        ...algo,
        ...enriched
      };

      enrichedData.push(enriched);
      console.log(`✅ ${progress} ${algo.name}`);

      // Save after every algorithm
      fs.writeFileSync(ENRICHED_OUTPUT, JSON.stringify(enrichedData, null, 2));

      await sleep(GROQ_DELAY_MS);
    } catch (error) {
      console.log(`🔄 Retry: ${algo.name}...`);
      try {
        await sleep(RETRY_DELAY_MS);
        const prompt = buildPrompt(algo);
        let response = await callGroq(prompt);
        response = cleanJsonResponse(response);
        let enriched = JSON.parse(response);
        enriched = {
          ...algo,
          ...enriched
        };

        enrichedData.push(enriched);
        console.log(`✅ ${progress} ${algo.name} (retry)`);
        fs.writeFileSync(ENRICHED_OUTPUT, JSON.stringify(enrichedData, null, 2));
        await sleep(GROQ_DELAY_MS);
      } catch (retryError) {
        console.error(`❌ FAILED: ${algo.name} - ${retryError.message}`);
        // Add algo with minimal enrichment
        const minimal = {
          ...algo,
          shortDescription: `${algo.name} algorithm`,
          explanation: `Implement the ${algo.name} algorithm in ${algo.category} category.`,
          howItWorks: [],
          timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
          spaceComplexity: 'O(1)',
          difficulty: 'Beginner',
          animationSteps: [],
          useCases: [],
          pros: [],
          cons: [],
          tags: [algo.category.toLowerCase().replace(/ /g, '-')],
          relatedAlgorithms: [],
          realWorldExamples: []
        };
        enrichedData.push(minimal);
        fs.writeFileSync(ENRICHED_OUTPUT, JSON.stringify(enrichedData, null, 2));
      }
    }
  }

  console.log('');
  console.log(`🎉 Enrichment complete!`);
  console.log(`📝 Total enriched: ${enrichedData.length}`);
}

enrich().catch(console.error);
