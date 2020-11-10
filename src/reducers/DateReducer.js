import { setMonth, setYear, addMonths, subMonths } from "date-fns";

const DateReducer = (state = new Date(), action) => {
  switch (action.type) {
    case "SET_MONTH":
      return setMonth(state, action.payload);
    case "SET_YEAR":
      return setYear(state, action.payload);
    case "NET_MONTH":
      return addMonths(state, 1);
    case "PREVIOUS_MONTH":
      return subMonths(state, 1);
    default:
      return state;
  }
};

export default DateReducer;
