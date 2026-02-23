import React, { useEffect, useState } from "react";
import axios from "axios";

// --- Helper Functions (Unchanged) ---

// Convert 24-hour time to 12-hour format
const formatTimeTo12Hour = (time24) => {
    if (!time24) return "N/A";

    const [hour, minute] = time24.split(":");
    const h = Number(hour);
    const m = Number(minute);

    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;

    return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
};

// Format date nicely
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Calculate duration between start & end time
const calculateDuration = (start, end) => {
    if (!start || !end) return "N/A";

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const diffMinutes = (eh * 60 + em) - (sh * 60 + sm);

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    if (hours === 0) return `${minutes} Minutes`;
    if (minutes === 0) return `${hours} Hour${hours > 1 ? "s" : ""}`;

    return `${hours} Hour${hours > 1 ? "s" : ""} ${minutes} Minutes`;
};


function Slot() {
    const [slots, setSlots] = useState([]);
    const [typedText, setTypedText] = useState("");
    const [floatingItems, setFloatingItems] = useState([]);
    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch (err) {
            console.error("Failed to parse user from localStorage", err);
            return null;
        }
    });

    useEffect(() => {
        const handleUserLogin = () => {
            const stored = localStorage.getItem("user");
            setUser(stored ? JSON.parse(stored) : null);
        }

        window.addEventListener("userLogin", handleUserLogin);
        return () => window.removeEventListener("userLogin", handleUserLogin);
    }, []);

    // Typing effect logic
    useEffect(() => {
        const textToType = "Available Time Slots";
        let index = 0;
        const interval = setInterval(() => {
            if (index <= textToType.length) {
                setTypedText(textToType.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    // Initialize floating items once
    useEffect(() => {
        const icons = ['🏸', '🎾', '🏊', '🏓', '⚽', '🏀', '🥎'];
        const items = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            icon: icons[Math.floor(Math.random() * icons.length)],
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDuration: `${Math.floor(Math.random() * 15 + 10)}s`, // Random speed 10-25s
            animationDelay: `${Math.floor(Math.random() * 10)}s`, // Random start time
            size: `${Math.floor(Math.random() * 20 + 20)}px` // Random size
        }));
        setFloatingItems(items);
    }, []);

    // Data fetching logic
    useEffect(() => {
        fetch("http://localhost:8080/slots")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) setSlots(data);
            })
            .catch((err) => {
                console.log("Fetch failed (expected in preview), using mock data.", err);
            });
    }, []);

    const submitSlot = async (slot) => {
        console.log(slot);
        if (!user) {
            alert("Please login first");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/slot/${slot.slotId}`,
                {
                    ...slot,
                    bookingStatus: "BOOKED"
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            if (response.data) {
                const payload = {
                    customerId: user.userId,
                    slotId: slot.slotId,
                    customerName: user.fullName,
                    mobileNumber: user.mobileNumber,
                    bookingDate: slot.bookingDate,
                    gameType: slot.gameType,
                    startTime: slot.startTime,
                    endTime: slot.endTime
                };
                try {
                    const response = await axios.post(
                        "http://localhost:8080/confirmation",
                        payload
                    );
                    if (response.data) {
                        alert("slot booked Successful!");

                    }
                } catch (error) {
                    console.error("Login failed:", error.response?.data || error.message);
                }
            }

            const updatedSlot = response.data;
            setSlots(prevSlots =>
                prevSlots.map(s =>
                    s.slotId === updatedSlot.slotId ? updatedSlot : s
                )
            );
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Failed to book slot");
        }

    }


    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-emerald-50 font-sans">
            {/* --- Background Animation --- */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                {/* Greenish Blobs */}
                <div className="absolute top-0 left-[-10%] w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-[-10%] w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-[20%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="absolute -bottom-40 right-[10%] w-96 h-96 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-3000"></div>

                {/* Flying Sports Icons */}
                {floatingItems.map((item) => (
                    <div
                        key={item.id}
                        className="absolute bottom-[-10%] animate-fly opacity-30 select-none"
                        style={{
                            left: item.left,
                            fontSize: item.size,
                            animationDuration: item.animationDuration,
                            animationDelay: item.animationDelay,
                        }}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>

            {/* --- Original Content Wrapper --- */}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto p-6 my-8">
                    <h2
                        className="text-5xl mb-8 text-center text-gray-800 drop-shadow-md min-h-[4rem]"
                        style={{ fontFamily: "'Lobster', cursive", letterSpacing: "2px" }}
                    >
                        {typedText}
                        <span className="text-blue-600 animate-blink">|</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {slots.map((slot, index) => (
                            <div
                                key={index}
                                className="card-tilt cursor-pointer bg-white/40 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/40 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-emerald-600/90 to-teal-700/90 text-white py-4 px-6 backdrop-blur-sm">
                                    <h3
                                        className="text-2xl"
                                        style={{ fontFamily: "'Righteous', cursive", letterSpacing: "1px" }}
                                    >
                                        {slot.gameType}
                                    </h3>
                                </div>

                                {/* Body */}
                                <div className="p-6 space-y-4">
                                    {/* Date */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">📅</span>
                                        <div>
                                            <p className="text-sm text-gray-500">Date</p>
                                            <p className="font-semibold text-gray-800">
                                                {formatDate(slot.date)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">⏰</span>
                                        <div>
                                            <p className="text-sm text-gray-500">Time</p>
                                            <p className="font-semibold text-gray-800">
                                                {formatTimeTo12Hour(slot.startTime)} –{" "}
                                                {formatTimeTo12Hour(slot.endTime)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">🕐</span>
                                        <div>
                                            <p className="text-sm text-gray-500">Duration</p>
                                            <p className="font-semibold text-gray-800">
                                                {calculateDuration(
                                                    slot.startTime,
                                                    slot.endTime
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status & Button */}
                                    <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-bold ${slot.bookingStatus === "AVAILABLE"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {slot.bookingStatus === "AVAILABLE"
                                                ? "✅ Available"
                                                : "❌ Booked"}
                                        </span>

                                        <button onClick={() => submitSlot(slot)}
                                            disabled={slot.bookingStatus !== "AVAILABLE"}
                                            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg ${slot.bookingStatus === "AVAILABLE"
                                                ? "bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold hover:from-teal-500 hover:to-blue-600 active:scale-95"
                                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                        >
                                            {slot.bookingStatus === "AVAILABLE"
                                                ? "Book Now"
                                                : "Booked"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- Inline CSS for Animations --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lobster&family=Righteous&display=swap');
 
                /* Base Tilt Transition */
                .card-tilt {
                    perspective: 1000px;
                    transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    transform-origin: center center;
                }
 
                /* Mobile (Single Column) - Simple scale down */
                .card-tilt:active {
                    transform: scale(0.96);
                }
 
                /* Tablet (2 Columns) - md breakpoint (768px) to lg (1023px) */
                @media (min-width: 768px) and (max-width: 1023px) {
                    /* Left Column (Odd items) -> Tilt Left */
                    .card-tilt:nth-child(odd):active {
                        transform: scale(0.96) rotateZ(-3deg) rotateY(-10deg);
                    }
                    /* Right Column (Even items) -> Tilt Right */
                    .card-tilt:nth-child(even):active {
                        transform: scale(0.96) rotateZ(3deg) rotateY(10deg);
                    }
                }
 
                /* Desktop (3 Columns) - lg breakpoint (1024px+) */
                @media (min-width: 1024px) {
                    /* Left Column (1st, 4th, 7th...) -> Tilt Left */
                    .card-tilt:nth-child(3n+1):active {
                        transform: scale(0.96) rotateZ(-3deg) rotateY(-10deg);
                    }
                    /* Center Column (2nd, 5th, 8th...) -> Tilt Back Only */
                    .card-tilt:nth-child(3n+2):active {
                        transform: scale(0.96) rotateX(5deg);
                    }
                    /* Right Column (3rd, 6th, 9th...) -> Tilt Right */
                    .card-tilt:nth-child(3n):active {
                        transform: scale(0.96) rotateZ(3deg) rotateY(10deg);
                    }
                }
 
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 0.8s step-end infinite;
                }
 
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-3000 {
                    animation-delay: 3s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
 
                /* Flying Animation */
                @keyframes fly {
                    0% {
                        transform: translateY(0) rotate(0deg) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3; /* Fade in */
                    }
                    50% {
                        transform: translateY(-50vh) rotate(180deg) translateX(20px);
                    }
                    90% {
                        opacity: 0.3; /* Start fading out */
                    }
                    100% {
                        transform: translateY(-120vh) rotate(360deg) translateX(-20px);
                        opacity: 0;
                    }
                }
                .animate-fly {
                    animation-name: fly;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}

export default Slot;

