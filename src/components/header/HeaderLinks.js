import React from "react";
import { Link } from "react-router-dom";

const HeaderLinks = ({ links }) => {
  const { id, title, titleUrl } = links;
  return (
    <li className="nav-item" key={id}>
      <Link className="nav-link" to={titleUrl}>
        {title}
      </Link>
    </li>
  );
};

export default HeaderLinks;
