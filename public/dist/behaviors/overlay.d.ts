declare const alignments: readonly ["center", "top", "bottom", "left", "right"];
export interface OverlayOptions {
    target: HTMLElement;
    attachedTo?: HTMLElement;
    align?: typeof alignments[number];
    startXFrom?: typeof alignments[number];
    startYFrom?: typeof alignments[number];
}
export interface OverlayApi {
    target: HTMLElement;
    attachedTo?: HTMLElement;
    align?: typeof alignments[number];
    startXFrom?: typeof alignments[number];
    startYFrom?: typeof alignments[number];
    active: boolean;
    dispose: () => void;
}
export default function Overlay({ target, attachedTo, align, startXFrom, startYFrom }: OverlayOptions): Promise<OverlayApi>;
export {};
