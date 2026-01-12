import { io } from "socket.io-client";

export const socket = io("https://filezy.onrender.com", {
    transports: ["polling", "websocket"],
    timeout: 20000,
    reconnectionAttempts: 5,
});
