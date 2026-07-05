import express from "express";
import { signin, signup } from "../controller/auth.js";
export const route = express.Router();
// auth Routes
route.post("/signup", signup);
route.post("/signin", signin);
//# sourceMappingURL=route.js.map