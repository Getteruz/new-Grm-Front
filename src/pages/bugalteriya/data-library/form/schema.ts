import { z } from "zod";

import { requiredStringField } from "@/utils/schemaHelper";

export const CropSchema = z.object({
  title: requiredStringField(),
  collection: z.string().optional(),
});

export type CropFormType = z.infer<typeof CropSchema>;
