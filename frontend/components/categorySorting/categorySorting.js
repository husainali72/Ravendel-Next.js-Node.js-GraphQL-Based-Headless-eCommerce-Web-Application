import { categorySortingOption } from "../categoryFilter/constant";
import ReactTabs from "../tabs";
import PropTypes from "prop-types";
const CategorySorting = ({ handleSorting,activeSorting }) => {
  const handleChange = (e) => {
    const { field, type } = e;
    let sortedPayload = { field, type };
    handleSorting(sortedPayload);
  };
  return (
    <>
      <div className="sorting-container">
        <span className="sorting-title">Sort by </span>
        <ReactTabs options={categorySortingOption} onChange={handleChange} activeSorting={activeSorting} />
      </div>
    </>
  );
};
CategorySorting.propTypes = {
  filterProductData: PropTypes.array.isRequired,
  activeSorting: PropTypes.object.isRequired,
  handleSorting: PropTypes.func.isRequired,
};

export default CategorySorting;
