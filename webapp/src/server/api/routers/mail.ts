import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const mailRouter = createTRPCRouter({
  add: publicProcedure.input(z.string().email()).mutation(async ({ ctx, input }) => {
    try {
      const res = await ctx.prisma.mail.create({
        data: {
          email: input,
        },
      });
      return res;
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "You are already signed up! Dont't worry we are launchig soon :)",
        // optional: pass the original error to retain stack trace
        cause: err,
      });
    }
  }),
});
