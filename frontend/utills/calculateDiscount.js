const calculateDiscount = (price, sellPrice) => {
  let discount = "";
  if (sellPrice && sellPrice > 0) {
    if (sellPrice >= price) {
      discount = "";
    } else {
      let amount = ((100 / price) * (price - sellPrice)).toFixed(2);
      let roundedAmount = Math.round(amount);
  if(roundedAmount){
      discount = discount + roundedAmount + "% off";
    }
    }
  }
  return discount;
};
export default calculateDiscount;
