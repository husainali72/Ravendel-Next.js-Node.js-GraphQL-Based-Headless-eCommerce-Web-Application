export const badgeColor = (color) => {
    if (color === "pending") return "info"
    if (color === "success") return "success"
    if (color === "inprogress") return "warning"
    if (color === "failed") return "error"
    if (color === "cancelled") return "error"

}