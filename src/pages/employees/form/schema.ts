import { z } from "zod";

export const UserSchema = z.object({
  firstName: z.string(),
  filial: z.string(),
  avatar: z.string(),
  lastName: z.string(),
  fatherName: z.string(),
  hired: z.date(),
  position: z.object({
    value: z.string(),
    label: z.string(),
  }),
  from: z.string(),
  to: z.string().optional(),
  phone: z.string(),
  login: z.string(),
  salary: z.number(),
});

export type UserFormType = z.infer<typeof UserSchema>;
