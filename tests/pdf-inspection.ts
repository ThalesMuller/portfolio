import { createRequire } from 'node:module';
import { dirname, join, sep } from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const require = createRequire(import.meta.url);
const standardFontDataUrl =
  join(dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts').replaceAll(sep, '/') + '/';

export async function inspectPdf(bytes: Uint8Array) {
  const task = getDocument({ data: Uint8Array.from(bytes), standardFontDataUrl });
  const document = await task.promise;
  try {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const [left, bottom, right, top] = page.view;
      const content = await page.getTextContent();
      const text = content.items.flatMap((item) => ('str' in item && item.str.trim() ? [item] : []));
      const annotations: { url?: string }[] = await page.getAnnotations({ intent: 'display' });
      pages.push({
        width: right - left,
        height: top - bottom,
        text: text
          .map(({ str }) => str)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim(),
        links: annotations.flatMap(({ url }) => (url ? [url] : [])),
        bounds: text.map(({ transform, width, height, fontName }) => {
          const { ascent, descent } = content.styles[fontName];
          return {
            left: transform[4],
            right: transform[4] + width,
            bottom: transform[5] + descent * height,
            top: transform[5] + ascent * height,
          };
        }),
      });
    }
    return pages;
  } finally {
    await task.destroy();
  }
}
