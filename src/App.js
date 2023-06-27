import Shifts from "./components/shifts/Shifts";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import FirebaseContext from "./FirebaseContext";

function App() {
  const { isLoading } = useContext(FirebaseContext);
  return (
    <>
      <Header />
      <Shifts />
      {!isLoading && <Footer />}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
