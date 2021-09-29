declare const defaultHandler: (_api?: DragApi) => void;
export interface DragOptions {
    target: HTMLElement;
    container?: HTMLElement;
    onMove?: typeof defaultHandler;
    onStart?: typeof defaultHandler;
    onStop?: typeof defaultHandler;
    startOnContainer?: boolean;
    contained?: boolean;
}
export interface DragApi {
    target: HTMLElement;
    container: HTMLElement;
    dragging: boolean;
    contained: boolean;
    stop: () => void;
    start: (e: MouseEvent) => void;
    dispose: () => void;
    onMove: typeof defaultHandler;
    onStart: typeof defaultHandler;
    onStop: typeof defaultHandler;
    startXDistance: number;
    startYDistance: number;
    x: number;
    y: number;
    width: number;
    height: number;
    containerX: number;
    containerY: number;
    containerWidth: number;
    containerHeight: number;
    percentX: number;
    percentY: number;
}
export default function Drag({ target, onMove, onStart, onStop, startOnContainer, contained }: DragOptions): Promise<unknown>;
export {};
