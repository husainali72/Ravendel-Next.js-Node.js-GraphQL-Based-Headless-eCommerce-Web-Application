import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SEARCH_PRODUCTS_QUERY } from "../queries/productquery";
import { queryWithoutToken } from "../utills/helpers";
import { get } from "lodash";
import OnSaleProductCard from "../components/category/onSaleProductCard";
import Pagination from "../components/pagination";

const SearchResult = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const { query } = router.query;
    if (query) {
      const variables = {
        searchTerm: query,
        page: currentPage,
        limit,
      };
      getSearchResult(variables);
    }
  }, [router.query, currentPage]);

  const getSearchResult = (variables) => {
    queryWithoutToken(SEARCH_PRODUCTS_QUERY, variables)
      .then((response) => {
        const searchedProducts = get(
          response,
          "data.searchProducts.products",
          []
        );
        const totalCount = get(response, "data.searchProducts.count", 0);
        setProducts(searchedProducts);
        const calculatedTotalPages = Math.ceil(totalCount / limit);
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <OnSaleProductCard onSaleProduct={products} hideTitle={true} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchResult;
