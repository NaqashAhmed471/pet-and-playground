import React from "react";
import ProductBanner from "../../components/ProductBanner/ProductBanner";
import Products from "../productspage/Products";

const Category2_5 = () => {
  return (
    <>
      <ProductBanner />
      <Products isFilterCategory2_5 />
    </>
  );
};

export default Category2_5;
