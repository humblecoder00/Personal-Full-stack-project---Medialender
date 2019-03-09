import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// _ underline is a common convention for lodash. Because it is optimized version of JS library underscore

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  // Get the page numbers into an array via props.
  // Then map them to the component for dynamic rendering.
  // [1,2,3].map()

  const pagesCount = Math.ceil(itemsCount / pageSize);
  //Math.ceil converts the number to integer, to the closest floating number.

  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); // This will return an array.
  // [1... pagesCount].map()
  // An array starting from 1 to the pagesCount number.

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
