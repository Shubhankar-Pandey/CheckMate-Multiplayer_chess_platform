import { WebSocketServer } from "ws"
import { GameManager } from "./GameManager.js";
import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"


declare module "http" {
    interface IncomingMessage {
        userId?: number;
        username?: string;
    }
}


const PORT = Number(process.env.PORT);
const JWT_SECRET = process.env.JWT_SECRET;
if(!PORT){
    throw new Error("PORT is missing");
}
if(!JWT_SECRET){
    throw new Error("JWT_SECRET is missing");
}

interface myJwtPayload extends jwt.JwtPayload {
    userId : number,
    username : string
}

const gameManager = new GameManager();


function parseCookies(cookieHeader: string | undefined): Record<string, string> {
    const cookies: Record<string, string> = {};

    if (!cookieHeader) return cookies;
    
    cookieHeader.split(";").forEach(pair => {
        const [key, ...rest] = pair.trim().split("=");
        if(!key){
            return;
        }
        cookies[key] = decodeURIComponent(rest.join("="));
    });
    
    return cookies;
}

const wss = new WebSocketServer({
    port : PORT, 
    verifyClient : (info, callback) => {
        const cookies = parseCookies(info.req.headers.cookie);
        const token = cookies["token"]; // swap "token" for your actual cookie name

        if (!token) {
            callback(false, 401, "Unauthorized: no token");
            return;
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as myJwtPayload;
            if(!decoded.username){
                callback(false, 401, "Unauthorized: invalid or expired token");
            }
            if (gameManager.connectedUsers.has(decoded.username)) {
                callback(false, 409, "Already connected elsewhere");
                return;
            }

            // stash it here so the "connection" handler below can read it
            (info.req as any).username = decoded.username;
            callback(true);
        } 
        catch (err) {
            callback(false, 401, "Unauthorized: invalid or expired token");
        }
    }
});




wss.on("connection", (socket, request) => {
    const username = request.username;      // typed as string | undefined, no cast
    console.log("username = ", username);
    if (!username) {
        socket.close(1008, "Missing user context");
        return;
    }

    // successfull connection
    gameManager.addUser(socket, username);

    socket.on("close", () => {
        gameManager.connectedUsers.delete(username);
        console.log("user with username = ", username, " is removed")
    });
})