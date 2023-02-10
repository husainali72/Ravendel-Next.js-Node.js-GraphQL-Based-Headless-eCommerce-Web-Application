export const badgeColor = (color) => {
    if (color === "pending") return "secondary"
    if (color === "success") return "success"
    if (color === "inprogress") return "warning"
    if (color === "failed") return "failed"
    if (color === "shipped") return "warning"
    if (color === "cancelled") return "error"
    if (color === "delivered") return "delivered"
    if (color === "outfordelivery") return " outfordelivery"

}