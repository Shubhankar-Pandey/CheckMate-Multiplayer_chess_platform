import axios from "axios";
import { signin_endpoint, signout_endpoint, signup_endpoint } from "./endpoints";
import type { SignupFormData } from "../screens/Signup";
import type { SigninFormData } from "../screens/Signin";
import toast from "react-hot-toast";




export const signupCall = async(data : SignupFormData) => {
    try{
        const payload = {
            username : data.username,
            firstName : data.firstName,
            password : data.password, 
            confirmPassword : data.confirmPassword,
        }
        const response = await axios.post(signup_endpoint, payload);
        if(response?.data){
            return response.data;
        }
        else{
            toast.error("Error in api call");
        }
    }
    catch(error){
        console.log(error);
    }
}


export const signinCall = async(data : SigninFormData) => {
    try{
        const payload = {
            username : data.username,
            password : data.password, 
        }
        const response = await axios.post(signin_endpoint, payload, {withCredentials: true});
        if(response?.data){
            return response.data;
        }
        else{
            toast.error("Error in api call");
        }
    }
    catch(error){
        console.log(error);
    }
}


export const signoutCall = async() => {
    try{
        const response = await axios.post(signout_endpoint, {}, {withCredentials : true});
        if(response?.data){
            return response.data;
        }
        else{
            toast.error("Error in api call");
        }
    }
    catch(error){
        console.log(error);
    }
}