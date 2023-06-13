import { type GetServerSidePropsContext } from 'next';
import { getServerSession, type NextAuthOptions, type DefaultSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type Adapter } from 'next-auth/adapters';

import { env } from '~/env.mjs';
import { prisma } from './db';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session }) => ({
      ...session,
      user: {
        ...session.user,
      },
    }),
  },
  adapter: PrismaAdapter(prisma) as Adapter<boolean>,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
