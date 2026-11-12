import "server-only";

import IcalExpander from "ical-expander";
import { cacheLife } from "next/cache";

export type PublicEvent = {
    title: string;
    description?: string;
    start: string;
    end?: string;
    allDay: boolean;
    tentative?: boolean;
};

// prevent like remote code execution or something
const toPlainText = (raw?: string): string | undefined => {
    if (!raw) return undefined;
    const text = raw
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/(p|div|li)>/gi, "\n")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
    return text || undefined;
};

async function getSingleCalendarEvents(calendarUrl : string, ignoreFree: boolean) {
    const res = await fetch(calendarUrl);
    if (!res.ok) throw new Error(`ICS fetch failed: ${res.status}`);
    const ics = await res.text();

    const now = Date.now();
    const start = new Date(now - 360 * 864e5);  // 12 months back
    const end = new Date(now + 360 * 864e5);   // 12 months ahead

    const expander = new IcalExpander({ ics, maxIterations: 2000 });
    const { events, occurrences } = expander.between(start, end);

    const toPublic = (ev: any, s: any, e: any): PublicEvent => {
        const isPrivate = ev.component.getFirstPropertyValue("class") === "PRIVATE";
        const isTentative =
            ev.component.getFirstPropertyValue("status") === "TENTATIVE" ||
            ev.component.getFirstPropertyValue("x-microsoft-cdo-busystatus") === "TENTATIVE";

        return {
            title: isPrivate || !ev.summary ? (isTentative ? "Tentative" : "Busy") : ev.summary,
            description: isPrivate ? undefined : toPlainText(ev.description),
            start: s.isDate ? s.toString() : s.toJSDate().toISOString(),
            end: e ? (e.isDate ? e.toString() : e.toJSDate().toISOString()) : undefined,
            allDay: s.isDate,
            tentative: isTentative || undefined,
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
