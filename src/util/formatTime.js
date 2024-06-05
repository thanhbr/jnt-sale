import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy HH:mm');
}


export function fDateTimeCustom(date, otp={}) {
  return format(new Date(date), otp?.format ? otp.format : 'dd/MM/yyyy');
}

export function fDateTimeApi(date) {
  return format(new Date(date), 'yyyy/MM/dd HH:mm');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function ftoDate(date = 0) {
  switch(date)
  {
    case 1: {date="CN"; break;}
    case 2: {date="T2"; break;}
    case 3: {date="T3"; break;}
    case 4: {date="T4"; break;}
    case 5: {date="T5"; break;}
    case 6: {date="T6"; break;}
    case 7: {date="T7"; break;}
    default: date = 0; break;
  }
  return date
}
