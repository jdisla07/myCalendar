import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import "../../../App.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Button from "@material-ui/core/Button";

Header.propTypes = {
  prevMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  prevYear: PropTypes.func.isRequired,
  nextYear: PropTypes.func.isRequired,
  currentDate: PropTypes.object.isRequired,
};

function Header({ prevMonth, prevYear, currentDate, nextMonth, nextYear }) {
  const dateFormat = "MMMM yyyy";
  return (
    <div className="header row flex-middle">
      <div className="column col-start">
        <Button
          onClick={prevYear}
          style={{ marginLeft: "15px" }}
          variant="contained"
          color="primary"
        >
          <NavigateBeforeIcon />
          Year
        </Button>
        <Button
          style={{ marginLeft: "5px" }}
          onClick={prevMonth}
          variant="contained"
          color="primary"
        >
          <NavigateBeforeIcon />
          Month
        </Button>
      </div>
      <div style={{ textAlign: "center" }} className="column col-center">
        <span>{format(currentDate, dateFormat)}</span>
      </div>
      <div
        style={{ justifyContent: "right", display: "flex", alignItems: "end" }}
        className="column col-end"
      >
        <Button
          style={{ marginRight: "5px" }}
          onClick={nextMonth}
          variant="contained"
          color="primary"
        >
          <NavigateNextIcon />
          Month
        </Button>
        <Button
          onClick={nextYear}
          style={{ marginRight: "15px" }}
          variant="contained"
          color="primary"
        >
          <NavigateNextIcon />
          Year
        </Button>
      </div>
    </div>
  );
}

export default Header;
