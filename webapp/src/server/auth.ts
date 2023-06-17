import { PrismaAdapter } from '@auth/prisma-adapter';
import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type DefaultSession,
  type DefaultUser,
  type NextAuthOptions,
} from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '~/env.mjs';
import { prisma } from './db';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      coins: number;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    coins: number;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        coins: user.coins,
      },
    }),
  },
  adapter: PrismaAdapter(prisma) as Adapter<boolean>,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
