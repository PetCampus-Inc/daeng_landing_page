// 원본 이미지(src/assets/images/)를 webp로 압축해 public/images/에 내보낸다.
// 원본은 git으로 추적되는 실제 소스이고, public/images/는 그걸로부터 매번 다시 만들 수 있는
// 결과물이다 (사이트가 실제로 서빙하는 파일).
//
//   node scripts/optimize-images.mjs        전체 재생성
//   node scripts/optimize-images.mjs hero    이름에 "hero"가 들어간 것만
//
// next.config.ts가 images.unoptimized: true(output: 'export')라서 next/image가
// 요청 시점에 최적화해주지 않는다 — 그래서 빌드 전에 미리 압축해둔다.

import sharp from 'sharp';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '..', 'src', 'assets', 'images');
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');
const QUALITY = 82;

const filter = process.argv[2];

const files = readdirSync(SRC_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const base = path.basename(file, path.extname(file));
  if (filter && !base.includes(filter)) continue;

  const srcPath = path.join(SRC_DIR, file);
  const outPath = path.join(OUT_DIR, `${base}.webp`);

  const before = (await sharp(srcPath).metadata()).width;
  await sharp(srcPath).webp({ quality: QUALITY }).toFile(outPath);

  console.log(`${file} (w=${before}) -> public/images/${base}.webp`);
}
