export default function ElementEvents(element: any): {
    add?: undefined;
    remove?: undefined;
    dispose?: undefined;
    events?: undefined;
} | {
    add: (eventName: string, callback: any) => void;
    remove: (key: string) => void;
    dispose: () => void;
    events: {
        [key: string]: () => void;
    };
};
