"use client";

import styles from "./auth.module.css";
import {createClient} from "@/lib/supabase/client";
import loginSchema, {LoginFormInput} from "@/features/auth/login.schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";

export default function LoginForm() {
    const supabase = createClient();
    const router = useRouter();

    const [passwordToggle, setPasswordToggle] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting}
    } = useForm<LoginFormInput>({
        resolver: zodResolver(loginSchema)
    });

    const submitHandler = async (formData: LoginFormInput) => {
        const {error} = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            setError("root", {message: "Nesprávny e-mail alebo heslo"});
            return;
        }

        router.push("/articles");
        router.refresh();
    }

    const togglePasswordVisibility = () => {
        setPasswordToggle(!passwordToggle);
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className={styles.inputField}>
                <label>
                    Email
                </label>
                <input
                    type={"text"}
                    placeholder={"Email"}
                    {...register("email")}
                />
                <div/>
            </div>

            <div className={styles.inputField}>
                <label>
                    Heslo
                </label>
                <input
                    type={passwordToggle ? "password" : "text"}
                    placeholder={"Password"}
                    {...register("password")}
                />

                <div className={styles.passwordEye}
                     onClick={togglePasswordVisibility}>
                    {passwordToggle ? <IoMdEye/> : <IoMdEyeOff/>}
                </div>
            </div>

            <p className={styles.error}>
                {errors.root?.message}
            </p>

            <button
                type={"submit"}
                className={styles.loginBtn}
                disabled={isSubmitting}
            >
                Prihlásiť sa
            </button>
        </form>
    );
}