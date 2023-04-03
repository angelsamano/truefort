import React, { useContext, useRef } from "react";
import MockedAuthenticatedUser from './MockedAuthenticatedUser';

const Context = React.createContext();
const ContextProvider = ({ children }) => {
  const User = useRef(MockedAuthenticatedUser);

  return (
    <Context.Provider value={User.current}>
      {children}
    </Context.Provider>
  );
};

export const useCustomHook = () => useContext(Context);
export default ContextProvider;
