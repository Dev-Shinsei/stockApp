import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add/product" element={<AddProduct />} />
        <Route path="/edit/product/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
