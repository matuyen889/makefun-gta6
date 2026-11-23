// Caleta del Sol 3D — GTA 6 Style Open-World Game Deliverable Pipeline
// Runtime: Node.js 22 (Standard Library Only, ES Modules)
// Release Build v1.0.4 — Caleta del Sol Production Pipeline

import { cpSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

console.log('[Caleta del Sol 3D] Packaging open-world deliverable to:', outputDir);

mkdirSync(outputDir, { recursive: true });

const sourceGameDir = join(rootDir, 'game');
const targetGameDir = join(outputDir, 'game');
console.log('[Caleta del Sol 3D] Copying static game web application from:', sourceGameDir);
cpSync(sourceGameDir, targetGameDir, { recursive: true });

const sourceScreensDir = join(rootDir, 'screenshots');
const targetScreensDir = join(outputDir, 'screenshots');
mkdirSync(targetScreensDir, { recursive: true });

if (existsSync(sourceScreensDir)) {
  const screenshots = readdirSync(sourceScreensDir);
  console.log(`[Caleta del Sol 3D] Transferring ${screenshots.length} screenshot artifacts:`, screenshots);
  cpSync(sourceScreensDir, targetScreensDir, { recursive: true });
}

const dossierPath = join(outputDir, 'dossier.json');
const dossierData = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});

writeFileSync(dossierPath, dossierData);
console.log(`[Caleta del Sol 3D] Judge dossier.json written successfully (${dossierData.length} bytes).`);
