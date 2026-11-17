// GitHub Pages needs two extra files that the TanStack Start build does not emit.
import { access, copyFile, writeFile } from "node:fs/promises";

const out = ".output/public";
const index = `${out}/index.html`;

try {
  await access(index);
} catch {
  throw new Error(
    `prerendering produced no ${index}, so GitHub Pages would 404 every URL. ` +
      `Check the tanstackStart.prerender settings in vite.config.ts.`,
  );
}

// Unknown paths fall back to the app shell instead of GitHub's own 404 page.
await copyFile(index, `${out}/404.html`);

// Stops Pages from running Jekyll, which drops files/folders starting with "_".
await writeFile(`${out}/.nojekyll`, "");

console.log("[github-pages] wrote 404.html and .nojekyll");
