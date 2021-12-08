import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedin: false,
  loginHandler: (token) => {},
  logoutHandler: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = React.useState(initialToken);
  const userisLoggedin = !!token;
  const loginHandler = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
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
