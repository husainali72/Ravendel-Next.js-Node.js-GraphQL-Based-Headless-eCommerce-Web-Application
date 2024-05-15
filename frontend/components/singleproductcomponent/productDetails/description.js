import PropTypes from "prop-types";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

const Description = ({ description }) => {
  const transform = (node, index) => {
    if (
      (node.type === "tag" && node.name === "h1") ||
      node.name === "h2" ||
      node.name === "h3"
    ) {
      node.name = "p";
      return convertNodeToElement(node, index, transform);
    }
    if (node.type === "tag" && node.name === "a") {
      node.name = "p";
      return convertNodeToElement(node, index, transform);
    }
    if (node.type === "tag" && node.name === "strong") {
      node.name = "span";
      return convertNodeToElement(node, index, transform);
    }
  };
  const options = {
    decodeEntities: true,
    transform,
  };
  return (
    <>
      <div className="product-details">
        <h5>Product Details</h5>
        {description && ReactHtmlParser(description, options)}
      </div>
    </>
  );
};
Description.propTypes = {
  description: PropTypes.string,
};
export default Description;
