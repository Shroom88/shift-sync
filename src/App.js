import Shifts from "./components/shifts/Shifts";
import Header from "./components/header/Header";
import { FirebaseProvider } from "./FirebaseContext";

function App() {
  return (
    <FirebaseProvider>
      <Header />
      <Shifts />
    </FirebaseProvider>
  );
}

export default App;
