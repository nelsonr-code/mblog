import { SocialMediaService } from "../SocialMediaService";
import config from 'config';
import logger from "../../infraestructure/logger";

export class InstagramService extends SocialMediaService {
    
    static BASE_URL = "https://api.instagram.com";
    static INSTAGRAM_REDIRECT_URI = `${ config.get('baseUrl') }/api/v1/oauth2/instagram/callback`;
    static fields = "user_profile,user_media";

    getAccessToken(code) {
      let url = `${ InstagramService.BASE_URL }/oauth/authorize`;
      return this.http().post(url, {
        params: {
          client_id: process.env.INSTAGRAM_KEY,
          client_secret: process.env.INSTAGRAM_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: `${ InstagramService.INSTAGRAM_REDIRECT_URI }`,
          code: code,
        }
      })
        .then(resp => resp.data)
        .then(data => data.access_token)
        .catch(err => {
          console.log("error", err);
          logger.fatal('COULD_NOT_GET_TOKEN');
          return null;
      });
    }

    getPosts(access_token) {
        let url = `${ InstagramService.BASE_URL }/me`;
        return this.http().get(url, {
            params: {
            fields:
              "id,username,media_count,media{caption,timestamp,media_url,media_type,permalink,thumbnail_url,children{media_url, media_type}}",
            access_token,
            }
        })
    }
    
    getAuthorizeUser() {
      return [
        `${ InstagramService.BASE_URL }/oauth/authorize`,
        `?client_id=217883689275415`,
        `&redirect_uri=${ InstagramService.INSTAGRAM_REDIRECT_URI }`,
        `&scope=${ InstagramService.fields }`,
        `&response_type=code`,
      ].join("")
    }
}