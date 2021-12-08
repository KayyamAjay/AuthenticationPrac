import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedin: false,
  loginHandler: (token) => {},
  logoutHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = React.useState("");
  const userisLoggedin = !!token;
  const loginHandler = (token) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };
  const AuthValue = {
    token: token,
    isLoggedin: userisLoggedin,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={AuthValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
