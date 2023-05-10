import Shifts from "./components/shifts/Shifts";
import { FirebaseProvider } from "./FirebaseContext";

function App() {
  return (
    <FirebaseProvider>
      <Shifts />
    </FirebaseProvider>
  );
}

export default App;
