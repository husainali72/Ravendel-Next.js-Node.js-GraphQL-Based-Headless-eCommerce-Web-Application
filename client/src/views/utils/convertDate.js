import moment from 'moment';

export const convertDateToStringFormat = date => {
  var convertedDate = ""
  if(date){
    convertedDate = moment(date).format('ll')
  }else{
    convertedDate = date;
  }
  return convertedDate;
};

