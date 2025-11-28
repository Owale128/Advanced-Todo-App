"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import HomeView from "./components/HomeView";
import { loginSchema } from "../lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    router.push("/todo-app");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-10 auth-background">
      <h1 className="text-5xl tracking-wide text-gray-800">Login</h1>
      <HomeView form={form} onSubmit={onSubmit} />
    </main>
  );
}
