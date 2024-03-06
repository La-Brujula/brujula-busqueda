import { z } from 'zod';

export const searchSchema = z.object({
  name: z.string().optional(),
  query: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  schools: z.string().optional(),
  associations: z.string().optional(),
  type: z.enum(['fisica', 'moral']).optional(),
  remote: z.boolean({ coerce: true }).optional(),
  socialService: z.boolean({ coerce: true }).optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  activity: z.string().optional(),
  certifications: z.string().optional(),
  language: z.string().optional(),
});

export type Search = z.infer<typeof searchSchema>;
