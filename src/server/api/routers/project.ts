import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  projectAbilities,
  projects,
  projectsDescriptions,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { deleteFile } from "@/utils/supabaseStorage";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany({
      orderBy: (projects, { desc }) => [desc(projects.name)],
      with: {
        projectsDescriptions: {
          columns: {
            language: true,
            description: true,
          },
        },
        projectAbilities: {
          with: {
            abilities: true,
          },
        },
      },
    });
  }),

  get: publicProcedure
    .input(z.object({ id: z.string().transform(Number) }))
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findFirst({
        where: eq(projects.id, input.id),
        with: {
          projectsDescriptions: {
            columns: {
              language: true,
              description: true,
            },
          },
          projectAbilities: {
            with: {
              abilities: true,
            },
          },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        isEnabled: z.boolean(),
        name: z.string().min(1),
        descriptions: z.array(
          z.object({
            description: z.string().min(1),
            language: z.string(),
          }),
        ),
        pictureUrl: z.string(),
        picturePath: z.string(),
        tagsId: z.array(z.number()),
        projectUrl: z.string().optional(),
        projectRepository: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .insert(projects)
        .values({
          isEnabled: input.isEnabled,
          name: input.name,
          pictureUrl: input.pictureUrl,
          picturePath: input.picturePath,
          projectUrl: input.projectUrl,
          projectRepository: input.projectRepository,
        })
        .returning({ id: projects.id });

      const project = result[0];

      if (result.length > 0 && project && input.descriptions.length > 0) {
        await ctx.db.insert(projectsDescriptions).values(
          input.descriptions.map((description) => ({
            projectId: project.id,
            description: description.description,
            language: description.language,
          })),
        );
      }

      if (result.length > 0 && project && input.tagsId.length > 0) {
        await ctx.db.insert(projectAbilities).values(
          input.tagsId.map((tag) => ({
            projectId: project.id,
            abilitieId: tag,
          })),
        );
      }
    }),

  update: protectedProcedure
    .input(
      z.object({
        isEnabled: z.boolean(),
        id: z.number(),
        name: z.string().min(1),
        descriptions: z.array(
          z.object({
            description: z.string().min(1),
            language: z.string(),
          }),
        ),
        pictureUrl: z.string(),
        picturePath: z.string(),
        tagsId: z.array(z.number()),
        projectUrl: z.string().optional(),
        projectRepository: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(projects)
        .set({
          isEnabled: input.isEnabled,
          name: input.name,
          pictureUrl: input.pictureUrl,
          picturePath: input.picturePath,
          updatedAt: new Date().toISOString(),
          projectUrl: input.projectUrl,
          projectRepository: input.projectRepository,
        })
        .where(eq(projects.id, input.id))
        .returning({ id: projects.id });
      const project = result[0];
      await ctx.db
        .delete(projectAbilities)
        .where(eq(projectAbilities.projectId, input.id));

      await ctx.db
        .delete(projectsDescriptions)
        .where(eq(projectsDescriptions.projectId, input.id));

      if (result.length > 0 && project && input.descriptions.length > 0) {
        await ctx.db.insert(projectsDescriptions).values(
          input.descriptions.map((description) => ({
            projectId: project.id,
            description: description.description,
            language: description.language,
          })),
        );
      }

      if (result.length > 0 && project && input.tagsId.length > 0) {
        await ctx.db.insert(projectAbilities).values(
          input.tagsId.map((tag) => ({
            projectId: project.id,
            abilitieId: tag,
          })),
        );
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.query.projects.findFirst({
        where: eq(projects.id, input.id),
      });

      await ctx.db
        .delete(projectAbilities)
        .where(eq(projectAbilities.projectId, input.id));
      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
      if (result.picturePath) {
        await deleteFile(result.picturePath);
      }
      await ctx.db.delete(projects).where(eq(projects.id, input.id));
    }),
});
