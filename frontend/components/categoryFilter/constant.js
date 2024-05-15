export const LIMIT = 10;
export const ARRAY = "array";
export const CHOICE = "choice";
export const RANGE = "range";

export const categorySortingOption = [
  { id: 1, title: "Newest First", field: "date", type: "" },
  {
    id: 2,
    title: "Price - Low to High",
    field: "pricing.sellprice",
    type: "asc",
  },
  {
    id: 3,
    title: "Price - High to Low",
    field: "pricing.sellprice",
    type: "desc",
  },
];
