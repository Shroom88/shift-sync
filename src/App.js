import Shifts from "./components/shifts/Shifts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { FirebaseProvider } from "./FirebaseContext";

function App() {
  return (
    <FirebaseProvider>
      <Header />
      <Shifts />
      <Footer />
    </FirebaseProvider>
  );
}

export default App;
