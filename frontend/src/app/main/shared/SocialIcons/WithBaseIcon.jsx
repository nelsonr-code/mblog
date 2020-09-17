import React from 'react';
import { Box } from '@material-ui/core';

export const WithBaseIcon = WrappedIcon => props => {
  return (
    <Box {...props}>
      <WrappedIcon />
    </Box>
  );
};