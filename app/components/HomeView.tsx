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
        className="backdrop-blur-md p-8 rounded-lg space-y-6 w-full max-w-sm shadow-2xl relative"
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
              <FormLabel className="text-lg text-black">Name</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" className="text-black" {...field} />
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
              <FormLabel className="text-lg text-black">Password</FormLabel>
              <FormControl>
                <Input placeholder="" type="password" className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4 cursor-pointer accent-blue-600"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal cursor-pointer">
                Håll mig inloggad
              </FormLabel>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer text-base"
          disabled={form.formState.isSubmitting}
        >
          Login
        </Button>
        <div className="flex gap-2 justify-center ">
          <p>No account? </p>
          <Link
            href="/registrera"
            className="text-blue-700 cursor-pointer hover:underline"
          >
            Register here
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default HomeView;
