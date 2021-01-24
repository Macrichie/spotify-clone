import React, { createContext, useContext, useReducer } from "react";

//1. Create the context
export const CreateContext = createContext();

//2. Provide the context with values
export const ContextProvider = ({ reducer, initialState, children }) => (
  <CreateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CreateContext.Provider>
);

// 3. Get access to the context or data-layer of the app
export const useContextValue = () => useContext(CreateContext);
