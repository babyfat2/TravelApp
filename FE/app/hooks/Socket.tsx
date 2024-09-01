import { useState, useEffect, useRef, useMemo } from "react";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../redux/hooks/hooks";

const useSocket = (): Socket | null => {
  // Adjusted return type to include null
  const token = useAppSelector((state) => state.user.token);
  const socketRef = useRef<Socket | null>(null); // Explicitly allow null here

  useMemo(() => {
    if (token) {
      const newSocket = io(process.env.EXPO_PUBLIC_API_URL as string, {
        autoConnect: true,
        auth: {
          token,
        },
      });
      socketRef.current = newSocket; // This should not cause an error
    } else {
      socketRef.current = null; // Explicitly setting to null when there's no token
    }
  }, [token]);

  return socketRef.current;
};

export default useSocket;
