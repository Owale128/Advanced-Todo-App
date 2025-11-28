import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HomeViewProps } from "../models/HomeViewProps";

const HomeView = ({ form, onSubmit }: HomeViewProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="backdrop-blur-sm p-8 rounded-lg space-y-6 w-full max-w-sm shadow-2xl"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Namn</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" className="text-white" {...field} />
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
                <Input placeholder="" type="password" className="text-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer text-base">
          Logga in
        </Button>
        <div className="flex gap-2 justify-center ">
          <p>Inget konto? </p>
          <Link
            href="/registrera"
            className="text-blue-700 underline cursor-pointer"
          >
            Registrera dig här
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default HomeView;
