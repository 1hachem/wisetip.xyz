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
});
