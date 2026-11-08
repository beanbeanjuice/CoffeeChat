'use server';

import styles from "./Home.module.scss";
import CalendarComponent from "@/app/(pages)/_components/calendar/CalendarComponent";
import { getEvents } from "@/app/(api)/api/Events";
import {connection} from "next/server";

const Home = async () => {
    await connection();

    const ignoreFree = process.env.IGNORE_FREE === "true";
    const events = await getEvents(ignoreFree);

    return (
        <div className={styles.Home}>
            <CalendarComponent events={events} />
        </div>
    );
}

export default Home;
