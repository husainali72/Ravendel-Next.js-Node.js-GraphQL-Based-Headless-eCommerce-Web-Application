import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SEARCH_PRODUCTS_QUERY } from "../queries/productquery";
import { mutation } from "../utills/helpers";
import { get } from "lodash";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import ReactPaginate from "react-paginate";

const SearchResult = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    const { query } = router.query;
    if (query) {
      let variables = {
        searchTerm: query,
        page: currentPage + 1, // Increment currentPage by 1 to match 1-based indexing
        limit,
      };
      getSearchResult(variables);
    }
  }, [router.query, currentPage]);

  const getSearchResult = (variables) => {
    mutation(SEARCH_PRODUCTS_QUERY, variables)
      .then((response) => {
        const searchedProducts = get(response, "data.searchProducts", []);
        const totalCount = get(response, "data.totalCount", 0);
        setProducts({ searchedProducts, totalCount });
        setTotalPages(Math.ceil(totalCount / limit));
      })
      .catch(async (error) => {
        console.log(error, "error");
      });
  };

  return (
    <div>
      <OnSaleProductCard
        onSaleProduct={products.searchedProducts}
        hideTitle={true}
      />

      <div className="results-showMoreContainer">
        <div className="pagination-container">
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
            pageLinkClassName={"page-link"}
            previousLinkClassName={"pagination-prev-link"}
            nextLinkClassName={"pagination-prev-link"}
            previousClassName={"pagination-prev"}
            nextClassName={"pagination-next"}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
