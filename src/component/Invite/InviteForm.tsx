"use client";

import { useForm } from "react-hook-form";

export default function InviteForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const registerAttendance = (data) => {};
    return (
        <main>
            <form onSubmit={handleSubmit(registerAttendance)}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">name</label>
                    <input
                        {...register("name", { required: true })}
                        placeholder="Name.."
                        className="custom-input-field w-full"
                    />
                </div>
            </form>
        </main>
    );
}
