import { get } from "lodash";
import moment from "moment";

export const convertDateToStringFormat = (date, setting) => {
  const selectedDateFormat = get(setting, "settings.general.date_format", "");
  let convertedDate = "";
  if (date) {
    switch (selectedDateFormat) {
      case "1":
        convertedDate = moment(date).format("MMMM D, YYYY");
        break;
      case "2":
        convertedDate = moment(date).format("YYYY-MM-DD");
        break;
      case "3":
        convertedDate = moment(date).format("MM/DD/YYYY");
        break;
      case "4":
        convertedDate = moment(date).format("DD/MM/YYYY");
        break;
      default:
        convertedDate = moment(date).format("ll");
        break;
    }
  } else {
    convertedDate = date;
  }

  return convertedDate;
};
