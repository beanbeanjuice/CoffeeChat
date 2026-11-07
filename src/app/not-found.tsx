import { Suspense } from "react";
import { connection } from "next/server";

async function DynamicMarker() {
    await connection();
    return null;
}

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <Suspense>
                <DynamicMarker />
            </Suspense>
        </div>
    );
}
