import { io } from "socket.io-client";

// Replace with your backend socket URL
const SOCKET_URL = "http://localhost:7000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Better performance
  reconnection: true,
  reconnectionAttempts: 5,
});
