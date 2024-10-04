import { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
function App() {
  const { data } = useContext(AppContext);
  return (
    <>
      <ShowProduct />
    </>
  );
}

export default App;
