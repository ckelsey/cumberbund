import { RouteObject } from './routing';
export default function GetRouteByPath(routes: {
    [key: string]: RouteObject;
}): (path?: string) => RouteObject | undefined;
