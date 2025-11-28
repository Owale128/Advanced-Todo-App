"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import RegisterView from "./RegisterView";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
    alert("Registrering lyckades! Vänligen logga in.");
    router.push("/");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-10 auth-background">
      <h1 className="text-5xl tracking-wide text-gray-800">Registrera</h1>
      <RegisterView form={form} onSubmit={onSubmit}/>
    </main>
  );
}

export default Register;
