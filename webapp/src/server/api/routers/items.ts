import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const itemsRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.number().optional()).query(({ ctx, input = 5 }) => {
    return ctx.prisma.item.findMany({
      include: {
        tips: true,
      },
      take: input,
    });
  }),

  getOne: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const res = await ctx.prisma.item.findUnique({
        where: {
          id: input,
        },
        include: {
          _count: {
            select: { tips: true },
          },
          tips: {
            orderBy: [
              {
                upvotes: {
                  _count: 'desc',
                },
              },
              {
                downvotes: {
                  _count: 'asc',
                },
              },
            ],
            include: {
              _count: {
                select: {
                  upvotes: true,
                  downvotes: true,
                },
              },
              upvotes: true,
              downvotes: true,
            },
          },
        },
      });
      return res;
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Item not found!',
        // optional: pass the original error to retain stack trace
        cause: err,
      });
    }
  }),

  search: publicProcedure.input(z.object({ text: z.string() })).query(async ({ ctx, input }) => {
    const keywords = input.text.trim().split(' ').join(' | ');
    const results = await ctx.prisma.item.findMany({
      where: {
        name: {
          search: keywords,
        },
        description: {
          search: keywords,
        },
      },
    });
    return {
      results,
    };
  }),

  upvote: publicProcedure
    .input(z.object({ tipId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.upvote.create({
          data: {
            user: {
              connect: {
                id: input.userId,
              },
            },
            tip: {
              connect: {
                id: input.tipId,
              },
            },
          },
        });
        return res;
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
          // optional: pass the original error to retain stack trace
          cause: err,
        });
      }
    }),

  removeUpvote: publicProcedure
    .input(z.object({ tipId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.upvote.delete({
          where: {
            tipId_userId: {
              tipId: input.tipId,
              userId: input.userId,
            },
          },
        });
        return res;
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
          // optional: pass the original error to retain stack trace
          cause: err,
        });
      }
    }),

  removeDownvote: publicProcedure
    .input(z.object({ tipId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.downvote.delete({
          where: {
            tipId_userId: {
              tipId: input.tipId,
              userId: input.userId,
            },
          },
        });
        return res;
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
          // optional: pass the original error to retain stack trace
          cause: err,
        });
      }
    }),

  downvote: publicProcedure
    .input(z.object({ tipId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.downvote.create({
          data: {
            user: {
              connect: {
                id: input.userId,
              },
            },
            tip: {
              connect: {
                id: input.tipId,
              },
            },
          },
        });
        return res;
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
          // optional: pass the original error to retain stack trace
          cause: err,
        });
      }
    }),

  submitTip: publicProcedure
    .input(z.object({ userId: z.string(), itemId: z.string(), tip: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.prisma.tipSubmission.create({
          data: {
            text: input.tip,
            user: {
              connect: {
                id: input.userId,
              },
            },
            item: {
              connect: {
                id: input.itemId,
              },
            },
          },
        });
        return res;
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
          // optional: pass the original error to retain stack trace
          cause: err,
        });
      }
    }),
});
