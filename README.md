# chrome-page-info

Get detailed page information in Chrome extensions.

## Overview

chrome-page-info provides utilities to extract comprehensive page information including metadata, favicon, security details, and Open Graph data.

## Installation

```bash
npm install chrome-page-info
```

## Usage

### Get Page Info

```javascript
import { getPageInfo } from 'chrome-page-info';

const info = await getPageInfo(tabId);
console.log(info.title, info.url, info.favicon);
```

### Get Metadata

```javascript
const meta = await getPageInfo(tabId, {
  metadata: true,
});

console.log(meta.ogTitle, meta.ogImage, meta.description);
```

### Get Security Info

```javascript
const security = await getPageInfo(tabId, {
  security: true,
});

console.log(security.protocol, security.certIssuer, security.isSecure);
```

## API

### getPageInfo Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| metadata | boolean | false | Include Open Graph meta |
| security | boolean | false | Include security info |
| favicon | boolean | true | Include favicon URL |

### Return Properties

- `title` - Page title
- `url` - Page URL
- `favicon` - Favicon URL
- `ogTitle`, `ogImage`, `ogDescription` - Open Graph
- `protocol` - Security protocol
- `certIssuer` - Certificate issuer

## Manifest

```json
{
  "permissions": ["tabCapture", "tabs"]
}
```

## Browser Support

- Chrome 90+

## License

MIT
