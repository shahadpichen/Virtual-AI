import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChatProvider } from "./hooks/useChat.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChatProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChatProvider>
);
