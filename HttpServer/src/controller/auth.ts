import type { Request, Response } from "express"
import { signupBody, signinBody } from "../zodSchemas/zod.js";
import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



export const signup = async(req : Request , res : Response) => {
    try{
        const result = signupBody.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                success : false, 
                message : "Bad request",
            })
        }

        const { username, password, firstName } = result.data;
        const existUser = await prisma.user.findUnique({
            where : {
                username
            }
        })
        
        if(existUser){
            return res.status(400).json({
                success : false,
                message : "This username already exist",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data : {
                username, 
                password : hashedPassword, 
                firstName
            }
        })

        return res.status(200).json({
            success : true,
            message : "User created successfully",
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false, 
            message : "Internal server error",
        })
    }
}




export const signin = async(req : Request, res : Response) => {
    try{    
        const result = signinBody.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                success : false, 
                message : "Bad request",
            })
        }

        const { username, password } = result.data;
        const existUser = await prisma.user.findUnique({
            where : {
                username
            }
        })

        if(!existUser){
            return res.status(400).json({
                success : false, 
                message : "Incorrect credentails",
            })
        }

        if(!(await bcrypt.compare(password, existUser.password))){
            return res.status(400).json({
                success : false, 
                message : "Incorrect credential",
            }) 
        }

        const payload = {
            userId : existUser.id,
            username : existUser.username,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn : "2h"});

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" as const,   // 'as const' needed so TS infers the literal type, not string
            maxAge: 2 * 60 * 60 * 1000,
        };
        return res.cookie("token", token, cookieOptions).status(200).json({
            success : true, 
            message : "Signin successfully",
            user : {
                firstName : existUser.firstName,
                username : existUser.username
            }
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false, 
            message : "Internal server error",
        })
    }
}



export const signout = async(req : Request, res : Response) => {
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" as const, 
        })

        res.status(200).json({
            success : true, 
            message : "Signout successfully",
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success : false, 
            message : "Internal server error",
        }) 
    }
}