import "server-only";

import IcalExpander from "ical-expander";
import { cacheLife } from "next/cache";

export type PublicEvent = {
    title: string;
    start: string;
    end?: string;
    allDay: boolean;
};

async function getSingleCalendarEvents(calendarUrl : string, ignoreFree: boolean) {
    const res = await fetch(calendarUrl);
    if (!res.ok) throw new Error(`ICS fetch failed: ${res.status}`);
    const ics = await res.text();

    const now = Date.now();
    const start = new Date(now - 60 * 864e5);  // 2 months back
    const end = new Date(now + 180 * 864e5);   // 6 months ahead

    const expander = new IcalExpander({ ics, maxIterations: 2000 });
    const { events, occurrences } = expander.between(start, end);

    const toPublic = (ev: any, s: any, e: any): PublicEvent => {
        const isPrivate = ev.component.getFirstPropertyValue("class") === "PRIVATE";

        return {
            title: isPrivate ? "Busy" : ev.summary || "Busy",
            start: s.isDate ? s.toString() : s.toJSDate().toISOString(),
            end: e ? (e.isDate ? e.toString() : e.toJSDate().toISOString()) : undefined,
            allDay: s.isDate,
        };
    };

    return [
        events.map((e: any) => toPublic(e, e.startDate, e.endDate)).filter((e) => !(ignoreFree && e.title === "Free")),
        occurrences.map((o: any) => toPublic(o.item, o.startDate, o.endDate)).filter((e) => !(ignoreFree && e.title === "Free")),
    ];
}

export async function getEvents(ignoreFree: boolean = false): Promise<PublicEvent[]> {
    "use cache";
    cacheLife("minutes"); // re-fetch from Outlook every few minutes

    const calendarUrls = process.env.CALENDAR_ICS_LINK!.split(",");

    const events = [];
    const occurrences = [];

    for (const calendarUrl of calendarUrls) {
        const [singleCalendarEvents, singleCalendarOccurrences] = await getSingleCalendarEvents(calendarUrl, ignoreFree);

        events.push(...singleCalendarEvents);
        occurrences.push(...singleCalendarOccurrences);
    }

    return [
        ...events,
        ...occurrences
    ];
}
