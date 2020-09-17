import { Fatal } from "../../domain-model/DomainErrors";
import HttpService from "../HttpService";

// abstract
export class SocialMediaService {
  
  constructor() {
    this._http = HttpService;
  }

  http() {
    return this._http;
  }

  getAccessToken() {
    throw new Fatal('Must implement [getAccesToken()] method');
  }
  
  refreshAccessToken() {
    throw new Fatal('Must implement [refreshAccessToken()] method');
  }
  
  getPosts() {
    throw new Fatal('Must implement [getUserPosts()] method');
  }

  removeAuth() {
    throw new Fatal('Must implement [removeAuth()] method');
  }
}