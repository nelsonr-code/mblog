import React from "react";
import { useState } from "react";
import moment from "moment";
import { DateRangePicker as LibDateRangePicker } from "react-date-range";

export const DateRangePicker = (props) => {
  const [state, setState] = useState([
    props.defaultRange
  ]);

  const updateRange = item => {
    setState([item.selection]);
    props.onChange(item.selection);
  };

  return (
    <LibDateRangePicker
      onChange={ updateRange }
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      ranges={state}
      showPreview={false}
      dateInput={false}
      editableDateInputs={false}
      
    />
  );
};
