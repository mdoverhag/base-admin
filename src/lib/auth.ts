import { WebAuth, Auth0DecodedHash } from "auth0-js";
import { Promise } from "bluebird";
import defaultTo from "lodash/defaultTo";
import pick from "lodash/pick";

import store from "../store";
import { setProfile, unsetProfile } from "../store/profile/actions";

class Auth {
  auth: WebAuth;
  email?: string;
  constructor() {
    const url = defaultTo(process.env.REACT_APP_URL, "http://localhost:3000");
    this.auth = new WebAuth({
      domain: defaultTo(process.env.REACT_APP_AUTH0_DOMAIN, ""),
      clientID: defaultTo(process.env.REACT_APP_AUTH0_CLIENT_ID, ""),
      redirectUri: `${url}/login/callback`,
      responseType: "token id_token"
    });
    this.email = this.getProfile().email;
    if (this.loggedIn() && this.email) {
      store.dispatch(setProfile({ email: this.email }));
    }
  }

  login(email: string) {
    return Promise.promisify(this.auth.passwordlessStart, {
      context: this.auth
    })({
      connection: "email",
      send: "code",
      email
    })
      .then(res => {
        this.email = email;
        return res;
      })
      .catch(console.error);
  }

  verify(verificationCode: string) {
    return Promise.promisify(this.auth.passwordlessLogin, {
      context: this.auth
    })({
      connection: "email",
      email: this.email,
      verificationCode
    }).catch(err => {
      console.error(err);
      throw err;
    });
  }

  handleCallback() {
    return Promise.promisify(this.auth.parseHash, { context: this.auth })({
      hash: window.location.hash
    })
      .then((authResult: Auth0DecodedHash | null) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setToken(authResult.accessToken, authResult.idToken);
          if (authResult.idTokenPayload) {
            this.setProfile(authResult.idTokenPayload);
          }
        }
      })
      .then(() => {
        if (this.loggedIn() && this.email) {
          store.dispatch(setProfile({ email: this.email }));
        }
      })
      .catch(console.error);
  }

  loggedIn() {
    return Boolean(this.getToken());
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  setToken(accessToken: string, idToken: string) {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("id_token", idToken);
  }

  getProfile() {
    const profile = localStorage.getItem("profile");
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  setProfile(idTokenPayload: object) {
    localStorage.setItem(
      "profile",
      JSON.stringify(pick(idTokenPayload, ["email", "name", "picture"]))
    );
    this.email = this.getProfile().email;
  }

  logout() {
    delete this.email;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id_token");
    localStorage.removeItem("profile");
    store.dispatch(unsetProfile());
  }
}

export default new Auth();
