export const moveToMonth = (month) => {
  return {
    type: "SET_MONTH",
    payload: month,
  };
};

export const moveToYear = (year) => {
  return {
    type: "SET_YEAR",
    payload: year,
  };
};

export const nextMonth = () => {
  return {
    type: "NET_MONTH",
  };
};
export const previousMonth = () => {
  return {
    type: "PREVIOUS_MONTH",
  };
};
