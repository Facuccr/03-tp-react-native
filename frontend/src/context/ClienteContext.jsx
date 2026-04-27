import { createContext, useReducer } from "react";
import { clienteReducer } from "./clienteReducer";

export const ClienteContext = createContext();

export const ClienteProvider = ({ children }) => {
  const [clientes, dispatch] = useReducer(clienteReducer, []);

  return (
    <ClienteContext.Provider value={{ clientes, dispatch }}>
      {children}
    </ClienteContext.Provider>
  );
};
