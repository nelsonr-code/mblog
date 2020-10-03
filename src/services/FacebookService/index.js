import { SocialMediaService } from "../SocialMediaService";
import config from "config";
import logger from "../../infraestructure/logger";
import { FacebookPostMap } from "./Models/FacebookAttachmentData";
import moment from "moment";

export class FacebookService extends SocialMediaService {
  static BASE_URL = "https://graph.facebook.com/v8.0";
  static REDIRECT_URI = `${config.get(
    "baseUrl"
  )}/api/v1/oauth2/facebook/callback`;
  static namespace = "facebook";

  getAccessToken(code, userId) {
    let url = `${FacebookService.BASE_URL}/oauth/access_token`;
    return this.http()
      .get(url, {
        params: {
          client_id: process.env.FACEBOOK_KEY,
          client_secret: process.env.FACEBOOK_SECRET,
          redirect_uri: `${FacebookService.REDIRECT_URI}`,
          code,
        },
      })
      .then((resp) => resp.data)
      .catch((err) => {
        logger.fatal("COULD_NOT_GET_TOKEN");
        throw err;
      });
  }

  getPosts(access_token, since, until) {
    let url = `${FacebookService.BASE_URL}/me/feed`;
    console.log(
      "los posts de facebookkkkkkkkkkk",
      { since },
      new Date(since * 1000)
    );
    console.log(
      "los posts de facebookkkkkkkkkkk",
      { until },
      new Date(until * 1000)
    );
    return this.http()
      .get(url, {
        params: {
          fields: "",
          until,
          since,
          access_token,
          limit: 300,
        },
      })
      .then((r) => r.data);
  }

  getPostById(access_token, id) {
    let url = `${FacebookService.BASE_URL}/${id}`;

    return this.http()
      .get(url, {
        params: {
          fields:
            "message,attachments,created_time,description,properties,shares",
          access_token,
        },
      })
      .then((r) => r.data)
      .then((post) => FacebookPostMap.fromPrimitives(post).getResume())
      .catch((err) => {
        console.log(
          "errorrrr",
          err.response?.data || err.request || err.message
        );
        throw "error";
      });
  }

  getOauth2Url(email, userId) {
    let uri = `${FacebookService.REDIRECT_URI}`;
    console.log(
      "uri sincoded",
      `${FacebookService.REDIRECT_URI}?userId=${userId}`
    );
    console.log("uri encoded", uri);
    return [
      `https://www.facebook.com/v8.0/dialog/oauth?app_id=528622281368798&`,
      `redirect_uri=${uri}`,
      `&state={"user" : "${userId}"}`,
      `&scope=email,user_posts,user_location,user_status,user_videos,user_friends`,
      `,user_likes,user_link,user_photos`,
    ].join("");
  }
}
