"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import RegisterView from "./RegisterView";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await axios.post("/api/auth/register", {
        username: values.username,
        password: values.password,
      });

      if (response.status === 201) {
        toast.success("Konto skapat! Du är nu inloggad.");
        router.push("/todo-app");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Registrering misslyckades. Var vänlig försök igen!");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-10 auth-background">
      <RegisterView form={form} onSubmit={onSubmit} />
    </main>
  );
};

export default Register;
