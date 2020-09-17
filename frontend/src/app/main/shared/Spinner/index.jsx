import React from "react";
import { Backdrop, Box, makeStyles, Typography } from "@material-ui/core";
import { MasterBlogLogo } from "../MasterBlogLogo";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  spinnerBackdrop: {
    zIndex: theme.zIndex.drawer * 2,
  },
  spinner: {
    animation: `$rotate 2000ms infinite ${theme.transitions.easing.easeInOut}`,
    padding: theme.spacing(4),
    width: theme.spacing(30),
  },
  "@keyframes rotate": {
    "0%": {
      transform: "rotate(-540deg) scale(1)",
    },
    "100%": {
      transform: "rotate(540deg) scale(1)",
    },
  },
}));

export const Spinner = (props) => {
  const classes = useStyles();
  const { t } = useTranslation("main");
  const visible = useSelector(({ fuse }) => fuse.spinner.state);

  return (
    <Backdrop open={visible} className={classes.spinnerBackdrop}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        flexDirection="column"
      >
        <MasterBlogLogo className={classes.spinner} />
        <Typography variant="subtitle1" style={{ color: "white" }}>
          {t("ondemand", { es: "Cargando...", en: "Loading..." })}
        </Typography>
      </Box>
    </Backdrop>
  );
};
