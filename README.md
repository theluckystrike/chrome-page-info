# chrome-page-info — Page Data Extractor for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i chrome-page-info`

Extract meta tags, Open Graph, Twitter Card, headings, link stats, and SEO data.

```typescript
import { PageInfo } from 'chrome-page-info';
const og = PageInfo.getOpenGraph();
const headings = PageInfo.getHeadings();
const report = PageInfo.getFullReport();
```
MIT License
