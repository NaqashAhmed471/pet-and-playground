import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";

const Banner = () => {
  const [banner, setBanner] = useState([]);

  // cleanBannerData
  const cleanUpBannerDate = useCallback((bannerRawData) => {
    const clearBannerData = bannerRawData.map((bannerData) => {
      const { sys, fields } = bannerData;
      const { id } = sys;
      const { spanTitle, headingTitle, paragraphTitle } = fields;
      const bannerBg = fields.bannerBg.fields.file.url;
      const bannerImage = fields.bannerImage.fields.file.url;
      return {
        id,
        spanTitle,
        headingTitle,
        paragraphTitle,
        bannerBg,
        bannerImage,
      };
    });
    setBanner(clearBannerData);
  }, []);

  // getBannerData from contentful
  const getBanner = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "petBanner",
      });
      const responseBannerData = response.items;
      if (responseBannerData) {
        cleanUpBannerDate(responseBannerData);
      } else {
        setBanner([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpBannerDate]);

  useEffect(() => {
    getBanner();
  }, [getBanner]);

  return banner.map((bannerContent) => {
    const {
      id,
      spanTitle,
      headingTitle,
      paragraphTitle,
      bannerBg,
      bannerImage,
    } = bannerContent;
    return (
      <div
        className="banner-wrap"
        key={id}
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        <div className="container">
          <div className="banner-content">
            <span>{spanTitle}</span>
            <h1>{headingTitle}</h1>
            <p>{paragraphTitle}</p>
            <div className="bright-childs-img">
              <img src={bannerImage} className="img-responsive" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default Banner;
