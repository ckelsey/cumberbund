export interface ScreenShareObject {
    stream: null | MediaStream;
    frame: () => Promise<Blob>;
    isSharing: boolean;
    start: (options?: undefined | MediaStreamConstraints) => Promise<MediaStream>;
    stop: () => void;
    can: boolean;
    onEnd: (callback: Function) => void;
}
declare const ScreenShare: ScreenShareObject;
export default ScreenShare;
