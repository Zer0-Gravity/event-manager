"use client";
import ErrorMassage from "@/src/component/utils/ErrorMessage";
import {
    PasswordToggleField,
    PasswordToggleFieldIcon,
    PasswordToggleFieldInput,
    PasswordToggleFieldToggle,
} from "@radix-ui/react-password-toggle-field";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRegister = async (e: any) => {
        e.preventDefault();
    };

    return (
        <main className="flex items-center justify-center w-full">
            <div className="w-full h-full sm:w-120 flex flex-col p-5 space-y-10">
                <header>
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-sm">Make new account for yourself</p>
                </header>

                <form
                    className="space-y-5"
                    onSubmit={handleSubmit(handleRegister)}
                >
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name">Name</label>
                        <input
                            {...register("name", { required: true })}
                            className={` custom-input-field ${errors.name && "input-error"}`}
                            placeholder="Name"
                        />
                        {errors.name && <ErrorMassage />}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name">Email</label>
                        <input
                            {...register("email", { required: true })}
                            className={` custom-input-field ${errors.email && "input-error"}`}
                            placeholder="Email"
                        />
                        {errors.email && <ErrorMassage />}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="name">Password</label>
                        <PasswordToggleField>
                            <div className="relative">
                                <PasswordToggleFieldInput
                                    className={` custom-input-field w-full pr-10! ${errors.password && "input-error"}`}
                                    {...register("password", {
                                        required: true,
                                    })}
                                    placeholder="Password"
                                />
                                <PasswordToggleFieldToggle className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <PasswordToggleFieldIcon
                                        visible={<EyeIcon size={18} />}
                                        hidden={<EyeOff size={18} />}
                                    />
                                </PasswordToggleFieldToggle>
                            </div>
                        </PasswordToggleField>
                        {errors.password && <ErrorMassage />}
                    </div>

                    <button
                        type="submit"
                        className="h-12 bg-[#222222] w-full rounded-lg"
                    >
                        Sign Up
                    </button>
                </form>

                <h1 className="text-sm text-center">
                    Already have an account?
                    <Link
                        href={"/auth/sign-in"}
                        className="text-blue-400 underline"
                    >
                        sign-in
                    </Link>
                </h1>
            </div>
        </main>
    );
}
