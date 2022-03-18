import React from "react";
import { Link } from "react-router-dom";

const ProductsContent = ({ product }) => {
  const { id, productName, productPrice, productImage } = product;
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="product-box">
        <Link to={`/product-detail/${id}`}>
          <img src={productImage} alt="" />
          <h5>{productName}</h5>
          <span>$ {productPrice}</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductsContent;
