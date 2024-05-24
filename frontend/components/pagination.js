import React from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(i)} className={`page-number ${currentPage === i ? 'active' : ''}`}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
  return (
    <div className="pagination-container">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        <GrFormPrevious/>
      </button>
      {renderPageNumbers()}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <GrFormNext/>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
