import { SocialMediaService } from "../SocialMediaService";
import config from "config";
import logger from "../../infraestructure/logger";
import { InvalidWordpressCredentials } from "./InvalidWordpressCredentials";

export class WordpressService extends SocialMediaService {
  static BLOG_URL = process.env.WORDPRESS_URL;
  static BLOG_SECRET = process.env.WORDPRESS_SECRET;
  static REDIRECT_URI = `${config.get("baseUrl")}/wordpress-callback`;
  static WP_USER = "web-api";
  static namespace = "WORDPRESS";
  
  getAccessToken(blogUrl, blogKey) {
    let url = `${blogUrl}/wp-json/wp/v2/users/me`;
    const token = `${WordpressService.WP_USER}:${blogKey}`;
    const base64token = Buffer.from(token).toString("base64");

    logger.info("base64Token", { base64token });

    return this.http()
      .get(url, {
        headers: {
          Authorization: `Basic ${base64token}`,
        },
      })
      .then((resp) => resp.data)
      .then((data) => {
        logger.info("DATA_FROM_BLOG", data);
        return base64token;
      })
      .catch((err) => {
        console.log("error", err.data || err);
        logger.fatal("COULD_NOT_GET_TOKEN");
        throw new InvalidWordpressCredentials();
      });
  }

  postToBlog(access_token, blogUrl, body) {
    let url = `${blogUrl}/wp-json/wp/v2/posts`;
    return this.http().post(url, body, {
      headers: {
        Authorization: `Basic ${ access_token }`
      }
    });
  }

  getPosts(blogUrl) {
    let url = `${blogUrl}/wp-json/wp/v2/posts`;
    return this.http()
      .get(url)
      .then((r) => r.data);
  }

  getCategories(blogUrl) {
    let url = `${blogUrl}/wp-json/wp/v2/categories`;
    return this.http()
      .get(url)
      .then((r) => r.data);
  }
}
