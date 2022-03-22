import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import { Link } from "react-router-dom";

const ProductBanner = () => {
  const [banner, setBanner] = useState("");
  const [img, setImg] = useState(null);

  //   getBannerData from Contentful
  const getBannerData = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "petProductBanner",
      });
      const bannerResponse = response.items;
      if (bannerResponse) {
        setBanner(bannerResponse[0].fields);
        setImg(bannerResponse[0].fields.image.fields.file.url);
      } else {
        setBanner("");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBannerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (banner && img) {
    const { title, btnText, btnLink } = banner;
    return (
      <div className="product-banner">
        <div className="container">
          <div
            className="product-banner-bg"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="product-itle">
              <h3>{title}</h3>
              <Link to={btnLink} className="btn btn-danger">
                {btnText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else return "";
};

export default ProductBanner;
