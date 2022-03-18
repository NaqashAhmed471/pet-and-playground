import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import PlaygroundsContent from "./PlaygroundsContent";

const Playgrounds = () => {
  const [playgrounds, setPlaygrounds] = useState([]);

  const cleanUpPlaygroundData = useCallback((playgroundRawData) => {
    const cleanPlaygroundData = playgroundRawData.map((playgroundData) => {
      const { sys, fields } = playgroundData;
      const { id } = sys;
      const { title, playgroundCategory, description , categoryUrl } = fields;
      const playgroundImage = fields.playgroundImage.fields.file.url;

      return {
        id,
        title,
        playgroundCategory,
        description,
        categoryUrl,
        playgroundImage,
      };
    });
    setPlaygrounds(cleanPlaygroundData);
  }, []);

  // getPlaygroundData from contentful
  const getPlayground = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "petPlaygrounds",
      });
      const playGroundResponse = response.items;
      if (playGroundResponse) {
        cleanUpPlaygroundData(playGroundResponse);
      } else {
        setPlaygrounds([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpPlaygroundData]);

  useEffect(() => {
    getPlayground();
  }, [getPlayground]);

  return (
    <section className="playground-sec">
      <div className="container">
        {playgrounds.slice(0, 1).map((playground) => {
          const { title } = playground;
          return (
            <div className="play-title" key={playground.title}>
              <h2>{title}</h2>
            </div>
          );
        })}
        <div className="row no-gutters">
          <div className="col-md-8">
            {playgrounds
              .slice(0)
              .reverse()
              .slice(2,3)
              .map((playground) => {
                const { id } = playground;
                return <PlaygroundsContent key={id} playground={playground} />;
              })}
          </div>
          <div className="col-md-4">
            {playgrounds
              .slice(1,3)
              .map((playground) => {
                const { id } = playground;
                return <PlaygroundsContent key={id} playground={playground} />;
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playgrounds;
