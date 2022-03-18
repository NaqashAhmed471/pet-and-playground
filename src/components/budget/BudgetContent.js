import React from "react";
import { Link } from "react-router-dom";

const BudgetContent = ({ data }) => {
  const { title, description, btnText, btnUrl } = data;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to={btnUrl} className="btn btn-danger">
        {btnText}
      </Link>
    </>
  );
};

export default BudgetContent;
