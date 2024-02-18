import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { projectAbilities, projects } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany({
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });
  }),

  get: publicProcedure
    .input(z.object({ id: z.string().transform(Number) }))
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findFirst({
        where: eq(projects.id, input.id),
        with: {
          projectAbilities: {
            with: {
              abilities: true,
            },
          },
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        pictureUrl: z.string(),
        tagsId: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .insert(projects)
        .values({
          name: input.name,
          description: input.description,
          pictureUrl: input.pictureUrl,
        })
        .returning({ id: projects.id });

      const project = result[0];

      if (result.length > 0 && project && input.tagsId.length > 0) {
        await ctx.db.insert(projectAbilities).values(
          input.tagsId.map((tag) => ({
            projectId: project.id,
            abilitieId: tag,
          })),
        );
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        description: z.string().min(1),
        pictureUrl: z.string(),
        tagsId: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(projects)
        .set({
          name: input.name,
          description: input.description,
          pictureUrl: input.pictureUrl,
        })
        .where(eq(projects.id, input.id))
        .returning({ id: projects.id });

      const project = result[0];

      await ctx.db.delete(projectAbilities).where(eq(projectAbilities.projectId, input.id));

      if (result.length > 0 && project && input.tagsId.length > 0) {
        await ctx.db.insert(projectAbilities).values(
          input.tagsId.map((tag) => ({
            projectId: project.id,
            abilitieId: tag,
          })),
        );
      }
    }),
});
