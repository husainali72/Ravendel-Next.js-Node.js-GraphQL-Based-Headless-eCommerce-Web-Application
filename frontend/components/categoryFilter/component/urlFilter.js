import { get } from "lodash";
import { ARRAY, CHOICE, RANGE } from "../constant";

export const applyFiltersFromUrl = (filters, router) => {
  const { query } = router;
  return filters.map((filter) => {
    if (filter.type === ARRAY) {
      const selectedValues = query[filter.heading]?.split(",") || [];
      const updatedData = filter.data.map((item) => ({
        ...item,
        select: selectedValues.includes(item.value.toString()),
      }));
      if (selectedValues?.length > 0) {
        return { ...filter, data: updatedData };
      }
    } else if (filter.type === RANGE) {
      const minPrice = query[`${filter.heading}_min`];
      const maxPrice = query[`${filter.heading}_max`];
      let filterMinPrice = get(filter, "select.minPrice", 0);
      let filterMaxPrice = get(filter, "select.maxPrice", 0);
      let select = {};
      if (minPrice || filterMinPrice) {
        select.minPrice = minPrice ? Number(minPrice) : filterMinPrice;
      }
      if (maxPrice || filterMaxPrice) {
        select.maxPrice = maxPrice ? Number(maxPrice) : filterMaxPrice;
      }

      return {
        ...filter,
        select,
      };
    } else if (filter.type === CHOICE) {
      const minValue = query[filter.heading];
      let filterMinValue = get(filter, "select.maxPrice", "");
      const updatedData = filter.data.map((item) => ({
        ...item,
        select: item.value.toString() === minValue,
      }));
      if (minValue || filterMinValue) {
        return {
          ...filter,
          select: { minValue: minValue ? Number(minValue) : filterMinValue },
          data: updatedData,
        };
      }
    }
    return filter;
  });
};
export const updateUrl = (filters, router) => {
  const { category } = router.query;
  const searchParams = new URLSearchParams();
  filters.forEach((filter) => {
    if (filter.type === ARRAY) {
      const selectedValues = filter.data
        .filter((item) => item.select)
        .map((item) => item.value);
      if (selectedValues.length > 0) {
        searchParams.set(filter.heading, selectedValues.join(","));
      } else {
        searchParams.delete(filter.heading);
      }
    } else if (filter.type === RANGE) {
      const minPrice = get(filter, "select.minPrice");
      const maxPrice = get(filter, "select.maxPrice");
      if (minPrice !== undefined && minPrice !== null && minPrice !== 0) {
        searchParams.set(`${filter.heading}_min`, minPrice);
      } else {
        searchParams.delete(`${filter.heading}_min`);
      }
      if (maxPrice !== undefined && maxPrice !== null && maxPrice !== 0) {
        searchParams.set(`${filter.heading}_max`, maxPrice);
      } else {
        searchParams.delete(`${filter.heading}_max`);
      }
    } else if (filter.type === CHOICE) {
      const minValue = get(filter, "select.minValue");
      if (minValue) {
        searchParams.set(filter.heading, minValue);
      } else {
        searchParams.delete(filter.heading);
      }
    }
  });
  window.history.pushState({}, "", `/collection/${category}?${searchParams.toString()}`);
  // router.push(
  //   {
  //     pathname: `/collection/${category}`,
  //     query: searchParams.toString(),
  //   },
  //   undefined,
  //   { shallow: true }
  // );
};

export const clearAllFilter = (router) => {
  const { category } = router.query;

  // Clear query parameters related to filters
  const searchParams = new URLSearchParams();
  searchParams.set("category", category);
  router.push(
    { pathname: "/collection/[category]", query: searchParams.toString() },
    undefined,
    {
      shallow: true,
    }
  );
};
