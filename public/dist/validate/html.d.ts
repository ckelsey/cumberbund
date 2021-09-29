export interface ValidationResult {
    original: string | number;
    valid: boolean;
    sanitized: string | number;
    reason: string[];
}
export default function ValidateHtml(str: string, disallowedHtmlTags?: string[], allowedHtmlTags?: string[]): ValidationResult;
export declare const SantizedHTML: (val: string) => string;
