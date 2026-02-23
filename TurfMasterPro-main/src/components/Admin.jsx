import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { format, isAfter } from "date-fns";
import axios from "axios";

const API_URL = "http://localhost:8080/slots";
const API_URL2 = "http://localhost:8080/confirmations"

const Admin = () => {
    const [slots, setSlots] = useState([]);
    const [confirmation, setConfirmation] = useState([]);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const res = await axios.get(API_URL);
            setSlots(res.data);
        } catch (error) {
            console.error("Failed to fetch slots", error);
        }
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/confirmations")
            .then((response) => {
                setConfirmation(response.data);
            })
            .catch((error) => {
                console.error("Error fetching confirmations:", error);
            });
    }, []);


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const startTime = watch("startTime");



    const onSubmit = async (data) => {
        const payload = {
            bookingDate: data.date,
            gameType: data.game,
            price: data.price,
            startTime: data.startTime,
            endTime: data.endTime,
            bookingStatus: "AVAILABLE"
        };



        try {
            const response = await axios.post(
                "http://localhost:8080/slot",
                payload
            );
            if (response.data) {
                alert("Slot Successfully added");

            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }

        setSlots((prev) => [...prev, payload]);
        reset();
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this slot?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/slot/${id}`);

            // remove from UI after successful delete
            setSlots((prevSlots) =>
                prevSlots.filter((slot) => slot.slotId !== id)
            );

            alert("Slot deleted successfully");
        } catch (error) {
            console.error("Error deleting slot:", error);
            alert("Failed to delete slot");
        }
    };

    const formatTime12h = (time) => {
        if (!time) return "";
        const [hour, minute] = time.split(":");
        const date = new Date();
        date.setHours(hour, minute);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-200 p-4 pt-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* ================= FORM ================= */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold text-center mb-4">
                        Create Time Slot
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                {...register("date", { required: "Date is required" })}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm">{errors.date.message}</p>
                            )}
                        </div>

                        {/* Game */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Game</label>
                            <select
                                {...register("game", { required: "Game is required" })}
                                className="w-full border rounded-md px-3 py-2"
                            >
                                <option value="">Select a game</option>
                                <option value="Football">Football</option>
                                <option value="8 Ball">8 Ball</option>
                                <option value="Badminton">Badminton</option>
                            </select>
                            {errors.game && (
                                <p className="text-red-500 text-sm">{errors.game.message}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Price (৳)
                            </label>
                            <input
                                type="number"
                                {...register("price", {
                                    required: "Price is required",
                                    min: { value: 1, message: "Price must be greater than 0" },
                                })}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm">
                                    {errors.price.message}
                                </p>
                            )}
                        </div>

                        {/* Start Time */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Start Time
                            </label>
                            <input
                                type="time"
                                {...register("startTime", {
                                    required: "Start time is required",
                                })}
                                className="w-full border rounded-md px-3 py-2"
                            />
                            {errors.startTime && (
                                <p className="text-red-500 text-sm">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </div>

                        {/* End Time */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                End Time
                            </label>
                            <input
                                type="time"
                                disabled={!startTime}
                                {...register("endTime", {
                                    required: "End time is required",
                                    validate: (value) => {
                                        if (!startTime) return true;
                                        return (
                                            isAfter(
                                                new Date(`1970-01-01T${value}`),
                                                new Date(`1970-01-01T${startTime}`)
                                            ) || "End time must be after start time"
                                        );
                                    },
                                })}
                                className="w-full border rounded-md px-3 py-2 disabled:bg-gray-100"
                            />
                            {errors.endTime && (
                                <p className="text-red-500 text-sm">
                                    {errors.endTime.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Save Time Slot
                        </button>
                    </form>
                </div>

                {/* ================= TABLE ================= */}
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Time Slot List
                    </h2>

                    {slots.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No time slots added yet
                        </p>
                    ) : (
                        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">Date</th>
                                    <th className="px-4 py-3 text-left">Game</th>
                                    <th className="px-4 py-3 text-left">Time</th>
                                    <th className="px-4 py-3 text-left">Price</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                    <th className="px-4 py-3 text-center">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {slots.map((slot, index) => (
                                    <tr
                                        key={slot.id}
                                        className={`border-t ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            } hover:bg-blue-50 transition`}
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-700 text-sm">
                                            {slot.bookingDate}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium text-white
                                                    ${slot.gameType === "Football"
                                                        ? "bg-green-500"
                                                        : slot.gameType === "8 Ball"
                                                            ? "bg-purple-500"
                                                            : "bg-orange-500"
                                                    }`}
                                            >
                                                {slot.gameType}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-gray-700 text-sm">
                                            {formatTime12h(slot.startTime)} –{" "}
                                            {formatTime12h(slot.endTime)}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 font-semibold">
                                                ৳{slot.price}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 font-medium text-gray-700 text-sm">
                                            {slot.bookingStatus}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleDelete(slot.slotId)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-6">
                <h1 className="text-3xl font-bold text-gray-800 text-center underline decoration-indigo-400">Confirmation List</h1>
                <div className="overflow-x-auto p-4">
                    <table className="min-w-full border border-gray-200 rounded-xl shadow-sm">
                        <thead className="bg-gradient-to-r from-emerald-500 to-blue-400">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Mobile
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Game
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                    Time
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {confirmation.map((item, index) => (
                                <tr
                                    key={item.confirmationId}
                                    className={`transition hover:bg-indigo-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        }`}
                                >
                                    <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                        #{item.confirmationId}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-800">
                                        {item.customerName}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {item.mobileNumber}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            {item.gameType}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {item.bookingDate}
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {formatTime12h(item.startTime)} –{" "}
                                        {formatTime12h(item.endTime)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;


