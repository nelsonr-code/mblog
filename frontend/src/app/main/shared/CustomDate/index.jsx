import React from 'react';
import moment from 'moment';
import { Typography } from '@material-ui/core';

moment.locale('es');

export const CustomDate = ({ date, format }) => {
  
  format = format || 'LLL';
  return (
    <Typography>
      { moment(date).format(format) }
    </Typography>
  );
};