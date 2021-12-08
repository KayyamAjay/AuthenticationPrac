import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useContext, useRef } from "react";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const newPassword = newPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAP7NuBpJkALleoAbUF_zWdIMjoefvLhtI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          retunSecureToken: false,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
