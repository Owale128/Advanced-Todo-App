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
import { Loader2 } from "lucide-react";

const HomeView = ({ form, onSubmit }: HomeViewProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="backdrop-blur-sm p-8 rounded-lg space-y-6 w-full max-w-sm shadow-2xl relative"
      >
        {form.formState.isSubmitting && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
          </div>
        )}
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
        <Button
          type="submit"
          className="w-full cursor-pointer text-base"
          disabled={form.formState.isSubmitting}
        >
          Logga in
        </Button>
        <div className="flex gap-2 justify-center ">
          <p>Inget konto? </p>
          <Link
            href="/registrera"
            className="text-blue-700 cursor-pointer hover:underline"
          >
            Registrera dig här
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default HomeView;
