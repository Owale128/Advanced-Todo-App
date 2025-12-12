"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import HomeView from "./components/HomeView";
import { loginSchema } from "../lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        toast.success("Inloggad!");
        router.push("/todo-app");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Inloggning misslyckades. Var vänlig försök igen!");
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-10 auth-background">
      <HomeView form={form} onSubmit={onSubmit} />
    </main>
  );
}
