"use client";

import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "@/src/lib/auth-client";
import { format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { CreateNewEvent } from "./action";
import { useState } from "react";

export default function CreateEventPage() {
    const { control, register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState<boolean>(false);

    //get user session
    const { data: session } = useSession();

    //Add new event
    const handleNewEvent = async (data: any) => {
        if (!session) {
            alert("Please login first");
        }

        setLoading(true);

        //Send the data and user to the action function
        const result = await CreateNewEvent(data, session?.user.id as string);

        if (result.success) {
            setLoading(false);
            reset();
        } else {
            alert(result.error);
        }
    };

    return (
        <main className="w-full px-2 sm:max-w-225 mx-auto">
            <header className="flex flex-col mb-10">
                <h1 className="text-2xl font-bold">Create Event</h1>
                <p className="text-gray-400 text-sm">
                    Create your new event and start inviting people!!
                </p>
            </header>
            <form onSubmit={handleSubmit(handleNewEvent)} className="space-y-5">
                <div className="flex flex-col gap-3">
                    <label htmlFor="title">Title</label>
                    <input
                        {...register("title", { required: true })}
                        className="custom-input-field text-sm"
                        placeholder="Title..."
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="location">Location</label>
                    <input
                        {...register("location", { required: true })}
                        className="custom-input-field text-sm"
                        placeholder="location..."
                        autoComplete="off"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="descriptions">Description</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="custom-input-field text-sm h-62.5! resize-none"
                        placeholder="Optional description..."
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="eventDate">Event Date</label>
                    <Controller
                        control={control}
                        name="eventDate"
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="custom-input-field w-full flex items-center gap-5">
                                        <Calendar1Icon size={18} />
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="bg-[#161616]"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date <
                                            new Date(
                                                new Date().setHours(0, 0, 0, 0),
                                            )
                                        }
                                        className="text-white"
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    ></Controller>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        type="submit"
                        className="p-1 bg-white text-black rounded-lg w-20 font-semibold text-sm"
                    >
                        Create
                    </button>
                    <button
                        type="button"
                        className="p-1 bg-gray-500 text-white rounded-lg w-20 font-semibold text-sm"
                    >
                        <Link href={"/dashboard"}>Cancel</Link>
                    </button>
                </div>
            </form>
        </main>
    );
}
