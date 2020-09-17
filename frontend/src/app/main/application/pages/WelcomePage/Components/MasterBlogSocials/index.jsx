import React from "react";
import Box from "@material-ui/core/Box";
import { MasterBlogLogo } from "app/main/shared/MasterBlogLogo";
import WordpressIcon from "app/main/shared/SocialIcons/WordpressIcon";
import InstagramIcon from "app/main/shared/SocialIcons/InstagramIcon";
import FacebookIcon from "app/main/shared/SocialIcons/FacebookIcon";
import LinkedinIcon from "app/main/shared/SocialIcons/LinkedinIcon";
import { IconButton, Tooltip, Button } from "@material-ui/core";
import { useSocialNetworkConfiguration } from "app/hooks/useSocialNetworkConfiguration";
import { useNavigationHelper } from "app/hooks/useNavigationHelper";
import { useTranslation } from "react-i18next";
import YoutubeIcon from "app/main/shared/SocialIcons/YoutubeIcon";

export default function MasterBlogSocials() {
  const { t } = useTranslation("main");
  const { socialNetworkConfiguration } = useSocialNetworkConfiguration();
  const navigationHelper = useNavigationHelper();
  const isLinked = (networkName) => {
    return socialNetworkConfiguration.find((e) => e.name === networkName);
  };

  return (
    <>
      <Box className="p-20 flex justify-center">
        <MasterBlogLogo />
      </Box>
      <Box className="pt-20 flex justify-center" color="red">
        <IconButton
          color={isLinked("facebook") ? "inherit" : "default"}
          onClick={() => isLinked("facebook") ? navigationHelper.toFacebookPosts() : navigationHelper.toFacebookAuth()}
        >
          <FacebookIcon p={1} />
        </IconButton>
        <IconButton
          color={isLinked("WORDPRESS") ? "inherit" : "default"}
          onClick={() => isLinked("WORDPRESS") ? navigationHelper.toWordpressPosts() : navigationHelper.toWordpressAuth()}
        >
          <WordpressIcon p={1} />
        </IconButton>
        <IconButton color={isLinked("instagram") ? "inherit" : "default"}>
          <InstagramIcon p={1} />
        </IconButton>
        <IconButton color={isLinked("linkedin") ? "inherit" : "default"}>
          <LinkedinIcon p={1} />
        </IconButton>
        <IconButton color={isLinked("youtube") ? "inherit" : "default"}>
          <YoutubeIcon p={1} />
        </IconButton>
      </Box>
    </>
  );
}
