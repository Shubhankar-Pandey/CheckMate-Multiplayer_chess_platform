import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { route } from "./Routes/route.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", route);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
});
//# sourceMappingURL=index.js.map