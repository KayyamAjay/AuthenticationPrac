import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authctx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authctx.isLoggedin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authctx.isLoggedin && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authctx.isLoggedin && (
            <li>
              <button onClick={authctx.logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
