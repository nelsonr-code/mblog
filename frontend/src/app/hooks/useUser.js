import React from 'react';
import { useSelector } from 'react-redux';

export const useUser = () => {

  const user = useSelector(state => state.auth.user.data);

  return user;
};