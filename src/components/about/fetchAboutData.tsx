"use client";

import { useEffect, useState } from "react";

export function useAboutData() {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch("http://localhost:5000/api/about", {
                    credentials: "include",
                });
                const data = await res.json();
                setAboutData(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return { aboutData, loading };
}
