/**
 * Page Info — Extract meta, OG, and structured data from pages
 */
export class PageInfo {
    /** Get all meta tags */
    static getMeta(): Record<string, string> {
        const meta: Record<string, string> = {};
        document.querySelectorAll('meta').forEach((el) => {
            const key = el.getAttribute('name') || el.getAttribute('property') || el.getAttribute('http-equiv');
            const value = el.getAttribute('content');
            if (key && value) meta[key] = value;
        });
        return meta;
    }

    /** Get Open Graph data */
    static getOpenGraph(): Record<string, string> {
        const og: Record<string, string> = {};
        document.querySelectorAll('meta[property^="og:"]').forEach((el) => {
            const prop = el.getAttribute('property')?.replace('og:', '') || '';
            const content = el.getAttribute('content') || '';
            if (prop) og[prop] = content;
        });
        return og;
    }

    /** Get Twitter Card data */
    static getTwitterCard(): Record<string, string> {
        const tw: Record<string, string> = {};
        document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => {
            const name = el.getAttribute('name')?.replace('twitter:', '') || '';
            const content = el.getAttribute('content') || '';
            if (name) tw[name] = content;
        });
        return tw;
    }

    /** Get page title */
    static getTitle(): string { return document.title; }

    /** Get canonical URL */
    static getCanonical(): string | null {
        return document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || null;
    }

    /** Get all headings structure */
    static getHeadings(): Array<{ level: number; text: string }> {
        return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((el) => ({
            level: parseInt(el.tagName[1]), text: el.textContent?.trim() || '',
        }));
    }

    /** Get page links count */
    static getLinkStats(): { internal: number; external: number; total: number } {
        const links = Array.from(document.querySelectorAll('a[href]'));
        const host = location.hostname;
        const internal = links.filter((a) => { try { return new URL(a.getAttribute('href') || '', location.href).hostname === host; } catch { return false; } });
        return { internal: internal.length, external: links.length - internal.length, total: links.length };
    }

    /** Get images without alt text */
    static getImagesWithoutAlt(): HTMLImageElement[] {
        return Array.from(document.querySelectorAll('img')).filter((img) => !img.alt || img.alt.trim() === '');
    }

    /** Full page report */
    static getFullReport(): Record<string, unknown> {
        return {
            title: this.getTitle(), canonical: this.getCanonical(), meta: this.getMeta(), og: this.getOpenGraph(),
            twitter: this.getTwitterCard(), headings: this.getHeadings(), links: this.getLinkStats(),
            imagesWithoutAlt: this.getImagesWithoutAlt().length
        };
    }
}
