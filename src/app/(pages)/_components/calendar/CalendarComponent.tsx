'use client';

import {Calendar} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import listPlugin from "@fullcalendar/react/list";
import themePlugin from "@fullcalendar/react/themes/breezy";

import '@fullcalendar/react/skeleton.css';
import '@fullcalendar/react/themes/breezy/theme.css';
import '@fullcalendar/react/themes/breezy/palettes/rose.css';

import type { PublicEvent } from "@/app/(api)/api/Events";
import React, {useSyncExternalStore} from "react";

type CalendarComponentProps = {
    events: PublicEvent[];
}

const subscribe = () => () => {};

const CalendarComponent = (props: CalendarComponentProps) => {
    const isClient = useSyncExternalStore(subscribe, () => true, () => false);
    if (!isClient) return null; // or a skeleton with reserved height

    return (
        <Calendar
            colorScheme="dark"
            plugins={[themePlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek" }}
            views={{
                timeGridWeek: {
                    titleFormat: { month: "short", day: "numeric", year: "numeric" }, // "Nov 8 – 14, 2026"
                    dayHeaderFormat: { weekday: "short", day: "numeric" },           // "S 8", "M 9", …
                },
            }}
            events={props.events}
            height="auto"
            nowIndicator
        />
    );
}

export default CalendarComponent;
