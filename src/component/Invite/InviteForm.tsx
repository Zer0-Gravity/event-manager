"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { submitRsvpInvite } from "../utils/submitRsvp";

export default function InviteForm({
    token,
    submitted,
}: {
    token: string;
    submitted: boolean | undefined;
}) {
    const { register, handleSubmit, control } = useForm();

    const registerAttendance = async (data: any) => {
        await submitRsvpInvite(token, data);
    };

    return (
        <main>
            {submitted && (
                <div className="border mb-5 border-[#222222] p-2 rounded-md text-sm text-gray-400">
                    <h1>Thank you your respond have been recorded!</h1>
                </div>
            )}

            {/* Form Section */}
            <form
                className="space-y-4 text-sm"
                onSubmit={handleSubmit(registerAttendance)}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        {...register("name", { required: true })}
                        placeholder="Name.."
                        className="custom-input-field w-full"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email", { required: true })}
                        placeholder="Email.."
                        className="custom-input-field w-full"
                    />
                </div>
                <Controller
                    control={control}
                    name="status"
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="status">Status</label>
                            <Select onValueChange={field.onChange}>
                                <SelectTrigger className="custom-input-field w-full focus:ring-0! focus:ring-offset-0! outline-none!">
                                    <SelectValue placeholder="Select your decision" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="going">
                                            Going
                                        </SelectItem>
                                        <SelectItem value="maybe">
                                            Maybe
                                        </SelectItem>
                                        <SelectItem value="not_going">
                                            Not Going
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                />
                <button
                    type="submit"
                    className="p-2 w-fit text-sm flex justify-end bg-white rounded-lg text-black"
                >
                    Submit Attendance
                </button>
            </form>
        </main>
    );
}
