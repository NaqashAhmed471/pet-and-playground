import React from "react";

const ProductDetail = ({ productDetail }) => {
  const { id, productName, productPrice, productCategory, productImage } =
    productDetail;
  return (
    <div className="content">
      <section className="adventure-sec">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <div id="slider" className="flexslider sliderview">
                <ul className="slides" key={id}>
                  <li>
                    <img src={productImage} alt="" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="adventure-content">
                <h2>{productName}</h2>
                <span className="age">{productCategory}</span>
                <h3>$ {productPrice}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
