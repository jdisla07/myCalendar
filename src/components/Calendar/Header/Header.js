import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import YearPicker from "../../DatePicker/YearPicker";
import { useDispatch, useSelector } from "react-redux";
import { nextMonth, previousMonth } from "../../../actions/";
import "./Header.css";

Header.propTypes = {
  setYear: PropTypes.func,
  setMonth: PropTypes.func,
};

function Header({ setYear, setMonth }) {
  const currentDate = useSelector((state) => state.dateReducer);
  const dispatch = useDispatch();
  const dateFormat = "MMMM yyyy";
  return (
    <div className="header row flex-middle">
      <div
        className="column col-start "
        style={{ justifyContent: "right", display: "flex", alignItems: "end" }}
      >
        <YearPicker
          label={"Months"}
          view={"month"}
          onDateChange={(value) => setMonth(value.month())}
        />
      </div>
      <div className="column vertical-center col-center">
        <NavigateBeforeIcon
          style={{ marginRight: "20px" }}
          onClick={() => dispatch(previousMonth())}
          className="icons"
        />
        <span>{format(currentDate, dateFormat)}</span>
        <NavigateNextIcon
          style={{ marginLeft: "20px" }}
          onClick={() => dispatch(nextMonth())}
          className="icons"
        />
      </div>
      <div className="column col-end">
        <YearPicker
          label={"Years"}
          view={"year"}
          onDateChange={(value) => setYear(value.year())}
        />
      </div>
    </div>
  );
}

export default Header;
