# chrome-page-info

[![npm version](https://img.shields.io/npm/v/chrome-page-info)](https://npmjs.com/package/chrome-page-info)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)

> Page information extractor for Chrome extensions -- meta tags, Open Graph, Twitter Card, headings, link stats, and SEO analysis for MV3.

## Install

```bash
npm install chrome-page-info
```

## Usage

```ts
import { PageInfo } from 'chrome-page-info';

// Get all meta tags as key-value pairs
const meta = PageInfo.getMeta();
console.log(meta['description']);
console.log(meta['viewport']);

// Extract Open Graph data
const og = PageInfo.getOpenGraph();
console.log(og.title, og.image, og.description);

// Extract Twitter Card data
const twitter = PageInfo.getTwitterCard();
console.log(twitter.card, twitter.site);

// Get page structure
const headings = PageInfo.getHeadings();
headings.forEach((h) => console.log(`${'#'.repeat(h.level)} ${h.text}`));

// SEO analysis
const links = PageInfo.getLinkStats();
console.log(`${links.internal} internal, ${links.external} external links`);

const missingAlt = PageInfo.getImagesWithoutAlt();
console.log(`${missingAlt.length} images missing alt text`);

// Get a complete page report
const report = PageInfo.getFullReport();
console.log(JSON.stringify(report, null, 2));
```

## API

### `class PageInfo`

All methods are static and operate on the current `document`.

#### `static getMeta(): Record<string, string>`

Returns all `<meta>` tags as a key-value object. Keys are derived from the `name`, `property`, or `http-equiv` attribute; values from the `content` attribute.

#### `static getOpenGraph(): Record<string, string>`

Returns Open Graph (`og:*`) meta properties as a key-value object with the `og:` prefix stripped from keys.

#### `static getTwitterCard(): Record<string, string>`

Returns Twitter Card (`twitter:*`) meta properties as a key-value object with the `twitter:` prefix stripped from keys.

#### `static getTitle(): string`

Returns the page title (`document.title`).

#### `static getCanonical(): string | null`

Returns the canonical URL from `<link rel="canonical">`, or `null` if none exists.

#### `static getHeadings(): Array<{ level: number; text: string }>`

Returns all headings (`h1` through `h6`) as an array of objects with `level` (1--6) and `text` content.

#### `static getLinkStats(): { internal: number; external: number; total: number }`

Counts all anchor links on the page and classifies them as internal or external based on hostname comparison.

#### `static getImagesWithoutAlt(): HTMLImageElement[]`

Returns an array of `<img>` elements that have no `alt` attribute or an empty `alt` attribute.

#### `static getFullReport(): Record<string, unknown>`

Returns a comprehensive page report combining title, canonical URL, meta tags, Open Graph, Twitter Card, headings, link stats, and a count of images missing alt text.

## License

MIT

## See Also

### Related Zovo Repositories

- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Production-ready Chrome extension starter
- [awesome-chrome-extensions-dev](https://github.com/theluckystrike/awesome-chrome-extensions-dev) - Curated list of Chrome extension development resources
- [chrome-data-encrypt](https://github.com/theluckystrike/chrome-data-encrypt) - AES-256 encryption for extensions

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.
