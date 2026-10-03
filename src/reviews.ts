import type {IReviewItem} from './types.ts';

export function parseReviews(text: string): IReviewItem[] {
    let value: unknown;
    try { value = JSON.parse(text); }
    catch { throw new Error('Invalid JSON. Please check the review file or text.'); }
    if (!Array.isArray(value)) throw new Error('Reviews must be a JSON array.');
    return value.map((entry, index) => {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry) ||
            !['reviewer', 'date_reviewed', 'message'].every(key => typeof entry[key] === 'string') ||
            !Number.isInteger(entry.star_rating) || entry.star_rating < 1 || entry.star_rating > 5 ||
            !Number.isSafeInteger(entry.order_id) || entry.order_id < 0) {
            throw new Error(`Review ${index + 1} must contain reviewer, date_reviewed, message, a rating from 1 to 5 and a numeric order_id.`);
        }
        // Keep original fields and their order for CSV compatibility.
        return entry as IReviewItem;
    });
}

export async function exportImage(options: {
    node: HTMLElement; tick: () => Promise<void>;
    capture: (node: HTMLElement) => Promise<string>;
    save: (url: string) => void;
    setBusy: (busy: boolean) => void;
}): Promise<void> {
    options.setBusy(true);
    try {
        await options.tick();
        const url = await options.capture(options.node);
        options.save(url);
    } finally { options.setBusy(false); }
}
