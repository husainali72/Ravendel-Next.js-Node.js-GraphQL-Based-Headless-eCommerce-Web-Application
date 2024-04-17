
export  const razorPay = async (key,orderId) => {
    const options = {
        key,
        order_id: orderId,
    };
    const razor = new window.Razorpay(options);
    razor.open();
}