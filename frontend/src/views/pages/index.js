import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Box } from "@material-ui/core";
import PageTitle from "../components/pageTitle";

const Pages = props => {
  const [pageName, setPageName] = useState(props.match.params.name);

  useEffect(() => {
    setPageName(props.match.params.name);
  }, [props.match.params.name]);

  return (
    <Fragment>
      <PageTitle title={pageName} />
      <Container>
        <Box
          component="div"
          display="flex"
          className="margin-top-3 margin-bottom-3"
        >
          Page Content
        </Box>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Pages);
