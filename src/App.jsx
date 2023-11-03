import "./App.css";
import Home from "./pages/Home/Home";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Home />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "toast",
        }}
      />
    </>
  );
}

export default App;
