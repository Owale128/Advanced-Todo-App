"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import Link from "next/link";
import { registerSchema } from "@/lib/schemas/auth";

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
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-10">
      <h1 className="text-5xl tracking-wide">Registrera</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border p-8 rounded-lg space-y-6 w-full max-w-sm shadow-2xl bg-white"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Namn</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Lösenord</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl> 
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Bekräfta lösenord</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer text-base">
            Registrera konto
          </Button>
          <div className="flex gap-2 justify-center ">
            <p>Har redan ett konto? </p>
            <Link href="/" className="text-blue-500 underline cursor-pointer">
              Logga in
            </Link>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default Register;
