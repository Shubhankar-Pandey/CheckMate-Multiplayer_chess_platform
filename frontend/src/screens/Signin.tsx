import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";

import AuthLayout from "../components/authComponents/authLayout";
import AuthInput from "../components/authComponents/authInput";
import PasswordInput from "../components/authComponents/passwordInput"
import AuthButton from "../components/authComponents/authButton";
import { signinCall } from "../apiCalls/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Slices/userSlice";


export interface SigninFormData {
    username: string;
    password: string;
}

export default function Signin() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormData>();



    const handleSignin = async (data: SigninFormData) => {

        if (loading) return;

        setLoading(true);

        try {
            const response = await signinCall(data);
            if(response?.success){
                toast.success(response.message);
                dispatch(setUser(response.user));
                navigate("/");
            }
            else{
                toast.error("Signin failed");
            }
        }
        catch (error) {
            toast.error( error instanceof Error ? error.message : "Something went wrong.");
        } 
        finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue playing."
        >
            <form
                noValidate
                onSubmit={handleSubmit(handleSignin)}
                className="space-y-6"
            >
                <AuthInput
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                    autoComplete="username"
                    {...register("username", {
                        required: "Username is required",
                    })}
                    error={errors.username?.message}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                    error={errors.password?.message}
                />

                <AuthButton
                    text="Sign In"
                    loading={loading}
                    loadingText="Signing In..."
                />

                <div className="text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-green-500 transition hover:text-green-400"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}