import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { abilities } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const abilitieRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.abilities.findMany({
      orderBy: (abilities, { desc }) => [desc(abilities.name)],
    });
  }),

  get: publicProcedure
    .input(z.object({ id: z.string().transform(Number) }))
    .query(({ ctx, input }) => {
      return ctx.db.query.abilities.findFirst({
        where: eq(abilities.id, input.id),
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        isEnabled: z.boolean(),
        name: z.string().min(1),
        pictureUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(abilities).values({
        name: input.name,
        pictureUrl: input.pictureUrl,
        isEnabled: input.isEnabled,
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        isEnabled: z.boolean(),
        name: z.string().min(1),
        pictureUrl: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(abilities)
        .set({
          name: input.name,
          pictureUrl: input.pictureUrl,
          isEnabled: input.isEnabled,
        })
        .where(eq(abilities.id, input.id));
    }),
});
