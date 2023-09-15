import React from "react";
import {
  Typography,
  Box,
} from "@mui/material";

/* ==================Component for Tabpanel===================== */

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

/* ==================Component for Tabpanel===================== */

export const a11yProps = (index) => {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
};

/* ==================Component for Tabpanel===================== */

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const getSelectedName = (id, element, products, categories) => {
  if (element === "includeProducts" || element === "excludeProducts") {
    for (let i in products) {
      if (id === products[i]._id) {
        return products[i].name;
      }
    }
  } else {
    for (let i in categories) {
      if (id === categories[i].id) {
        return categories[i].name;
      }
    }
  }
};


export const couponObj = {
  code: "",
  description: "",
  discountType: "amount-discount",
  // discountValue: "0",
  discountValue: 0,
  freeShipping: false,
  expire: "",
  // minimumSpend: "0",
  // maximumSpend: "0",
  minimumSpend: 0,
  maximumSpend: 0,
  products: [],

  includeProducts: [],

  excludeProducts: [],
  categories: [],
  includeCategories: [],
  excludeCategories: [],

};
