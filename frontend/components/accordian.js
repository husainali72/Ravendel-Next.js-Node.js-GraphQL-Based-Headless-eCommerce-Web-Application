import React from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
const AccordionComponent = ({ title, body }) => {
  return (
    <Accordion defaultActiveKey={null} className="custom-accordion">
      <Accordion.Header className="accordian-header">{title}</Accordion.Header>
      <Accordion.Body className="accordian-body">{body}</Accordion.Body>
    </Accordion>
  );
};
AccordionComponent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
};
export default AccordionComponent;
