import Shifts from "./components/shifts/Shifts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { FirebaseProvider } from "./FirebaseContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <FirebaseProvider>
      <Header />
      <Shifts />
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </FirebaseProvider>
  );
}

export default App;
