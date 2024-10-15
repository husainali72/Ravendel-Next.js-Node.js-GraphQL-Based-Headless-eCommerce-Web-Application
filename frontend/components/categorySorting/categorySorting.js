import { useRouter } from "next/router";
import { categorySortingOption } from "../categoryFilter/constant";
import ReactTabs from "../tabs";
import PropTypes from "prop-types";
import { updateSortingUrl } from "../categoryFilter/component/urlFilter";
const CategorySorting = ({ handleSorting,activeSorting, sortingState }) => {
  const router=useRouter()
  const [, setSelectedSorting] = sortingState;

  const handleChange = (e) => {
    const { field, type } = e;
    let sortedPayload = { field, type };
    handleSorting(sortedPayload);
    updateSortingUrl(sortedPayload, router);
    setSelectedSorting(e.id.toString())
  };
  return (
    <>
      <div className="sorting-container">
        <span className="sorting-title">Sort by </span>
        <ReactTabs options={categorySortingOption} onChange={handleChange} active={activeSorting} />
      </div>
    </>
  );
};
CategorySorting.propTypes = {
  filterProductData: PropTypes.array.isRequired,
  activeSorting: PropTypes.object.isRequired,
  handleSorting: PropTypes.func.isRequired,
  sortingState: PropTypes.any.isRequired
};

export default CategorySorting;
