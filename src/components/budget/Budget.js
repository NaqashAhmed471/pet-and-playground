import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../client";
import BudgetContent from "./BudgetContent";

const Budget = () => {
  const [data, setData] = useState("");
  const [img, setImg] = useState(null);

  //    clean data
  const cleanUpBudgetData = useCallback((budgetResponseRawData) => {
    setData(budgetResponseRawData[0].fields);
    setImg(budgetResponseRawData[0].fields.image.fields.file.url);
  }, []);

  //   getBudgetData from Contentful
  const getBudgetData = useCallback(async () => {
    try {
      const response = await client.getEntries({
        content_type: "petBudget",
      });
      const budgetResponse = response.items;
      if (budgetResponse) {
        cleanUpBudgetData(budgetResponse);
      } else {
        setData("");
      }
    } catch (error) {
      console.log(error);
    }
  }, [cleanUpBudgetData]);

  useEffect(() => {
    getBudgetData();
  }, [getBudgetData]);

  if (data && img) {
    return (
      <section
        className="budget-sec"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="container">
          <div className="budget-content">
            <BudgetContent data={data} />
          </div>
        </div>
      </section>
    );
  } else return "";
};

export default Budget;
