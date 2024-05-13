import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <>
      <p className="pagination-paginationMeta">
        Page {currentPage + 1} of {totalPages}
      </p>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        activeClassName={"active"}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
      />
    </>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
