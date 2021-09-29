export interface OptionsObject {
    [key: string]: any;
    textContent: string;
    value: string;
}
export default function ToOptions(value: any, keyMap?: {
    [key: string]: string;
}): OptionsObject[];
