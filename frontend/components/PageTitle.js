import PropTypes from "prop-types";
const PageTitle = ({ title }) => {
  return (
    <div className="page-title">
      <h3 className="title-page">{title}</h3>
    </div>
  );
};
PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
export default PageTitle;
