import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterViewProps } from "../models/RegisterViewProps";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const RegisterView = ({ form, onSubmit }: RegisterViewProps) => {
  return (
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
  );
};

export default RegisterView;
