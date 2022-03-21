import React from "react";

const Pagination = ({ pageIndex, pagination }) => {
  return (
    <div className="product-pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageIndex <= 0 ? (
            <li className="page-item">
              <button
                disabled={true}
                className="page-link previous"
                aria-label="Previous"
                onClick={(e) => pagination(e)}
              >
                <span className="sr-only">Previous</span>
              </button>
            </li>
          ) : (
            <li className="page-item">
              <button
                className="page-link previous"
                aria-label="Previous"
                onClick={(e) => pagination(e)}
              >
                <span className="sr-only">Previous</span>
              </button>
            </li>
          )}
          <li className="page-item">
            <button className="page-link" onClick={(e) => pagination(e)}>
              1
            </button>
          </li>
          <li className="page-item ">
            <button className="page-link" onClick={(e) => pagination(e)}>
              2
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={(e) => pagination(e)}>
              3
            </button>
          </li>
          <li className="page-item">
            <button className="page-link" onClick={(e) => pagination(e)}>
              4
            </button>
          </li>
          {pageIndex > 2 ? (
            <li className="page-item">
              <button
                disabled={true}
                className="page-link next"
                aria-label="Next"
                onClick={(e) => pagination(e)}
              >
                <span className="sr-only">Next</span>
              </button>
            </li>
          ) : (
            <li className="page-item">
              <button
                className="page-link next"
                aria-label="Next"
                onClick={(e) => pagination(e)}
              >
                <span className="sr-only">Next</span>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
