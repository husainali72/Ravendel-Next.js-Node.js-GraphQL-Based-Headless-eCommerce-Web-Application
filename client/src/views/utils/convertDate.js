import { get } from 'lodash';
import moment from 'moment';

export const convertDateToStringFormat = (date, setting) => {
  const dateFormats = get(setting, 'date_formats', []);
  const selectedDateFormat = get(setting, 'settings.general.date_formats', '');
  const dateFormatObject = dateFormats.find((format) => format.id === selectedDateFormat);
  
  if (!dateFormatObject) {
   return moment(date).format('ll') 
  }
  const { value: formatString } = dateFormatObject;
  if (date) {
    return moment(date).format(formatString);
  } else {
    return date;
  }
};
