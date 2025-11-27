"use client";

import { useEffect, useState } from "react";

export function ForestBackground() {
    const [leaves, setLeaves] = useState<Array<{
        id: number;
        left: number;
        delay: number;
        duration: number;
        type: string;
    }>>([]);

    useEffect(() => {
        // Generate random falling leaves
        const newLeaves = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 10,
            duration: 15 + Math.random() * 10,
            type: ['🍂', '🍃', '🍁'][Math.floor(Math.random() * 3)]
        }));
        setLeaves(newLeaves);
    }, []);

    return (
        <>
            {/* Sunlight Filter */}
            <div className="fixed inset-0 sunlight-filter pointer-events-none z-0" />

            {/* Falling Leaves */}
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    className="fixed text-2xl opacity-60 pointer-events-none z-10 leaf-fall"
                    style={{
                        left: `${leaf.left}%`,
                        animationDelay: `${leaf.delay}s`,
                        animationDuration: `${leaf.duration}s`,
                    }}
                >
                    {leaf.type}
                </div>
            ))}

            {/* Static Decorative Elements */}
            <div className="fixed top-20 left-10 w-16 h-16 opacity-30 floating pointer-events-none z-10">
                <div className="text-6xl">🍄</div>
            </div>
            <div className="fixed top-40 right-20 w-12 h-12 opacity-40 floating pointer-events-none z-10" style={{ animationDelay: '1s' }}>
                <div className="text-5xl">🌸</div>
            </div>
            <div className="fixed bottom-40 left-20 w-14 h-14 opacity-35 floating pointer-events-none z-10" style={{ animationDelay: '2s' }}>
                <div className="text-5xl">🦊</div>
            </div>
            <div className="fixed top-1/2 right-10 w-10 h-10 opacity-25 floating pointer-events-none z-10" style={{ animationDelay: '1.5s' }}>
                <div className="text-4xl">🐿️</div>
            </div>
        </>
    );
}
