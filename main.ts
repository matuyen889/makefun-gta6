// CALETA DEL SOL 3D — Game Deliverable Pipeline & Scorer Dossier Generator
// Program runtime: Node 22 (Standard Library Only, Pure ES Modules)

import { cpSync, existsSync, mkdirSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

console.log('[Caleta del Sol 3D] Packaging game deliverable to:', outputDir);

// 1. Prepare target output directory tree
mkdirSync(outputDir, { recursive: true });

// 2. Transfer game assets and source modules
const sourceGameDir = join(rootDir, 'game');
const targetGameDir = join(outputDir, 'game');
console.log('[Caleta del Sol 3D] Deploying static game assets from:', sourceGameDir);
cpSync(sourceGameDir, targetGameDir, { recursive: true });

// 3. Transfer verified screenshots (4 official high-res screens)
const sourceScreensDir = join(rootDir, 'screenshots');
const targetScreensDir = join(outputDir, 'screenshots');
mkdirSync(targetScreensDir, { recursive: true });

if (existsSync(sourceScreensDir)) {
  const screenshots = readdirSync(sourceScreensDir);
  console.log(`[Caleta del Sol 3D] Transferring ${screenshots.length} screenshot artifacts:`, screenshots);
  cpSync(sourceScreensDir, targetScreensDir, { recursive: true });
}

// 4. Build official makefun game dossier complying with competition caps
const dossierPath = join(outputDir, 'dossier.json');
const dossierData = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});

writeFileSync(dossierPath, dossierData);
console.log(`[Caleta del Sol 3D] Written judge dossier.json (${dossierData.length} bytes) successfully.`);
