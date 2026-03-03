/**
 * Page Info — Extract meta, OG, and structured data from pages
 */

/** Custom error class for PageInfo operations */
export class PageInfoError extends Error {
    constructor(
        message: string,
        public code: string,
        public suggestion?: string
    ) {
        super(message);
        this.name = 'PageInfoError';
        Error.captureStackTrace(this, this.constructor);
    }
}

/** Error codes for PageInfo operations */
export const PageInfoErrorCode = {
    DOM_NOT_READY: 'DOM_NOT_READY',
    INVALID_CONTEXT: 'INVALID_CONTEXT',
    PARSE_ERROR: 'PARSE_ERROR',
    QUERY_ERROR: 'QUERY_ERROR',
} as const;

export class PageInfo {
    /** Get all meta tags */
    static getMeta(): Record<string, string> {
        try {
            if (typeof document === 'undefined') {
                throw new PageInfoError(
                    'Document is not available in current context',
                    PageInfoErrorCode.INVALID_CONTEXT,
                    'This method must be called in a browser environment with DOM access'
                );
            }
            const meta: Record<string, string> = {};
            document.querySelectorAll('meta').forEach((el) => {
                const key = el.getAttribute('name') || el.getAttribute('property') || el.getAttribute('http-equiv');
                const value = el.getAttribute('content');
                if (key && value) meta[key] = value;
            });
            return meta;
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to get meta tags: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.QUERY_ERROR,
                'Ensure the page has fully loaded before calling this method'
            );
        }
    }

    /** Get Open Graph data */
    static getOpenGraph(): Record<string, string> {
        try {
            if (typeof document === 'undefined') {
                throw new PageInfoError(
                    'Document is not available in current context',
                    PageInfoErrorCode.INVALID_CONTEXT,
                    'This method must be called in a browser environment with DOM access'
                );
            }
            const og: Record<string, string> = {};
            document.querySelectorAll('meta[property^="og:"]').forEach((el) => {
                const prop = el.getAttribute('property')?.replace('og:', '') || '';
                const content = el.getAttribute('content') || '';
                if (prop) og[prop] = content;
            });
            return og;
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to get Open Graph data: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.PARSE_ERROR,
                'Ensure the page has Open Graph meta tags defined'
            );
        }
    }

    /** Get Twitter Card data */
    static getTwitterCard(): Record<string, string> {
        try {
            if (typeof document === 'undefined') {
                throw new PageInfoError(
                    'Document is not available in current context',
                    PageInfoErrorCode.INVALID_CONTEXT,
                    'This method must be called in a browser environment with DOM access'
                );
            }
            const tw: Record<string, string> = {};
            document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => {
                const name = el.getAttribute('name')?.replace('twitter:', '') || '';
                const content = el.getAttribute('content') || '';
                if (name) tw[name] = content;
            });
            return tw;
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to get Twitter Card data: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.PARSE_ERROR,
                'Ensure the page has Twitter Card meta tags defined'
            );
        }
    }

    /** Get page title */
    static getTitle(): string {
        try {
            if (typeof document === 'undefined') {
                throw new PageInfoError(
                    'Document is not available in current context',
                    PageInfoErrorCode.INVALID_CONTEXT,
                    'This method must be called in a browser environment with DOM access'
                );
            }
            return document.title;
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to get page title: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.QUERY_ERROR,
                'Ensure the page has a <title> element'
            );
        }
    }

    /** Get canonical URL */
    static getCanonical(): string | null {
        try {
            if (typeof document === 'undefined') {
                throw new PageInfoError(
                    'Document is not available in current context',
                    PageInfoErrorCode.INVALID_CONTEXT,
                    'This method must be called in a browser environment with DOM access'
                );
            }
            return document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href || null;
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to get canonical URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.QUERY_ERROR,
                'Ensure the page has a canonical link tag: <link rel="canonical" href="...">'
            );
        }
    }

    /** Get all headings structure */
    static getHeadings(): Array<{ level: number; text: string }> {
        try {
            if (typeof document === 'undefined') {
                throw new PageInfoError(
                    'Document is not available in current context',
                    PageInfoErrorCode.INVALID_CONTEXT,
                    'This method must be called in a browser environment with DOM access'
                );
            }
            return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((el) => ({
                level: parseInt(el.tagName[1]), text: el.textContent?.trim() || '',
            }));
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to get headings: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.QUERY_ERROR
            );
        }
    }

    /** Get page links count */
    static getLinkStats(): { internal: number; external: number; total: number } {
        try {
            if (typeof document === 'undefined' || typeof location === 'undefined') {
                throw new PageInfoError(
                    'Document/Location is not available in current context',
                    PageInfoErrorCode.INVALID_CONTEXT,
                    'This method must be called in a browser environment with DOM access'
                );
            }
            const links = Array.from(document.querySelectorAll('a[href]'));
            const host = location.hostname;
            const internal = links.filter((a) => { 
                try { 
                    const href = a.getAttribute('href');
                    if (!href) return false;
                    // Handle relative URLs
                    const url = href.startsWith('http') ? href : new URL(href, location.href).href;
                    return new URL(url).hostname === host; 
                } catch { return false; } 
            });
            return { internal: internal.length, external: links.length - internal.length, total: links.length };
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to get link stats: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.QUERY_ERROR
            );
        }
    }

    /** Get images without alt text */
    static getImagesWithoutAlt(): HTMLImageElement[] {
        try {
            if (typeof document === 'undefined') {
                throw new PageInfoError(
                    'Document is not available in current context',
                    PageInfoErrorCode.INVALID_CONTEXT,
                    'This method must be called in a browser environment with DOM access'
                );
            }
            return Array.from(document.querySelectorAll('img')).filter((img) => !img.alt || img.alt.trim() === '');
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to get images without alt: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.QUERY_ERROR
            );
        }
    }

    /** Full page report */
    static getFullReport(): Record<string, unknown> {
        try {
            return {
                title: this.getTitle(), 
                canonical: this.getCanonical(), 
                meta: this.getMeta(), 
                og: this.getOpenGraph(),
                twitter: this.getTwitterCard(), 
                headings: this.getHeadings(), 
                links: this.getLinkStats(),
                imagesWithoutAlt: this.getImagesWithoutAlt().length
            };
        } catch (error) {
            if (error instanceof PageInfoError) throw error;
            throw new PageInfoError(
                `Failed to generate full report: ${error instanceof Error ? error.message : 'Unknown error'}`,
                PageInfoErrorCode.PARSE_ERROR,
                'Check individual methods for specific error details'
            );
        }
    }
}
