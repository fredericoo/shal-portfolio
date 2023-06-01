import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    color: z.string().optional(),
    size: z.enum(["small", "medium", "large"]).optional().default("small"),
    image: z.string(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
