# chrome-page-info

[![npm version](https://img.shields.io/npm/v/chrome-page-info)](https://npmjs.com/package/chrome-page-info)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-page-info?style=social)](https://github.com/theluckystrike/chrome-page-info)

Page information extractor for Chrome extensions. Pulls meta tags, Open Graph, Twitter Card data, heading structure, link stats, and accessibility checks from any page. Built for Manifest V3.

INSTALL

```bash
npm install chrome-page-info
```

USAGE

```ts
import { PageInfo } from 'chrome-page-info';

// All meta tags as key-value pairs
const meta = PageInfo.getMeta();
console.log(meta['description']);
console.log(meta['viewport']);

// Open Graph properties with the og: prefix stripped
const og = PageInfo.getOpenGraph();
console.log(og.title, og.image, og.description);

// Twitter Card properties with the twitter: prefix stripped
const twitter = PageInfo.getTwitterCard();
console.log(twitter.card, twitter.site);

// Page title and canonical URL
const title = PageInfo.getTitle();
const canonical = PageInfo.getCanonical();

// Heading outline
const headings = PageInfo.getHeadings();
headings.forEach((h) => console.log(`${'#'.repeat(h.level)} ${h.text}`));

// Link breakdown
const links = PageInfo.getLinkStats();
console.log(`${links.internal} internal, ${links.external} external links`);

// Images missing alt text
const missing = PageInfo.getImagesWithoutAlt();
console.log(`${missing.length} images without alt`);

// Full page report combining everything above
const report = PageInfo.getFullReport();
console.log(JSON.stringify(report, null, 2));
```

API

All methods on PageInfo are static. They read from the current document and return plain data.

PageInfo.getMeta() returns Record<string, string>
Collects every meta tag on the page. Keys come from the name, property, or http-equiv attribute. Values come from content.

PageInfo.getOpenGraph() returns Record<string, string>
Reads meta tags whose property starts with og: and returns them as a flat object with the prefix removed.

PageInfo.getTwitterCard() returns Record<string, string>
Reads meta tags whose name starts with twitter: and returns them as a flat object with the prefix removed.

PageInfo.getTitle() returns string
Returns document.title.

PageInfo.getCanonical() returns string or null
Returns the href from the link rel=canonical element, or null when no canonical is set.

PageInfo.getHeadings() returns Array of { level, text }
Walks every h1 through h6 on the page and returns an array of objects with a numeric level (1 to 6) and the trimmed text content.

PageInfo.getLinkStats() returns { internal, external, total }
Counts all anchor elements with an href. Classifies each link as internal or external by comparing hostnames.

PageInfo.getImagesWithoutAlt() returns HTMLImageElement[]
Returns img elements that have no alt attribute or an empty one. Useful for accessibility audits.

PageInfo.getFullReport() returns Record<string, unknown>
Runs every method above and returns a single object with title, canonical, meta, og, twitter, headings, links, and a count of images missing alt text.

CONTRIBUTING

Contributions are welcome. Fork the repo, create a branch, and open a pull request.

```
git clone https://github.com/theluckystrike/chrome-page-info.git
cd chrome-page-info
npm install
npm run build
```

LICENSE

MIT. See LICENSE file for details.

---

Part of the Zovo open source family at https://zovo.one
