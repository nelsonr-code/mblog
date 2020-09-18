import axios from 'axios';

const complete = r => r.data;

export class MainService {

  getUser(userId) {
    return axios.get('/api/v1/user/' + userId).then(complete);
  }

  getWordpressPosts(userId) {
    return axios.get('/api/v1/wordpress/posts/' + userId).then(complete);
  }

  getFacebookPosts(userId, query) {
    return axios.get(`/api/v1/user/${ userId }/facebook/posts/${ query }`).then(complete);
  }

  getFacebookPostById(userId, postId) {
    return axios.get(`/api/v1/user/${ userId }/facebook/posts/${ postId }`).then(complete);
  }

  getFacebookPostsFromUrl(url) {
    return axios.get(url).then(complete);
  }

  initFacebookAuth(id) {
    // return axios.get(`/api/v1/oauth2/facebook/?userId=${ id }`).then(r => console.log("klk", r));
    if(window.location.hostname === 'localhost') {
      return window.location = `http://${window.location.hostname}:8080/api/v1/oauth2/facebook/?userId=` + id;      
    } else {      
      return window.location = `http://${window.location.host}/api/v1/oauth2/facebook/?userId=` + id;
    }
  }

  postToWordpress(userId, data) {
    return axios.post('/api/v1/wordpress/posts/' + userId, data).then(complete);
  }

  wordpressAuth(blogUrl, blogkey, userId) {
    return axios.put('/api/v1/wordpress/update-blog-credentials', {
      blogUrl,
      blogkey,
      userId
    });
  }
}

export default new MainService();