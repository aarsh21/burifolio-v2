import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      order: z.number().optional(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: () =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      link: z.string().url(),
    }),
})

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: () =>
    z.object({
      position: z.string(),
      company: z.string(),
      link: z.string().url(),
      isCurrent: z.boolean(),
      start_date: z.string(),
      end_date: z.string(),
      responsibilities: z.array(z.string()),
    }),
})

// Export all collections
export const collections = {
  blog,
  projects,
  work,
}
