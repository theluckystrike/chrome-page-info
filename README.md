# chrome-page-info

[![npm version](https://img.shields.io/npm/v/chrome-page-info)](https://npmjs.com/package/chrome-page-info)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-page-info/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-page-info/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-page-info?style=social)](https://github.com/theluckystrike/chrome-page-info)

> Page information extractor for Chrome extensions — meta tags, Open Graph, structured data, technology detection, and SEO analysis for MV3.

**chrome-page-info** provides utilities to extract comprehensive page information including metadata, favicon, security details, Open Graph data, and technology detection — all with a simple, type-safe API.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Page Metadata** - Extract title, URL, favicon
- ✅ **Open Graph** - Get OG tags, images, descriptions
- ✅ **Security Info** - Protocol, certificate details
- ✅ **Structured Data** - Parse JSON-LD and microdata
- ✅ **Technology Detection** - Detect frameworks and libraries
- ✅ **SEO Analysis** - Meta tags, descriptions, keywords
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install chrome-page-info
```

## Quick Start

```typescript
import { getPageInfo } from 'chrome-page-info';

const info = await getPageInfo(tabId);
console.log(info.title, info.url, info.favicon);
```

## Usage Examples

### Get Page Info

```typescript
import { getPageInfo } from 'chrome-page-info';

const info = await getPageInfo(tabId);
console.log(info.title, info.url, info.favicon);
```

### Get Metadata

```typescript
const meta = await getPageInfo(tabId, {
  metadata: true,
});

console.log(meta.ogTitle, meta.ogImage, meta.description);
```

### Get Security Info

```typescript
const security = await getPageInfo(tabId, {
  security: true,
});

console.log(security.protocol, security.certIssuer, security.isSecure);
```

### Get Structured Data

```typescript
const data = await getPageInfo(tabId, {
  structuredData: true,
});

console.log(data.jsonLd, data.microdata);
```

### Technology Detection

```typescript
const tech = await getPageInfo(tabId, {
  technologies: true,
});

console.log(tech.frameworks, tech.libraries, tech.cms);
```

## API

### getPageInfo Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| metadata | boolean | false | Include Open Graph meta |
| security | boolean | false | Include security info |
| favicon | boolean | true | Include favicon URL |
| structuredData | boolean | false | Include JSON-LD/microdata |
| technologies | boolean | false | Detect frameworks/libraries |

### Return Properties

- `title` - Page title
- `url` - Page URL
- `favicon` - Favicon URL
- `ogTitle`, `ogImage`, `ogDescription` - Open Graph
- `protocol` - Security protocol
- `certIssuer` - Certificate issuer
- `jsonLd` - JSON-LD structured data
- `technologies` - Detected technologies

## Manifest

```json
{
  "permissions": ["tabCapture", "tabs"]
}
```

## Browser Support

- Chrome 90+
- Manifest V3

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/page-info-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/page-info-feature`
7. **Submit** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/theluckystrike/chrome-page-info.git
cd chrome-page-info

# Install dependencies
npm install

# Build
npm run build
```

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage wrapper
- [chrome-network-monitor](https://github.com/theluckystrike/chrome-network-monitor) - Network monitoring
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Extension template

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
