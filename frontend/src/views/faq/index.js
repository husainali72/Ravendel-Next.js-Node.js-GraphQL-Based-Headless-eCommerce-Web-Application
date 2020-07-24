import React, { Fragment } from "react";
import { connect } from "react-redux";
import PageTitle from "../components/pageTitle";
import {
  Container,
  Grid,
  Typography,
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Logo from "../../assets/images/logo.png";

const FAQ = (props) => {
  console.log("props.faqs.faqs", props.faqs.faqs);
  return (
    <Fragment>
      <PageTitle title="FAQ" />
      <Container>
        <Grid container className="margin-top-3 margin-bottom-3">
          <Grid item md={12} sm={12} xs={12}>
            <Box component="div" mt={5} mb={5}>
              {props.faqs.faqs && props.faqs.faqs.length
                ? props.faqs.faqs.map((faq) => (
                    <ExpansionPanel key={faq.id}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="faqs"
                        id={faq.id}
                      >
                        <Typography variant="h6">{faq.title}</Typography>
                      </ExpansionPanelSummary>

                      <ExpansionPanelDetails>
                        <Typography variant="body1">
                          {faq.description}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))
                : ""}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  faqs: state.faqs,
});

export default connect(mapStateToProps)(FAQ);
