import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { abilities, projectAbilities } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { deleteFile } from "@/utils/supabaseStorage";

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

  create: protectedProcedure
    .input(
      z.object({
        isEnabled: z.boolean(),
        name: z.string().min(1),
        pictureUrl: z.string(),
        picturePath: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(abilities).values({
        name: input.name,
        pictureUrl: input.pictureUrl,
        isEnabled: input.isEnabled,
        picturePath: input.picturePath,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        isEnabled: z.boolean(),
        name: z.string().min(1),
        pictureUrl: z.string(),
        picturePath: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(abilities)
        .set({
          name: input.name,
          pictureUrl: input.pictureUrl,
          isEnabled: input.isEnabled,
          picturePath: input.picturePath,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(abilities.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.query.abilities.findFirst({
        where: eq(abilities.id, input.id),
      });

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      if (result.picturePath) {
        await deleteFile(result.picturePath);
      }

      await ctx.db
        .delete(projectAbilities)
        .where(eq(projectAbilities.abilitieId, input.id));
      await ctx.db.delete(abilities).where(eq(abilities.id, input.id));
    }),
});
