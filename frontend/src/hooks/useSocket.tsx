import { useEffect, useState } from "react"

const WS_URL = "ws://localhost:8080";

export const useSocket = () => {
    const [socket, setSocket] = useState<null | WebSocket>(null);

    useEffect(() => {
        try{
            const ws = new WebSocket(WS_URL);

            ws.onopen = () => {
                setSocket(ws);
            }

            ws.onclose = () => {
                setSocket(null)
            }

            return () => {
                ws.close();
            }
        }
        catch(error){
            return;
        }
    }, [])

    return socket;
}