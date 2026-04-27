import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClienteProvider } from "./context/ClienteContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClienteProvider>
      <App />
    </ClienteProvider>
  </StrictMode>,
);
