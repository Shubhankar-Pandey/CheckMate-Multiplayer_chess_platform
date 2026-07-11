import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
const PORT = Number(process.env.PORT);
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
}
export const connectedUsers = new Map();
function parseCookies(cookieHeader) {
    console.log("into parse cookie");
    const cookies = {};
    if (!cookieHeader)
        return cookies;
    cookieHeader.split(";").forEach(pair => {
        const [key, ...rest] = pair.trim().split("=");
        if (!key) {
            return;
        }
        cookies[key] = decodeURIComponent(rest.join("="));
    });
    return cookies;
}
const wss = new WebSocketServer({
    port: PORT,
    verifyClient: (info, callback) => {
        const cookies = parseCookies(info.req.headers.cookie);
        console.log("cookies = ", cookies);
        const token = cookies["token"]; // swap "token" for your actual cookie name
        if (!token) {
            callback(false, 401, "Unauthorized: no token");
            return;
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (connectedUsers.has(decoded.userId)) {
                callback(false, 409, "Already connected elsewhere");
                return;
            }
            // stash it here so the "connection" handler below can read it
            info.req.userId = decoded.userId;
            callback(true);
        }
        catch (err) {
            callback(false, 401, "Unauthorized: invalid or expired token");
        }
    }
});
const gameManager = new GameManager();
wss.on("connection", (socket) => {
    console.log(socket);
    socket.on("close", () => {
        // gameManager.removeUser(socket);
    });
});
//# sourceMappingURL=index.js.map