
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

const App = () => {
  return (
    <Routes>
     <Route path="/" element={<ProductList />} />
     <Route path="/products/:id" element={<ProductDetails />} /> 
    </Routes>
  )
}

export default App
