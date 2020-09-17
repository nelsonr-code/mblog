import React from "react";
import { Typography } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { MasterBlogLogo } from "app/main/shared/MasterBlogLogo";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .logo-icon": {
      width: 24,
      height: 24,
      transition: theme.transitions.create(["width", "height"], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    "& .react-badge, & .logo-text": {
      transition: theme.transitions.create("opacity", {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
  },
  reactBadge: {
    backgroundColor: "#121212",
    color: "#61DAFB",
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, "flex items-center")}>
      <img
        className="logo-icon"
        src="assets/images/logos/masterblog/black_logo.svg"
        alt="logo"
      />
      {/* <MasterBlogLogo className="logo-icon"/> */}
      <Typography
        className="text-13 mx-12 font-light logo-text"
        color="inherit"
      >
        Master blog
      </Typography>
    </div>
  );
}

export default Logo;
