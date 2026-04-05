import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENRICHED_INPUT = path.join(__dirname, '..', 'enriched-algorithms.json');

const BATCH_SIZE = 20;

async function seed() {
  // Load environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials');
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  // Initialize Supabase
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Load enriched algorithms
  if (!fs.existsSync(ENRICHED_INPUT)) {
    console.error('❌ enriched-algorithms.json not found. Run "npm run enrich" first.');
    process.exit(1);
  }

  console.log('📂 Loading enriched-algorithms.json...');
  const algorithms = JSON.parse(fs.readFileSync(ENRICHED_INPUT, 'utf-8'));
  console.log(`📊 Total algorithms to seed: ${algorithms.length}`);
  console.log('');

  // Build categories map
  const categoriesMap = {};
  for (const algo of algorithms) {
    if (!categoriesMap[algo.category]) {
      categoriesMap[algo.category] = {
        name: algo.category,
        slug: algo.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: `Algorithms in the ${algo.category} category`,
        count: 0
      };
    }
    categoriesMap[algo.category].count++;
  }

  const categories = Object.values(categoriesMap);

  // Seed categories first
  console.log(`🏷️  Seeding ${categories.length} categories...`);
  try {
    const { error: catError } = await supabase
      .from('categories')
      .upsert(categories, { onConflict: 'slug' });

    if (catError) {
      console.error('❌ Error seeding categories:', catError.message);
    } else {
      console.log(`✅ Categories seeded successfully`);
    }
  } catch (e) {
    console.error('❌ Error seeding categories:', e.message);
  }

  console.log('');

  // Batch seed algorithms
  let totalChunks = Math.ceil(algorithms.length / BATCH_SIZE);
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < algorithms.length; i += BATCH_SIZE) {
    const chunkNum = Math.floor(i / BATCH_SIZE) + 1;
    const chunk = algorithms.slice(i, Math.min(i + BATCH_SIZE, algorithms.length));

    // Transform data for Supabase (convert camelCase to snake_case where needed)
    const preparedChunk = chunk.map(algo => ({
      name: algo.name,
      slug: algo.slug,
      category: algo.category,
      short_description: algo.shortDescription,
      explanation: algo.explanation,
      how_it_works: algo.howItWorks,
      time_complexity: algo.timeComplexity,
      space_complexity: algo.spaceComplexity,
      difficulty: algo.difficulty,
      implementations: algo.implementations,
      animation_steps: algo.animationSteps,
      use_cases: algo.useCases,
      pros: algo.pros,
      cons: algo.cons,
      tags: algo.tags,
      related_algorithms: algo.relatedAlgorithms,
      real_world_examples: algo.realWorldExamples
    }));

    try {
      const { data, error } = await supabase
        .from('algorithms')
        .upsert(preparedChunk, { onConflict: 'slug' });

      if (error) {
        console.error(`❌ Error on chunk ${chunkNum}/${totalChunks}: ${error.message}`);
        errorCount += chunk.length;
      } else {
        console.log(`✅ Inserted chunk ${chunkNum}/${totalChunks} (${chunk.length} algorithms)`);
        successCount += chunk.length;
      }
    } catch (e) {
      console.error(`❌ Error on chunk ${chunkNum}/${totalChunks}: ${e.message}`);
      errorCount += chunk.length;
    }
  }

  console.log('');
  console.log('🎉 Seeding complete!');
  console.log(`✅ Successfully inserted: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📊 Total: ${successCount + errorCount}`);
}

seed().catch(console.error);
