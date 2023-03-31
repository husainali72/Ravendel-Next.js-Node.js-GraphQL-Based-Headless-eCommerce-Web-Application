const calculateDiscount = (price , sellPrice)=>{
    let discount = ""
    if(sellPrice && sellPrice>0){
        if(sellPrice >= price){
            discount = ""
        }
        else{
            // let amount = Math.round(
                let amount = ((100 /price)*(price - sellPrice)).toFixed(2);
            // )
            discount = discount + amount + "% off"
        }
    }
    return discount
    
}
export default calculateDiscount;

