import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";

const SingleProduct = () => {
  const [productDetail, setproductDetail] = useState({});
  const { id } = useParams();

  //   cleanProductData
  const cleanUpSingleProductData = useCallback((singleProductRawData) => {
    const { sys, fields } = singleProductRawData;
    const { id } = sys;
    const { productName, productPrice, productCategory, productSpace } = fields;
    const productImage = fields.productImage.fields.file.url;
    setproductDetail({
      id,
      productName,
      productPrice,
      productCategory,
      productSpace,
      productImage,
    });
  }, []);

  //   getSingleProductData from contentful
  const getSingleProduct = useCallback(async () => {
    try {
      const response = await client.getEntry(id);
      if (response) {
        cleanUpSingleProductData(response);
      } else {
        setproductDetail({});
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpSingleProductData, id]);

  useEffect(() => {
    getSingleProduct();
  }, [getSingleProduct]);

  return <ProductDetail productDetail={productDetail} />;
};

export default SingleProduct;
