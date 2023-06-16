import { interestedRouter } from '~/server/api/routers/interested';
import { itemsRouter } from '~/server/api/routers/items';
import { mailRouter } from '~/server/api/routers/mail';
import { createTRPCRouter } from '~/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  item: itemsRouter,
  mail: mailRouter,
  interested: interestedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
