import React from "react";
import { useHistory } from "react-router-dom";
import mainService from "app/services/mainService";
import { useUser } from "./useUser";
import { WordpressAuthDialog } from "app/main/application/pages/WordpressPosts/components/WordpressAuthDialog";
import { useDialog } from "./useDialog";
import { DialogContent, DialogActions, Button, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

export const useNavigationHelper = () => {
  const history = useHistory();
  const user = useUser();
  const { open: openDialog } = useDialog();
  const {t} = useTranslation("main");

  const toFacebookPosts = () => {
    history.push("/main/facebook/posts/");
  };

  const toWordpressPosts = () => {
    history.push("/main/wordpress/posts/");
  };

  const toFacebookAuth = () => {
    return mainService.initFacebookAuth(user.id);
  };

  const toWordpressAuth = async () => {
    const resp = await openDialog({
      Component: WordpressAuthDialog,
      props: {
        userId: user.id,
      },
    });

    if(!resp) return;
    
    resp &&
      openDialog({
        Component: ({close}) => (
          <React.Fragment>
            <DialogContent>
              <Typography variant="h5" color="primary">
                {t("ondemand", {
                  es: "Verificación exitosa",
                  en: "Successfull verification",
                })}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => close()}>
                {t("ondemand", { es: "Cerrar", en: "Close" })}
              </Button>
            </DialogActions>
          </React.Fragment>
        ),
      });

    window.location.reload();
  };

  return {
    toFacebookPosts,
    toWordpressPosts,
    toFacebookAuth,
    toWordpressAuth,
  };
};
