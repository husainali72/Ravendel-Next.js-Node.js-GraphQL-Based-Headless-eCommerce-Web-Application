import { capitalize } from "lodash";
import React from "react";
import { Badge } from "react-bootstrap";
import PropTypes from "prop-types";
const CustomBadge = ({ badgeContent, badgeColor }) => {
  const getBadgeVariant = (color) => {
    switch (color) {
      case "pending":
        return "secondary";
      case "success":
        return "success";
      case "inprogress":
        return "warning";
      case "failed":
        return "danger";
      case "shipped":
        return "primary";
      case "cancelled":
        return "danger";
      case "delivered":
        return "success";
      case "outfordelivery":
        return "info";
      case "processing":
        return "warning";
      default:
        return "primary";
    }
  };
  const getBadgeContentLabel = (label) => {
    switch (label) {
      case "inprogress":
        return "in Progress";
      case "outfordelivery":
        return "out for delivery";
      default:
        return label;
    }
  };
  return (
    <Badge pill bg={getBadgeVariant(badgeColor)}>
      {capitalize(getBadgeContentLabel(badgeContent || ""))}
    </Badge>
  );
};
CustomBadge.propTypes = {
  badgeContent: PropTypes.string,
  badgeColor: PropTypes.string,
};
export default CustomBadge;
