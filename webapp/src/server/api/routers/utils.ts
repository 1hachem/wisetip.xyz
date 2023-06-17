import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const utilsRouter = createTRPCRouter({
  addInterested: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
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

  addMail: publicProcedure.input(z.string().email()).mutation(async ({ ctx, input }) => {
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

  addFeedback: publicProcedure
    .input(z.object({ userId: z.string(), feedback: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.feedback.create({
          data: {
            feedback: input.feedback,
            user: {
              connect: {
                id: input.userId,
              },
            },
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
