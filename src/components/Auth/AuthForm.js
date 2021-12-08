import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const authctx = useContext(AuthContext);

  const enteredEmail = useRef();
  const enteredPassword = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const Email = enteredEmail.current.value;
    const Password = enteredPassword.current.value;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAP7NuBpJkALleoAbUF_zWdIMjoefvLhtI";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAP7NuBpJkALleoAbUF_zWdIMjoefvLhtI";
    }
    const fetchHandler = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: Email,
          password: Password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      try {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error.message);
        }
        const data = await response.json();
        authctx.login(data.idToken);
      } catch (error) {
        alert(error);
      }
    };
    fetchHandler();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={enteredEmail} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={enteredPassword} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
