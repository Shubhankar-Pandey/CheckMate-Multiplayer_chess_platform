import express from "express";
import { signin, signout, signup } from "../controller/auth.js";
import { me } from "../controller/user.js";
import { auth } from "../middleware/auth.js";
export const route = express.Router();
// auth Routes
route.post("/signup", signup);
route.post("/signin", signin);
route.post("/signout", signout);
// user routes
route.get("/me", auth, me);
//# sourceMappingURL=route.js.map