import React from "react";
import { Link } from "react-router-dom";

const HeaderLogo = ({ item }) => {
  const { logoUrl, logo } = item;
  return (
    <div className="logo">
      <Link to={`${logoUrl}`}>
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default HeaderLogo;
