import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import Loader from "../loader/Loader";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // cleanBannerData
  const cleanUpBannerData = useCallback((bannerRawData) => {
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
    setIsLoading(true);
    try {
      const response = await client.getEntries({
        content_type: "petBanner",
      });
      const responseBannerData = response.items;
      if (responseBannerData) {
        cleanUpBannerData(responseBannerData);
      } else {
        setBanner([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loader />;
  }

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
