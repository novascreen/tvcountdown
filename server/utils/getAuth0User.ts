import { AuthenticationError } from 'apollo-server-micro';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

import { AUTH_CONFIG } from '../serverConstants';
import { Auth0User } from './utils';

const client = jwksClient({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 1,
  jwksUri: `https://${AUTH_CONFIG.domain}/.well-known/jwks.json`,
});

export const getAuth0User = (token?: string) =>
  new Promise<Auth0User>(resolve => {
    if (!token) {
      resolve();
      return;
    }
    jwt.verify(
      token,
      (header: any, cb: Function) => {
        client.getSigningKey(header.kid, function(error, key: any) {
          if (error) cb(error);
          else {
            var signingKey = key.publicKey || key.rsaPublicKey;
            cb(null, signingKey);
          }
        });
      },
      {
        // Validate the audience and the issuer.
        // credentialsRequired: false,
        audience: AUTH_CONFIG.audience,
        issuer: `https://${AUTH_CONFIG.domain}/`,
        algorithms: ['RS256'],
      },
      (err: Error, decoded: any) => {
        if (err) {
          console.error(err);
          throw new AuthenticationError('Authentication failed');
        }
        const [identity, id] = decoded.sub.split(`|`);
        resolve({
          ...decoded,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
          sub: decoded.sub,
          identity,
          id,
        });
      },
    );
  });
