import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyPoundOutlinedIcon from '@mui/icons-material/CurrencyPoundOutlined';
export function currencyFormat(num) {
  if (num !== undefined)
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
export const currencySetter = (currency, fontSize) => {
  if (currency === "usd") return <AttachMoneyOutlinedIcon sx={{ fontSize: fontSize }} />
  if (currency === "eur") return <EuroIcon sx={{ fontSize: fontSize }} />
  if (currency === "gbp") return <CurrencyPoundOutlinedIcon sx={{ fontSize: fontSize, }} />
  if (currency === "cad") return <AttachMoneyOutlinedIcon sx={{ fontSize: fontSize }} />
}
export const getPrice = (price, decimal) => {
  if (typeof price === 'string')
    return parseInt(price)?.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  else
    return price?.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

}