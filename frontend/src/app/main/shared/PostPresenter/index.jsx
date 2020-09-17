import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Button,
  CardActionArea,
} from "@material-ui/core";
import { CustomCarousel } from "../CustomCarousel";

export const PostPresenter = ({ title, media, text }) => {
  console.log("la data multimedia", media);

  return (
    <Card elevation={0}>
      <CardHeader title={title} />
      <CustomCarousel media={ media }/>
      <CardContent dangerouslySetInnerHTML={{ __html: text }}></CardContent>
    </Card>
  );
};
