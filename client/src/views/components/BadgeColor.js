export const badgeColor = (color) => {
    if (color === "pending") return "secondary"
    if (color === "success") return "success"
    if (color === "inprogress") return "warning"
    if (color === "failed") return "error"
    if (color === "shipped") return "warning"
    if (color === "cancelled") return "error"
    if (color === "delivered") return "success"
    if (color === "outfordelivery") return "info"

}