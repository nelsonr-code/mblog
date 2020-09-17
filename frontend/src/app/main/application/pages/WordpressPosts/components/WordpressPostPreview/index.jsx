import React from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { PostPresenter } from "app/main/shared/PostPresenter";
import { useTranslation } from "react-i18next";
import WordpressIcon from "app/main/shared/SocialIcons/WordpressIcon";

export const WordpressPostPreview = ({ post, close }) => {
  const { t } = useTranslation("main");
  return (
    <React.Fragment>
      <DialogTitle>
        <WordpressIcon />
        {/* <Typography>
          {t("ondemand", {
            es: "Previsualización de post",
            en: "Post visualization",
          })}
        </Typography> */}
      </DialogTitle>
      <DialogContent>
        <PostPresenter
          title={post.title.rendered}
          media={[]}
          text={post.content.rendered}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="primary"
          size="small"
          onClick={() => close()}
        >
          {t("ondemand", { es: "Cerrar", en: "Close" })}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => window.open(post.link, "_blank")}
        >
          {t("ondemand", { es: "Ver en wordpress", en: "Open in wordpress" })}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};
