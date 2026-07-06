"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Controller, useForm } from "react-hook-form";

export default function InviteForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm();

    const registerAttendance = (data) => {};
    return (
        <main>
            <form
                onSubmit={handleSubmit(registerAttendance)}
                className="space-y-4 text-sm"
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
