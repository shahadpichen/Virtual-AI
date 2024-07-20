"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [talk, setTalk] = useState(false);

  return (
    <ChatContext.Provider
      value={{ talk, setTalk, cameraZoomed, setCameraZoomed }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
