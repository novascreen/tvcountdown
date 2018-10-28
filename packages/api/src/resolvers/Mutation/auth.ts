import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Context } from '../../utils';
import validateAndParseIdToken from '../../utils/validateAndParseIdToken';

async function createPrismaUser(ctx: any, idToken: any) {
  console.log('IDTOKEN', idToken);
  const user = await ctx.db.mutation.createUser({
    data: {
      identity: idToken.sub.split(`|`)[0],
      auth0id: idToken.sub.split(`|`)[1],
      name: idToken.name,
      email: idToken.email,
      avatar: idToken.picture,
    },
  });
  return user;
}

export default {
  async authenticate(
    parent: any,
    { idToken }: { idToken: any },
    ctx: any,
    info: any,
  ) {
    let userToken = null;
    try {
      userToken = await validateAndParseIdToken(idToken);
    } catch (err) {
      throw new Error(err.message);
    }
    const auth0id = userToken.sub.split('|')[1];
    let user = await ctx.db.query.user({ where: { auth0id } }, info);
    if (!user) {
      user = createPrismaUser(ctx, userToken);
    }
    return user;
  },
};
