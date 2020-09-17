import axios from "axios";
import jwtDecode from "jwt-decode";
import FuseUtils from "@fuse/FuseUtils";
import { openSpinner, closeSpinner } from 'app/store/actions';
import store from "app/store";

class jwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.request.use(config => {
      store.dispatch(openSpinner())
      return config;
    });
    axios.interceptors.response.use(
      (response) => {
        store.dispatch(closeSpinner())
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          store.dispatch(closeSpinner())
          if (
            err.response?.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          console.log("err", err)
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }
    if (this.isAuthTokenValid(access_token)) {
      this.setSession({token: access_token, email: "123"});
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return axios.post("/api/v1/user/", data);
  };

  verifyUser = async () => {
    try {
      const verifyResponse = await axios.post("/api/verify");
      console.log("verificacion del user", verifyResponse);
      return verifyResponse;
    } catch (err) {
      console.log("no se pudo verificar el usuario", err);
      throw err;
    }
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/v1/user/auth", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.message === "password_validation_success") {
            this.setSession({ token: response.data.token, email });
            resolve(response.data.userData);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const token = jwtDecode(this.getAccessToken());
      axios
        .get("/api/v1/user/" + token.userId)
        .then(r => r.data)
        .then((data) => {
          resolve(data.userData)
        })
        .catch((error) => {
          this.logout();
          reject("Failed to login with token.");
        });
    });
  };

  updateUserData = (user) => {
    return axios.post("/api/auth/user/update", {
      user: user,
    });
  };

  setSession = (data) => {
    let { token: access_token, email } = data || {};
    if (access_token && email) {
      localStorage.setItem("jwt_access_token", access_token);
      localStorage.setItem("email", email);
      axios.defaults.headers.common["authorization"] = access_token;
      axios.defaults.headers.common["auth-user"] = email;
    } else {
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("email");
      delete axios.defaults.headers.common["authorization"];
      delete axios.defaults.headers.common["auth-user"];
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    try {
      const decoded = jwtDecode(access_token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        console.warn("access token expired");
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new jwtService();

export default instance;
