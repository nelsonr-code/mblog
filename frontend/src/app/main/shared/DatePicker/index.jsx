import React from "react";
import { DateTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

export const DatePicker = ({ onSelect }) => {
  return (
    <KeyboardDatePicker
      InputProps={{
        variant: "contained",
      }}
      margin="dense"
      format="LLL"
      value={date}
      variant="inline"
    />
  );
};
