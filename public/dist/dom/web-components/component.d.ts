import { ObserverInstance } from '../../observe/observer';
export interface ComponentState {
    initialValue?: any;
    matchType?: boolean;
    isAttribute?: boolean;
    formatter?: (value: any, observerInstance?: ObserverInstance) => any;
    onChange?: (value: any, observerInstance?: ObserverInstance) => any;
}
export declare type ComponentStateObject = {
    [key: string]: ComponentState;
};
export declare type PropertiesObject = {
    [key: string]: PropertyDescriptor & ThisType<any>;
};
export interface ComponentConfig {
    selector: string;
    template: string;
    style?: string;
    state?: ComponentStateObject;
    connectedCallback?: () => void;
    disconnectedCallback?: () => void;
    properties?: PropertiesObject;
}
export default function CreateComponent(config: ComponentConfig): any;
