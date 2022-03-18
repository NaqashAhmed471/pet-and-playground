import React from "react";
import { Link } from "react-router-dom";

const PlaygroundsContent = ({ playground }) => {
  const { playgroundCategory, description, playgroundImage, categoryUrl } =
    playground;

  return (
    <div className="child-box">
      <Link to={categoryUrl}>
        <img src={playgroundImage} alt="" />
        <div className="child-overlay">
          <div className="child-info">
            <span>{playgroundCategory}</span>
            {playgroundCategory === "6-23 months" ? <p>{description}</p> : ""}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaygroundsContent;
