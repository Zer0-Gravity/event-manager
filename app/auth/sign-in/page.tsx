"use client";

import ErrorMassage from "@/src/component/utils/ErrorMessage";
import {
    PasswordToggleField,
    PasswordToggleFieldIcon,
    PasswordToggleFieldInput,
    PasswordToggleFieldToggle,
} from "@radix-ui/react-password-toggle-field";
import { Eye, EyeClosed, EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = async () => {};
    return (
        <main className="flex items-center justify-center w-full">
            <div className="w-full h-full sm:w-120 flex flex-col p-5 space-y-10">
                <header>
                    <h1 className="text-3xl font-bold">Sign In</h1>
                    <p className="text-sm">Welcome back</p>
                </header>
                <form
                    className=" space-y-5"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-sm">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            className={`custom-input-field ${errors.email && "input-error"}`}
                            placeholder="Email"
                        />
                        {errors.email && <ErrorMassage />}
                    </div>

                    <div className="flex flex-col gap-3">
                        <label htmlFor="password" className="text-sm">
                            Password
                        </label>
                        <PasswordToggleField>
                            <div className="relative">
                                <PasswordToggleFieldInput
                                    {...register("password", {
                                        required: true,
                                    })}
                                    className={`custom-input-field w-full pr-10! ${errors.password && "input-error"}`}
                                    placeholder="Password"
                                />
                                <PasswordToggleFieldToggle className="absolute bottom-1/2 translate-y-1/2 right-4">
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
                        className="p-2 w-full rounded-lg bg-[#222222] h-12"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-[#636363] text-xs text-center">OR</p>

                <button className="bg-[#222222] rounded-lg h-12">Google</button>

                <h1 className="text-sm text-center">
                    Don&apos;t have account?
                    <Link
                        href={"/auth/sign-up"}
                        className="text-blue-400 underline"
                    >
                        sign-up
                    </Link>
                </h1>
            </div>
        </main>
    );
}
