export function formatExpirationDate(value) {
    const clearValue = clearNumber(value)

    if (clearValue?.length >= 3) {
        return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
    }

    return clearValue
}
function clearNumber(value = '') {
    return value.replace(/\D+/g, '')
}