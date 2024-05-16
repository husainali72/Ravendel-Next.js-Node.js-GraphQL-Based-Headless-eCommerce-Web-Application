import React, { useEffect, useState } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import viewStyles from "../viewStyles";
import {
  isCouponAppliedAndNotFreeShipping,
  isPriceZero,
} from "./CurrencyFormat";
import { get } from "lodash";
import clsx from "clsx";
import Price from "../settings/components/priceWithCurrency";

const TotalSummaryComponent = ({
  totalSummary,
  currency,
  decimal,
  couponCard,
}) => {
  const [cartTotal, setCartTotal] = useState([]);
  useEffect(() => {
    getTotalSummaryData();
  }, [totalSummary]);

  const getTotalSummaryData = () => {
    const isFreeShipping = isPriceZero(get(totalSummary, "totalShipping"));
    const isFreeTax = isPriceZero(get(totalSummary, "totalTax"));
    const isCouponApplied =
      get(couponCard, "couponApplied") &&
      isCouponAppliedAndNotFreeShipping(couponCard);
    const couponDiscount = get(totalSummary, "couponDiscountTotal");
    const summaryItems = [
      { label: "Total MRP", value: totalSummary?.mrpTotal, type: "price" },
      {
        label: "Discount on MRP",
        value: totalSummary?.discountTotal,
        type: "price",
        name: "discount",
      },
      !isFreeTax && {
        label: "Total Tax",
        value: totalSummary?.totalTax,
        type: "price",
      },
      {
        label: "Total Shipping",
        value: isFreeShipping ? "Free Shipping" : totalSummary?.totalShipping,
        type: isFreeShipping ? "text" : "price",
      },
      isCouponApplied && {
        label: `Coupon -${get(couponCard, "appliedCouponCode")} `,
        value: couponDiscount,
        type: "price",
        name: "coupon",
      },
      {
        label: "Total amount",
        value: totalSummary?.grandTotal,
        type: "price",
        name: "grandTotal",
      },
    ];
    setCartTotal([...summaryItems]);
  };
  const classes = viewStyles();

  return (
    <div>
      {/* Map over the summaryItems array */}
      {cartTotal && cartTotal?.length > 0 ? (
        cartTotal?.map((item, index) => {
          if (item) {
            switch (get(item, "type")) {
              case "price":
                return (
                  <>
                    <Grid container justify="flex-end">
                      <Grid md={3} item className={classes.textRight}>
                        {item?.name === "grandTotal" && (
                          <Divider sx={{ mt: "10px", mb: "10px" }} />
                        )}
                        <Typography variant="body1" className={classes.mtb1}>
                          {item.label}:
                        </Typography>
                      </Grid>
                      <Grid item md={3} className={classes.textRight}>
                        {item?.name === "grandTotal" && (
                          <Divider sx={{ mt: "10px", mb: "10px" }} />
                        )}
                        <Typography
                          variant="body2"
                          className={clsx(
                            classes.mtb2,
                            item?.name === "coupon" ? "text-success" : null
                          )}
                        >
                          {item?.name === "discount" && "-"}{" "}
                          <Price price={get(item, "value", 0)} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                );
              case "text":
                return (
                  <>
                    <Grid container justify="flex-end">
                      <Grid md={3} item className={classes.textRight}>
                        <Typography variant="body1" className={classes.mtb1}>
                          {item?.label}:
                        </Typography>
                      </Grid>
                      <Grid item md={3} className={classes.textRight}>
                        <Typography
                          variant="body2"
                          className={clsx(classes.mtb2, "text-success")}
                        >
                          {item?.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                );
              default:
            }
          }
        })
      ) : (
        <p>No Cart total detail found</p>
      )}
    </div>
  );
};

export default TotalSummaryComponent;
