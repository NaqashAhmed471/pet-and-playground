import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import Products from "../products/Products";

const DiscoverProducts = () => {
  const [titles, setTitles] = useState("");
  const [products, setProucts] = useState([]);

  //   getTitletData from Contentful
  const getTitles = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "petDiscoverProducts",
      });
      const titleResponse = response.items;
      if (titleResponse) {
        setTitles(titleResponse[0].fields);
      } else {
        setTitles("");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //   Cleanup Products data

  const cleanUpProductsResponse = useCallback((productsRawData) => {
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

    setProucts(cleanData);
  }, []);

  //   getProducts from Contentful
  const getProducts = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "petProducts",
        limit: 5,
      });
      const productsResponse = response.items;
      if (productsResponse) {
        cleanUpProductsResponse(productsResponse);
      } else {
        setProucts([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpProductsResponse]);

  useEffect(() => {
    getTitles();
    getProducts();
  }, [getTitles, getProducts]);

  if (titles && products) {
    const { title, subTitle } = titles;
    return (
      <section className="product-sec">
        <div className="container-fluid">
          <div className="product-title">
            <h4>{title}</h4>
            <p>{subTitle}</p>
          </div>
          <div className="product-boxes">
            {products.slice(0, 5).map((product) => (
              <Products key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  } else return "";
};

export default DiscoverProducts;
