import React from "react";
import { FusePageSimple } from "@fuse";
import { makeStyles } from "@material-ui/styles";
import { useTranslation } from "react-i18next";
import MasterBlogSocials from "./Components/MasterBlogSocials";

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
  },
}));

function WelcomePage(props) {
  const classes = useStyles(props);
  const { t } = useTranslation("main");

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
      }}
      header={
        <div className="p-24 text-center flex">
          <h1>{t("title")}</h1>
        </div>
      }
      content={
        <div className="p-24 flex flex-col flex-1 justify-center h-full">
          <MasterBlogSocials />
        </div>
      }
    />
  );
}

export default WelcomePage;
