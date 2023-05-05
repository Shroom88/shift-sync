import { useContext } from "react";
import FirebaseContext from "../FirebaseContext";

const LogIn = () => {
  const {
    // data,
    email,
    password,
    error,
    user,
    handleEmailChange,
    handlePasswordChange,
    // handleLogin,
    handleRegister,
    handleLogout,
  } = useContext(FirebaseContext);

  return user ? (
    <div>
      <h2>Hello, {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
      {error && <div>{error}</div>}
    </div>
  ) : (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleRegister}>
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
      <br />
      {error && <div>{error}</div>}
    </div>
  );
};
export default LogIn;
