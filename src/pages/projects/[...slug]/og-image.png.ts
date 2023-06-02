import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import fs from "fs/promises";
import type { ComponentChildren } from "preact";
import { SatoriOptions, default as originalSatori } from "satori";
import sharp from "sharp";

const satori = originalSatori as (
  element: ComponentChildren,
  options: SatoriOptions
) => Promise<string>;

export const get: APIRoute = async ({ params }) => {
  const fontData = await fs.readFile("./public/fonts/neuemontreal-medium.otf");

  const projectEntries = await getCollection("projects");
  const project = projectEntries.find((entry) => entry.slug === params.slug);
  if (!project) return new Response("Not found", { status: 404 });

  const coverImage = (
    await fs.readFile(`./public/${project.data.cover}`)
  ).toString("base64");

  const svg = await satori(
    {
      type: "div",
      props: {
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                lineHeight: "1.4",
                gap: "8px",
                padding: "32px",
              },
              children: [
                {
                  type: "h1",
                  props: {
                    style: {
                      fontSize: "64px",
                      letterSpacing: "-0.02em",
                    },
                    children: project.data.client,
                  },
                },
                {
                  type: "h2",
                  props: {
                    style: {
                      fontSize: "32px",
                    },
                    children: project.data.project,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              tw: "flex shrink overflow-hidden grow bg-gray-300 rounded-2xl h-full",
              children: [
                {
                  type: "img",
                  props: {
                    tw: "h-full object-cover rounded-2xl",
                    src: `data:image/png;base64,${coverImage}`,
                  },
                },
              ],
            },
          },
        ],
        style: {
          gap: "16px",
        },
        tw: "flex overflow-hidden items-center w-full h-full bg-white text-black p-2 m-0 rounded-3xl",
      },
    },
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "neue-montreal",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projectEntries = await getCollection("projects");
  return projectEntries.map((entry) => ({
    params: { slug: entry.slug },
  }));
};
