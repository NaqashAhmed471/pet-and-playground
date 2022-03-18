import React from "react";
import { Link } from "react-router-dom";

const Products = ({ product }) => {
  const { id, productName, productPrice, productImage } = product;
  return (
    <div className="product-box">
      <Link to={`/product-detail/${id}`}>
        <img src={productImage} alt="" />
        <h5>{productName}</h5>
        <span>$ {productPrice}</span>
      </Link>
    </div>
  );
};

export default Products;
