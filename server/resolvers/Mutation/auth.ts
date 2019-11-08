import { Context, Auth0User } from '../../utils/utils';
import { MutationAuthenticateArgs } from '../../types';
import { AuthenticationError } from 'apollo-server-core';

async function createPrismaUser({ db }: Context, auth0User: Auth0User) {
  const user = await db.createUser({
    identity: auth0User.sub.split(`|`)[0],
    auth0id: auth0User.sub.split(`|`)[1],
    name: auth0User.name,
    email: auth0User.email,
    avatar: auth0User.picture
  });
  return user;
}

export default {
  async authenticate(
    parent: any,
    args: MutationAuthenticateArgs,
    ctx: Context
  ) {
    const auth0User = ctx.auth0User;
    if (!auth0User) throw new AuthenticationError('Authentication failed');
    let user = ctx.user;
    if (!user) {
      user = await createPrismaUser(ctx, auth0User);
    }
    return user;
  }
};
