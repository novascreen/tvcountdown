import * as auth0 from 'auth0-js';
import gql from 'graphql-tag';

import appHistory from 'appHistory';
import { AUTH_CONFIG } from 'appConstants';
import { ApolloClient } from 'apollo-client';

const AUTHENTICATE = gql`
  mutation authenticate($idToken: String!) {
    authenticate(idToken: $idToken) {
      id
      name
      email
    }
  }
`;

export const isAuthenticated = () => {
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
};

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    audience: AUTH_CONFIG.audience,
    responseType: 'token id_token',
    scope: 'openid profile email user_metadata app_metadata picture',
  });

  apolloClient: ApolloClient<any>;
  cb = () => {};

  constructor(cb: Function, apolloClient: ApolloClient<any>) {
    // this.handleAuthentication();
    // binds functions to keep this context
    this.apolloClient = apolloClient;
    this.cb = cb.bind(this);
  }

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
        redirectUri: `${location.origin}/auth/popup`,
      },
      (err: any, authResult: any) => {
        this.handlePopupAuthentication(err, authResult);
        if (callback) {
          callback(err, authResult);
        }
      },
    );
  };

  // loginWithTwitter = (callback: Function) => {
  //   this.auth0.popup.authorize(
  //     {
  //       connection: 'google-oauth2',
  //       redirectUri: `${location.origin}/auth/popup`,
  //     },
  //     (err: any, authResult: any) => {
  //       this.handlePopupAuthentication(err, authResult);
  //       if (callback) {
  //         callback(err, authResult);
  //       }
  //     },
  //   );
  // };

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
    const data = {
      status: `success`,
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt,
    };
    this.signinOrCreateAccount({ ...data });
  };

  signinOrCreateAccount({ accessToken, idToken, expiresAt }: any) {
    console.log(this.apolloClient);
    this.apolloClient
      .mutate({
        mutation: AUTHENTICATE,
        variables: { idToken },
      })
      .then((res: any) => {
        // navigate to the home route
        appHistory.replace('/');
        // if (window.location.href.includes(`callback`)) {
        //   window.location.href = '/';
        // } else {
        //   window.location.reload();
        // }
      })
      .catch((err: Error) =>
        console.log('Sign in or create account error: ', err),
      );
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    appHistory.replace('/');
  };
}
