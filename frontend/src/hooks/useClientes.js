import { useContext } from "react";
import { ClienteContext } from "../context/ClienteContext";

export const useClientes = () => {
  return useContext(ClienteContext);
};
