import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import HeaderLogo from "./HeaderLogo";
import HeaderLinks from "./HeaderLinks";

const Header = () => {
  const [logo, setLogo] = useState([]);
  const [headerLink, setHeaderLink] = useState([]);
  // cleanLogoData
  const cleanUpLogoData = useCallback((rawData) => {
    const cleanLogo = rawData.map((logoData) => {
      const { sys, fields } = logoData;
      const { id } = sys;
      const logoUrl = fields.imageUrl;
      const logo = fields.image.fields.file.url;
      return { id, logoUrl, logo };
    });
    setLogo(cleanLogo);
  }, []);

  // getLogo from contentful
  const getLogo = useCallback(async () => {
    try {
      const response = await client.getEntries({ content_type: "petLogo" });
      const responseData = response.items;
      if (responseData) {
        cleanUpLogoData(responseData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpLogoData]);

  //   cleanHeaderLinksData
  const cleanUpHeaderLinksData = useCallback((headerLinksRawData) => {
    const cleanHeaderLinksData = headerLinksRawData.map((headerLinkdata) => {
      const { sys, fields } = headerLinkdata;
      const { id } = sys;
      const { title, titleUrl } = fields;
      return { id, title, titleUrl };
    });
    setHeaderLink(cleanHeaderLinksData);
  }, []);

  // getHeaderLinks from Contentful
  const getHeaderLinks = useCallback(async () => {
    try {
      const responseLinks = await client.getEntries({
        content_type: "petNavbarLinks",
      });
      const responseLinksData = responseLinks.items;
      if (responseLinksData) {
        cleanUpHeaderLinksData(responseLinksData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpHeaderLinksData]);

  useEffect(() => {
    getLogo();
    getHeaderLinks();
  }, [getLogo, getHeaderLinks]);

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-3 align-items-center">
            {logo?.map((item) => (
              <HeaderLogo key={item.id} item={item} />
            ))}
          </div>
          <div className="col-md-9">
            <div className="nav-wrap">
              <nav className="navbar navbar-expand-lg navbar-light">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon">
                    <div className="click-menu-btn">
                      <span className="bar1"></span>
                      <span className="bar2"></span>
                      <span className="bar3"></span>
                    </div>
                  </span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto">
                    {headerLink
                      .slice(0)
                      .reverse()
                      .map((links) => (
                        <HeaderLinks key={links.id} links={links} />
                      ))}
                  </ul>
                </div>
              </nav>
              <a href="/" className="btn btn-danger">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
