import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";

const SocketContext = createContext();

export const SocketProvider = ({ children, userId }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (userId) {
      socket.emit("joinStudent", userId);
    }

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
