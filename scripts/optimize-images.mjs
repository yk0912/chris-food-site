// ビルド後に dist/uploads 内の写真を自動で縮小・圧縮する。
// - 元の写真（public/uploads）はそのまま。公開用（dist）だけを軽くする。
// - URL・ファイル名は変わらない。管理画面から上げた大きな写真もここで軽くなる。
// - JPEG は長辺 MAX_EDGE まで縮小し、向き(EXIF)を補正して位置情報などのメタデータを除去。
// - PNG は大きいものだけ縮小（透明は維持）。ロゴ(logos/)・SVG・ICO・GIF は触らない。
// - 処理後のほうが大きくなる場合は元のまま。
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname, sep } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../dist/uploads/', import.meta.url);
const MAX_EDGE = 1600;
const JPEG_QUALITY = 80;
const PNG_MIN_BYTES = 600 * 1024;
const SKIP_DIRS = ['logos'];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.includes(e.name)) continue;
      yield* walk(p);
    } else yield p;
  }
}

const rootPath = decodeURIComponent(ROOT.pathname).replace(/^\/([A-Za-z]:)/, '$1');
let before = 0, after = 0, count = 0;

try { await stat(rootPath); } catch { console.log('[optimize-images] dist/uploads がないためスキップ'); process.exit(0); }

for await (const file of walk(rootPath)) {
  const ext = extname(file).toLowerCase();
  const isJpeg = ext === '.jpg' || ext === '.jpeg';
  const isPng = ext === '.png';
  if (!isJpeg && !isPng) continue;

  const orig = await readFile(file);
  if (isPng && orig.length < PNG_MIN_BYTES) continue;

  try {
    let pipe = sharp(orig, { failOn: 'none' }).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
    pipe = isJpeg ? pipe.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }) : pipe.png({ compressionLevel: 9, palette: false });
    const out = await pipe.toBuffer();
    before += orig.length;
    if (out.length < orig.length) {
      await writeFile(file, out);
      after += out.length;
      count++;
      console.log(`  ${(orig.length / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB  ${file.split(`${sep}uploads${sep}`)[1]}`);
    } else {
      after += orig.length;
    }
  } catch (err) {
    console.warn(`[optimize-images] スキップ（処理できません）: ${file} (${err.message})`);
  }
}
console.log(`[optimize-images] ${count}枚を軽量化: ${(before / 1048576).toFixed(1)}MB → ${(after / 1048576).toFixed(1)}MB`);
