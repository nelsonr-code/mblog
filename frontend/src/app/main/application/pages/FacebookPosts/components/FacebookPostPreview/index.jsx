import React from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import { PostPresenter } from "app/main/shared/PostPresenter";
import { useTranslation } from "react-i18next";
import FacebookIcon from "app/main/shared/SocialIcons/FacebookIcon";
import { MapFacebookMedia } from "app/Models/Media";
import WordpressIcon from "app/main/shared/SocialIcons/WordpressIcon";
import { useFacebookHelper } from "app/hooks/useFacebookHelper";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from '@material-ui/icons/Clear';
import { PostEditor } from "../PostEditor";

const mediaFormatter = (data) => {
  return MapFacebookMedia.toVm(data);
};

export const FacebookPostPreview = ({ post, close }) => {
  const { t } = useTranslation("main");
  const [editMode, setEditMode] = React.useState(false);
  const [_post, setPost] = React.useState(post);
  
  const { repostToWordpress } = useFacebookHelper();
  
  const toggleEditMode = () => {
    setEditMode((e) => !e);
  };
  
  const updateTitle = (title) => {
    setPost((old) => ({
      ...old,
      message: title,
    }));
  };
  
  const updateMedia = (mediaItems) => {
    console.log("ajka", mediaItems);
  };
  
  const media = post.attachments ? post.attachments.map(mediaFormatter) : [];
  
  return (
    <React.Fragment>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <FacebookIcon />
          <IconButton color="primary" onClick={toggleEditMode}>
            {editMode ? <ClearIcon /> : <EditIcon />}
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {!editMode && (
          <PostPresenter
            title={_post.message}
            media={media}
            text={" "}
            date={post.created_time}
          />
        )}
        {editMode && (
          <PostEditor
            title={_post.message}
            media={media}
            onChangeTitle={updateTitle}
            onChangeMedia={updateMedia}
          />
        )}
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
          onClick={() => repostToWordpress(_post)}
          startIcon={<WordpressIcon />}
        >
          {t("ondemand", {
            es: "Postear en wordpress",
            en: "Post to wordpress",
          })}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};
