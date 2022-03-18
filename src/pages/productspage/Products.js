import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import ProductsContent from "./ProductsContent";

const Products = ({
  isFilterCategory6_23,
  isFilterCategory2_5,
  isFilterCategory5_12,
}) => {
  const [products, setProducts] = useState([]);

  //   Cleanup Products data

  const cleanUpProductsResponse = useCallback(
    (productsRawData) => {
      const cleanData = productsRawData.map((productsData) => {
        const { sys, fields } = productsData;
        const { id } = sys;
        const { productName, productPrice, productCategory, productSpace } =
          fields;
        const productImage = fields.productImage.fields.file.url;

        return {
          id,
          productName,
          productPrice,
          productCategory,
          productSpace,
          productImage,
        };
      });

      if (isFilterCategory6_23) {
        const filterCategory6_23 = cleanData.filter(
          (data) => data.productCategory === "6-23 months"
        );
        setProducts(filterCategory6_23);
      } else if (isFilterCategory2_5) {
        const filterCategory2_5 = cleanData.filter(
          (data) => data.productCategory === "2-5 year olds"
        );
        setProducts(filterCategory2_5);
      } else if (isFilterCategory5_12) {
        const filterCategory5_12 = cleanData.filter(
          (data) => data.productCategory === "5-12 year olds"
        );
        setProducts(filterCategory5_12);
      } else {
        setProducts(cleanData);
      }
    },
    [isFilterCategory6_23, isFilterCategory2_5, isFilterCategory5_12]
  );

  //   getProducts from Contentful
  const getProducts = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "petProducts",
      });
      const productsResponse = response.items;
      if (productsResponse) {
        cleanUpProductsResponse(productsResponse);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpProductsResponse]);

  const check = (e) => {
    e.preventDefault();
    if (e.detail === 0) {
      if (e.target.value === "Price Low-to-High") {
        const sortedProducts = products.sort(
          (a, b) => a.productPrice - b.productPrice
        );
        setProducts([...sortedProducts]);
      } else {
        const sortedProducts = products.sort(
          (a, b) => b.productPrice - a.productPrice
        );

        setProducts([...sortedProducts]);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className="content">
      <section className="age-product-sec">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              {isFilterCategory6_23 ||
              isFilterCategory2_5 ||
              isFilterCategory5_12 ? (
                products.slice(0, 1).map((product) => (
                  <div className="age-title" key={product.id}>
                    <h3>{product.productCategory}</h3>
                  </div>
                ))
              ) : (
                <div className="age-title">
                  <h3>All Products</h3>
                </div>
              )}
            </div>
            <div className="col-sm-6">
              <div className="sort-drop">
                <p>Sort by:</p>
                <form>
                  <select type="select" onClick={(e) => check(e)}>
                    <option value="Price Low-to-High">Price Low-to-High</option>
                    <option value="Price High-to-Low">Price High-to-Low</option>
                  </select>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            {products.map((product) => {
              return <ProductsContent key={product.id} product={product} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;

// else if (e.detail === -1) {
//   console.log("high");
//   const sortedProducts = products.sort(
//     (a, b) => b.productPrice - a.productPrice
//   );
//   console.log(sortedProducts);
//   setProducts([...sortedProducts]);
// }
