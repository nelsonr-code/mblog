import React from 'react';
import mainService from 'app/services/mainService';
import { useIsMounted } from './useIsMounted';
import { useUser } from './useUser';


export const useSocialNetworkConfiguration = () => {

  const [socialNetworkConfiguration, setSocialNetworkConfiguration] = React.useState([]);
  const user = useUser();
  const isMountedRef = useIsMounted();

  React.useEffect(() => {
    mainService.getUser(user.id)
      .then(user => {
        isMountedRef.current && setSocialNetworkConfiguration(user.userData.socialNetworks);
      });
  }, [user.id]);

  return {
    socialNetworkConfiguration
  };
}