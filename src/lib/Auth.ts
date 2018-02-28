import * as auth0 from 'auth0-js';

import appHistory from 'appHistory';
import { AUTH_CONFIG } from 'appConstants';

console.log(AUTH_CONFIG);

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid',
  });

  constructor() {}

  login = (username: string, password: string) => {
    this.auth0.login(
      { realm: AUTH_CONFIG.dbConnectionName, username, password },
      (err: any, authResult: any) => {
        if (err) {
          console.log(err);
          return;
        }
      },
    );
  };

  signup = (email: string, password: string) => {
    this.auth0.signup(
      { connection: AUTH_CONFIG.dbConnectionName, email, password },
      (err: any) => {
        if (err) {
          console.log(err);

          return;
        }

        this.login(email, password);
      },
    );
  };

  loginWithGoogle = (callback: Function) => {
    this.auth0.popup.authorize(
      {
        connection: 'google-oauth2',
        redirectUri: `${location.origin}/auth/popup.html`,
      },
      (err: any, authResult: any) => {
        this.handlePopupAuthentication(err, authResult);
        if (callback) {
          callback(err, authResult);
        }
      },
    );
  };

  handlePopupAuthentication = (err: any, authResult: any) => {
    console.log(authResult);
    if (authResult && authResult.accessToken && authResult.idToken) {
      this.setSession(authResult);
    } else if (err) {
      console.error(err);
    }
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
      }
      appHistory.replace('/');
    });
  };

  setSession = (authResult: any) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    appHistory.replace('/');
  };

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    appHistory.replace('/');
  };

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    try {
      let expiresAt = JSON.parse(localStorage.getItem('expires_at') || '""');
      if (!expiresAt) return false;
      return new Date().getTime() < expiresAt;
    } catch (e) {
      console.error(e);
    }
    return false;
  }
}
