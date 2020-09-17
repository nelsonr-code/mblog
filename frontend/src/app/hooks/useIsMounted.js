import React from 'react';


export const useIsMounted = () => {

  const isMountedRef = React.useRef();

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => isMountedRef.current = false;

  },[]);

  return isMountedRef;
};