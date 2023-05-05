import LogIn from "./login/LogIn";
import { FirebaseProvider } from "./FirebaseContext";

function App() {
  return (
    <FirebaseProvider>
      <LogIn />
    </FirebaseProvider>
  );
}

export default App;
