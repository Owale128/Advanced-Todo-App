import z from "zod";
import { UseFormReturn } from "react-hook-form";
import { loginSchema } from "@/lib/schemas/auth";

export interface HomeViewProps {
  form: UseFormReturn<z.infer<typeof loginSchema>>;
  onSubmit: (values: z.infer<typeof loginSchema>) => void;
}