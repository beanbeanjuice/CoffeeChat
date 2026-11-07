'use client';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import listPlugin from "@fullcalendar/react/list";
import themePlugin from "@fullcalendar/react/themes/classic";

import "@fullcalendar/react/skeleton.css";
import "@fullcalendar/react/themes/classic/theme.css";
import "@fullcalendar/react/themes/classic/palette.css";

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
        <FullCalendar
            plugins={[themePlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,listWeek" }}
            events={props.events}
            height="auto"
            nowIndicator
        />
    );
}

export default CalendarComponent;
