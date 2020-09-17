import React from 'react';
import { useDispatch } from 'react-redux';
import { openDialog, closeDialog } from 'app/store/actions';

export const useDialog = () => {

  const dispatch = useDispatch();
  
  const open = ({ Component, props }) => {
    return new Promise((resolve ) => {
      dispatch(openDialog({
        children: <Component {...{ ...props, close: close(resolve)}} />,
        maxWidth: "sm",
        fullWidth: true
      }));
    });
  };

  const close = resolve => (data) => {
    dispatch(closeDialog());
    resolve(data);
  };

  return { open };
};