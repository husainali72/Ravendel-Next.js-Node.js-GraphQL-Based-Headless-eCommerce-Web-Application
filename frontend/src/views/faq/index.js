import React, { Fragment } from "react";
import {useSelector} from 'react-redux';
import PageTitle from "../components/pageTitle";
import {
  Container,
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const FAQ = () => {
  const faqs = useSelector(state => state.faqs);

  return (
    <Fragment>
      <PageTitle title="FAQ" />
      <Container>
        <Grid container className="margin-top-3 margin-bottom-3">
          <Grid item md={12} sm={12} xs={12}>
            <Box component="div" mt={5} mb={5}>
              {faqs.faqs && faqs.faqs.length
                ? faqs.faqs.map((faq) => (
                    <Accordion key={faq.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="faqs"
                        id={faq.id}
                      >
                        <Typography variant="h6">{faq.title}</Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <Typography variant="body1">
                          {faq.description}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))
                : ""}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default FAQ;
