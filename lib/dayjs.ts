import dayjs from "dayjs";
import en from "dayjs/locale/en";  
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale(en); 
dayjs.extend(localizedFormat);

export { dayjs };
