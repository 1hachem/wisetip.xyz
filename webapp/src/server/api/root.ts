import { itemsRouter } from '~/server/api/routers/items';
import { createTRPCRouter } from '~/server/api/trpc';
import { utilsRouter } from './routers/utils';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  item: itemsRouter,
  utils: utilsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
