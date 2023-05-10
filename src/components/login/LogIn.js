import { useContext, useState } from "react";
import FirebaseContext from "../../FirebaseContext";
import Register from "../register/Register";

const LogIn = () => {
  const [register, setRegister] = useState(false);

  const {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useContext(FirebaseContext);

  const handleLogInSwitch = () => {
    setRegister(false);
  };

  const handleRegSwitch = () => {
    setRegister(true);
  };

  return register ? (
    <Register handleLogInSwitch={handleLogInSwitch} />
  ) : (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <button type="" onClick={() => handleRegSwitch()}>
        No account? Register here
      </button>
      <br />
      {error && <div>{error}</div>}
    </div>
  );
};
export default LogIn;
