export interface OnNextFrameObject {
    hasRun: boolean;
    canceled: boolean;
    task: Function;
    promise: Promise<any>;
    resolve: any;
    reject: any;
    id: string;
    cancel: Function;
}
declare function OnNextFrame(task: Function): OnNextFrameObject;
declare namespace OnNextFrame {
    var max: (max: number) => void;
}
export default OnNextFrame;
