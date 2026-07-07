import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cookieParser from "cookie-parser"
import { route } from "./Routes/route.js";
import cors from "cors"



declare global {
  namespace Express {
    interface Request {
      user?: number;
    }
  }
}


const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", route)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started at Port ${PORT}`);
})