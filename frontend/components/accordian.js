import React from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
import { capitalize } from "lodash";
const AccordionComponent = ({ title, body }) => {
  return (
    <Accordion defaultActiveKey="0" className="custom-accordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="accordian-header">{capitalize(title)}</Accordion.Header>
        <Accordion.Body className="accordian-body">{body}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
AccordionComponent.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.element.isRequired,
};
export default AccordionComponent;
