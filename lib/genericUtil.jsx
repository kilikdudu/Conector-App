import { compareAsc, format } from 'date-fns'

export default class GenericUtil {
    static dateFormat = (value, strFormat) => {
        return format(value, strFormat);
    }
    static dateToServiceFormat = (value) => {
        return format(value, 'yyyy-MM-ddThh:mm:ssX')
    }
    static dateIsAfterAsTheSecond = (firstDate, secondDate) => {
        return compareAsc(firstDate, secondDate) == 1;
    }
    static brazilDateStringToDate = (value) => {
        if(!value || value.length != 10)
            return null;
        return new Date(value.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    }
}