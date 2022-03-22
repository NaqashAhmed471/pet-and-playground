import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Loader from "../../components/loader/Loader";

const SingleProduct = () => {
  const [productDetail, setproductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await client.getEntry(id);
      if (response) {
        cleanUpSingleProductData(response);
      } else {
        setproductDetail({});
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <ProductDetail productDetail={productDetail} />;
};

export default SingleProduct;
