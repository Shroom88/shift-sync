import { useContext, useState } from "react";
import FirebaseContext from "../../FirebaseContext";
import Register from "../register/Register";
import Loader from "../loader/Loader";
import "./login.scss";

const LogIn = () => {
  const [register, setRegister] = useState(false);

  const {
    email,
    password,
    setEmail,
    setPassword,
    isLoading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useContext(FirebaseContext);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogInSwitch = () => {
    setRegister(false);
    clearInputs();
  };

  const handleRegSwitch = () => {
    setRegister(true);
    clearInputs();
  };

  return isLoading ? (
    <Loader />
  ) : register ? (
    <Register handleLogInSwitch={handleLogInSwitch} />
  ) : (
    <div className="login container">
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
        <button className="login__btn" type="submit">
          Login
        </button>
      </form>
      <button className="login__btn" onClick={() => handleRegSwitch()}>
        No account? Register here
      </button>
      <br />
      {error && <div className="login__error">{error}</div>}
    </div>
  );
};
export default LogIn;
