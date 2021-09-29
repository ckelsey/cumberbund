export interface TimerSubscription {
    id: string;
    resolved: boolean;
    resolve: any;
    reject: any;
    started: number;
    stepFn: Function;
    frameValues: number[];
    end?: number;
    cancel: Function;
    then: (value?: any) => Promise<any>;
    catch: (value?: any) => Promise<any>;
    promise: Promise<any>;
}
declare const Timer: (stepFn: Function, frameValues: number[]) => TimerSubscription;
export default Timer;
