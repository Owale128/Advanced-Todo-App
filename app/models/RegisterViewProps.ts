import z from "zod";
import { UseFormReturn } from "react-hook-form";
import { registerSchema } from "@/lib/schemas/auth";

export interface RegisterViewProps {
  form: UseFormReturn<z.infer<typeof registerSchema>>;
  onSubmit: (values: z.infer<typeof registerSchema>) => void;
}