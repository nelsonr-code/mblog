import React from "react";
import {
  CardMedia,
  Box,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import clsx from "clsx";

const mapper = {
  photo: "img",
  video: "video",
  video_inline: "video"
};

export const CustomCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const currentMedia = props.media[currentIndex];

  if (!currentMedia) return " ";

  const resource = currentMedia.resources[currentImageIndex];

  const onClickNext = () => {
    setCurrentImageIndex((i) => (i + 1) % currentMedia.resources.length);
  };
  const onClickPrev = () => {
    setCurrentImageIndex((i) => {
      if(i == 0) return currentMedia.resources.length - 1;
      
      return i-1;
    });
  };

  return (
    <>
      <Box>
        <CardMedia
          component={mapper[resource.type]}
          src={resource.src}
          style={{
            height: "250px",
            width: "auto",
            margin: "auto",
          }}
          controls={ resource.type.match(/video/) ? true : undefined }
        />
        <Controls {...{ onClickNext, onClickPrev }} />
      </Box>
      <Box py={1}>
        <Indicator
          size={currentMedia.resources.length}
          currentIndex={currentImageIndex}
        />
      </Box>
      <Box textAlign="center" py={1}>
        <Typography variant="subtitle1">{currentMedia.title}</Typography>
      </Box>
    </>
  );
};

const useIndicatorStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.primary.main,
    width: "10px",
    height: "10px",
  },
  regular: {
    backgroundColor: theme.palette.secondary.main,
    width: "7px",
    height: "7px",
  },
}));

const Indicator = ({ size, currentIndex }) => {
  const classes = useIndicatorStyles();

  console.log("currentIndex", currentIndex)

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {"0"
        .repeat(size)
        .split("")
        .map((e, i) => (
          <Box
            className={i === currentIndex ? classes.active : classes.regular}
            key={i}
            borderRadius="50%"
            m={1}
          ></Box>
        ))}
    </Box>
  );
};

const Controls = ({ onClickNext, onClickPrev }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      position="absolute"
      right={0}
      left={0}
      px={2}
      top="50%"
    >
      <IconButton  onClick={onClickPrev} >
        <ArrowBackIosIcon/>
      </IconButton>
      <IconButton onClick={onClickNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};
