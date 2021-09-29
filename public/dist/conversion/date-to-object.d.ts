export interface DateObject {
    year: number;
    yearShort: string;
    monthIndex: number;
    month: number;
    monthDouble: string;
    monthName: string;
    monthNameShort: string;
    day: number;
    dayDouble: string;
    dayOfWeek: string;
    dayOfWeekShort: string;
    dayIndex: number;
    hour24: number;
    hour: number;
    hourDouble: string;
    hourDouble24: string;
    minutes: number;
    minutesDouble: string;
    seconds: number;
    secondsDouble: string;
    milliseconds: number;
    ampm: string;
    date: Date;
}
export default function DateToObject(value: any): Date | DateObject;
