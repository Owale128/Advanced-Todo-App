"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const today = new Date();
  const formattedDate = today.toLocaleDateString("sv-SE");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        setUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

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
      {username && (
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 uppercase tracking-wider mt-16 md:mt-8 mb-2">
          Inloggad som: <span className="font-semibold text-gray-800 dark:text-gray-200">{username}</span>
        </p>
      )}
      <h1 className="text-3xl md:text-5xl tracking-widest my-8 md:my-12 font-(family-name:--font-playfair) uppercase dark:text-gray-100">
        to do list
      </h1>
      <div className="text-center text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">
        <span className="font-semibold">Datum: </span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default Header;
