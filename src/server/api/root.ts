import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/project";
import { abilitieRouter } from "./routers/abilites";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  abilitie: abilitieRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;