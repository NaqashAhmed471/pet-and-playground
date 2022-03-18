import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";

const NewLetter = () => {
  const [titles, setTitles] = useState("");
  const [img, setImg] = useState(null);

  //   getTitletData from Contentful
  const getTitles = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "petNewsletter",
      });
      const titleResponse = response.items;
      if (titleResponse) {
        setTitles(titleResponse[0].fields);
        setImg(titleResponse[0].fields.image.fields.file.url);
      } else {
        setTitles("");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTitles();
  }, [getTitles]);

  if (titles && img) {
    const { title, subTitle } = titles;
    return (
      <section className="newsletter-sec">
        <div className="container">
          <div className="newsletter-content">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h4>{title}</h4>
                <p>{subTitle}</p>
              </div>
              <div className="col-md-6">
                <div className="mail-sec">
                  <form>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="E-mail address"
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundImage: `url(${img})`,
                      }}
                    ></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else return "";
};

export default NewLetter;
