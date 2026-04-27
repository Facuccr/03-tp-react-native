export const clienteReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLIENTES":
      return action.payload;

    case "ADD_CLIENTE":
      return [...state, action.payload];

    case "UPDATE_CLIENTE":
      return state.map((c) =>
        c.id === action.payload.id ? action.payload : c,
      );

    case "DELETE_CLIENTE":
      return state.filter((c) => c.id !== action.payload);

    default:
      return state;
  }
};
