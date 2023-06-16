import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const interestedRouter = createTRPCRouter({
  add: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    try {
      const res = await ctx.prisma.interested.create({
        data: {
          user: {
            connect: {
              id: input,
            },
          },
        },
      });
      return res;
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'New user added',
        // optional: pass the original error to retain stack trace
        cause: err,
      });
    }
  }),
});
