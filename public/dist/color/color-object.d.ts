export interface ColorResult {
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    l: number;
    a: number;
    hex: string;
    toHex: () => string;
    toHsl: () => string;
    toHsla: () => string;
    toRgb: () => string;
    toRgba: () => string;
}
export declare function ColorType(color?: string): "" | "rgb" | "hsl" | "hex";
export default function ColorObject(color?: string): ColorResult;
