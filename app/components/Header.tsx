"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const today = new Date();
  const month = today.toLocaleDateString("sv-SE", { month: "long" });
  const date = today.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const handleLogout = () => {
    toast("Är du säker på att du vill logga ut?", {
      action: {
        label: "Ja, logga ut",
        onClick: async () => {
          try {
            await axios.post("/api/auth/logout");
            toast.success("Du har loggats ut!");
            router.push("/");
          } catch (error) {
            console.error("Logout error:", error);
            toast.error("Kunde inte logga ut. Försök igen.");
          }
        },
      },
      cancel: {
        label: "Avbryt",
        onClick: () => {},
      },
    });
  };

  return (
    <div className="text-center border-b-2 border-gray-800 dark:border-gray-200 pb-6">
      <div className="absolute top-4 left-4">
        <ThemeToggle />
      </div>
      <div className="absolute right-4 top-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleLogout}
          className="cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
      <h1 className="text-3xl md:text-5xl tracking-widest my-12 font-(family-name:--font-playfair) uppercase dark:text-gray-100">
        to do list
      </h1>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">
        <div>
          <span className="font-semibold block sm:inline">Månad: </span>
          <span>{month}</span>
        </div>
        <div>
          <span className="font-semibold block sm:inline">Datum: </span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
