import Header from "./components/header/Header";
import Home from "./pages/homepage/Home";
import AllProducts from "./pages/productspage/AllProducts";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CategorySmall from "./pages/categoriespage/Category6_23";
import CategoryMedium from "./pages/categoriespage/Category2_5";
import CategoryLarge from "./pages/categoriespage/Category5_12";
import SingleProduct from "./pages/productdetails/SingleProduct";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/6-23-months" element={<CategorySmall />} />
        <Route path="/2-5-year-old" element={<CategoryMedium />} />
        <Route path="/5-12-year-old" element={<CategoryLarge />} />
        <Route path="/product-detail/:id" element={<SingleProduct />} />
      </Routes>
    </div>
  );
}

export default App;
