import { createWriteStream } from 'fs';
import { deflateSync } from 'zlib';
import { mkdirSync } from 'fs';

// Creates a minimal valid PNG with the brand lightning bolt shape
// using just Node built-ins (no sharp/canvas needed)

function makePNG(size, bgColor, fgColor) {
  const w = size, h = size;

  // Build raw RGBA pixel rows
  const rows = [];
  const cx = w / 2, cy = h / 2;
  const scale = size / 64;

  for (let y = 0; y < h; y++) {
    // filter byte 0 = None
    const row = Buffer.alloc(1 + w * 4);
    row[0] = 0;
    for (let x = 0; x < w; x++) {
      // Rounded-square background
      const rx = 14 * scale, ry = 14 * scale;
      const dx = Math.abs(x - cx) - (w / 2 - rx);
      const dy = Math.abs(y - cy) - (h / 2 - ry);
      const inBg = (dx <= 0 || dy <= 0 || Math.sqrt(dx*dx + dy*dy) <= rx);

      let r, g, b, a;
      if (inBg) {
        // Draw a simple lightning bolt "V" shape in foreground color
        // Bolt occupies roughly the center 50% of the icon
        const bx = (x - cx) / scale;   // -32..32
        const by = (y - cy) / scale;   // -32..32

        // Upper triangle: right-leaning top piece
        const inUpper = (bx >= -4 && bx <= 14 && by >= -24 && by <= 2) &&
                        (by <= bx - 2 + 2 || bx >= 4);
        // Lower triangle: left-leaning bottom piece
        const inLower = (bx >= -14 && bx <= 4 && by >= -2 && by <= 24) &&
                        (by >= bx + 2 - 2 || bx <= -4);

        // Simpler: just a filled lightning bolt polygon approximation
        // Upper half: slanted right bar
        const bolt =
          (by >= -24 && by <= 2  && bx >= (by * 0.35 - 2)  && bx <= (by * 0.35 + 9)) ||
          (by >= -2  && by <= 24 && bx >= (by * 0.35 - 11) && bx <= (by * 0.35));

        if (bolt) {
          r = fgColor[0]; g = fgColor[1]; b = fgColor[2]; a = 255;
        } else {
          r = bgColor[0]; g = bgColor[1]; b = bgColor[2]; a = 255;
        }
      } else {
        r = 0; g = 0; b = 0; a = 0; // transparent outside rounded rect
      }

      const off = 1 + x * 4;
      row[off] = r; row[off+1] = g; row[off+2] = b; row[off+3] = a;
    }
    rows.push(row);
  }

  const rawData = Buffer.concat(rows);
  const compressed = deflateSync(rawData);

  function chunk(type, data) {
    const buf = Buffer.alloc(12 + data.length);
    buf.writeUInt32BE(data.length, 0);
    buf.write(type, 4, 'ascii');
    data.copy(buf, 8);
    // CRC32
    const crc = crc32(Buffer.concat([Buffer.from(type, 'ascii'), data]));
    buf.writeUInt32BE(crc, 8 + data.length);
    return buf;
  }

  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (const b of buf) {
      crc ^= b;
      for (let i = 0; i < 8; i++)
        crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync('public', { recursive: true });

const bg = [134, 59, 255];   // #863bff
const fg = [255, 255, 255];  // white

for (const size of [192, 512]) {
  const png = makePNG(size, bg, fg);
  const path = `public/pwa-${size}x${size}.png`;
  const ws = createWriteStream(path);
  ws.write(png);
  ws.end();
  console.log(`✓ ${path} (${png.length} bytes)`);
}

// Also write a simple maskable icon (same but with more padding)
const png512 = makePNG(512, bg, fg);
const ws = createWriteStream('public/pwa-maskable-512x512.png');
ws.write(png512);
ws.end();
console.log('✓ public/pwa-maskable-512x512.png');
