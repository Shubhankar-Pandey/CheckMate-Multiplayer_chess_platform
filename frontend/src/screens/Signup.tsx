import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import AuthLayout from "../components/authComponents/authLayout";
import AuthInput from "../components/authComponents/authInput";
import PasswordInput from "../components/authComponents/passwordInput";
import AuthButton from "../components/authComponents/authButton";
import { signupCall } from "../apiCalls/auth";


export interface SignupFormData {
    username: string;
    firstName: string;
    password: string;
    confirmPassword: string;
}



export default function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>();

    const password = watch("password");

    const handleSignup = async (data: SignupFormData) => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await signupCall(data);
            if(response?.success){
                console.log("response.data = ", response);
                toast.success(response.message);
                navigate("/");
            }
            else{
                toast.error("Signup failed");
            }
        } 
        catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong."
            );
        } 
        finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join ChekMate and start playing."
        >
            <form
                noValidate
                onSubmit={handleSubmit(handleSignup)}
                className="space-y-6"
            >
                <AuthInput
                    label="Username"
                    type="text"
                    autoComplete="username"
                    placeholder="Choose a username"
                    {...register("username", {
                        required: "Username is required",
                    })}
                    error={errors.username?.message}
                />

                <AuthInput
                    label="First Name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Enter your first name"
                    {...register("firstName", {
                        required: "First name is required",
                    })}
                    error={errors.firstName?.message}
                />

                <PasswordInput
                    label="Password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    error={errors.password?.message}
                />

                <PasswordInput
                    label="Confirm Password"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                            value === password ||
                            "Passwords do not match",
                    })}
                    error={errors.confirmPassword?.message}
                />

                <AuthButton
                    text="Create Account"
                    loading={loading}
                    loadingText="Creating Account..."
                />

                <div className="text-center text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/signin"
                        className="font-semibold text-green-500 hover:text-green-400 transition"
                    >
                        Sign In
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}