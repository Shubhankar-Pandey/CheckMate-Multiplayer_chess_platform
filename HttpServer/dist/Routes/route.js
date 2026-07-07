import express from "express";
import { signin, signout, signup } from "../controller/auth.js";
export const route = express.Router();
// auth Routes
route.post("/signup", signup);
route.post("/signin", signin);
route.post("/signout", signout);
//# sourceMappingURL=route.js.map