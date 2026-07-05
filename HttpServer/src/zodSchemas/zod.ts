import z from "zod"



export const signupBody = z.object({
    username : z.string(),
    password : z.string(),
    confirmPassword : z.string(),
    firstName : z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


export const signinBody = z.object({
    username : z.string(),
    password : z.string(),
})