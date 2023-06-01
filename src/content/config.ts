import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      project: z.string(),
      client: z.string(),
      color: z.string().optional(),
      size: z.enum(["small", "medium", "large"]).optional().default("small"),
      cover: image(),
      coverAlt: z.string(),
    }),
});

export const collections = {
  projects: projectsCollection,
};
