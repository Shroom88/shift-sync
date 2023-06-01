import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import Register from "../register/Register";
import Loader from "../loader/Loader";
import "./login.scss";

const LogIn = () => {
  const {
    error,
    email,
    password,
    register,
    setRegister,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    clearStates,
  } = useContext(FirebaseContext);

  const handleLogInSwitch = () => {
    clearStates();
  };

  const handleRegSwitch = () => {
    clearStates();
    setRegister(true);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <h1 className="heading">
        Welcome to <span className="heading--projectname">ShiftSync</span>
      </h1>
      {register ? (
        <Register handleLogInSwitch={handleLogInSwitch} />
      ) : (
        <div className="login">
          <h2 className="login__header">Login</h2>
          <form className="login__form" onSubmit={handleLogin}>
            <input
              className="login__input"
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
            />

            <input
              className="login__input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
            />

            {error && <span className="login__error">{error}</span>}

            <button
              disabled={error !== ""}
              className="login__btn"
              type="submit"
            >
              Login
            </button>
          </form>
          <button className="login__btn" onClick={handleRegSwitch}>
            No account? Register here
          </button>
          <br />
        </div>
      )}
    </div>
  );
};
export default LogIn;
