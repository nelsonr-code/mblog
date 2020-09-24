import { Box, Button, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { DateRangePicker } from "../DateRangePicker";
import moment from "moment";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

export const DateCustomFilter = (props) => {
  console.log("los props", props);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [range, setRange] = React.useState(props.defaultRange);
  const [backupRange, setBackuprange] = React.useState(props.defaultRange);

  const handleClick = (e) => !anchorEl && setAnchorEl(e.currentTarget);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = range => {
    console.log("range", range);
    setBackuprange(range);
  };

  const applyFilter = () => {
    setRange(backupRange);
    props.onApplyFilter(backupRange)
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={
          <ArrowDropDownIcon/>
        }
      >
        { moment(range.startDate).format("ll") } - { moment(range.endDate).format("ll") } 
      </Button>
      <Menu
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {/* <MenuItem> */}
        <div>
          <DateRangePicker defaultRange={ range } onChange={ handleChange }/>
          <Box display="flex" justifyContent="flex-end" py={1}>
            <Box mr={1}>
              <Button color="primary" size="small" onClick={handleClose}>
                cancel
              </Button>
            </Box>
            <Box>
              <Button color="primary" size="small" variant="contained" onClick={applyFilter}>
                apply
              </Button>
            </Box>
          </Box>
        </div>
        {/* </MenuItem> */}
      </Menu>
    </div>
  );
};
