import { LogInIcon, LogOutIcon, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { useTheme } from "@/providers/theme-provider";

import logo from "../assets/logo.png";
import { PhoneLogin } from "./phone-login";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="border-w-[0.5px] flex w-full items-center justify-between border-b py-5">
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className="invert dark:invert-0"
        />
      </Link>

      <div className="flex items-center gap-5 text-sm">
        <Link to="/">Barbeiros</Link>
        <Link to="/appointment">Reservar Horário</Link>
        <Link to="/history">Reservar Horário</Link>
      </div>

      <div className="flex items-center">
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session?.user.image || ""} />
                  <AvatarFallback>
                    {session?.user?.name
                      ? session.user.name.substring(0, 2).toUpperCase()
                      : "US"}
                  </AvatarFallback>
                </Avatar>
              }
            ></DropdownMenuTrigger>

            <DropdownMenuContent className="w-full">
              <DropdownMenuItem
                onClick={toggleTheme}
                className="cursor-pointer"
              >
                {theme === "light" ? (
                  <Moon className="mr-2 h-4 w-4" />
                ) : (
                  <Sun className="mr-2 h-4 w-4" />
                )}
                Tema
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {session ? (
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500"
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              ) : (
                <DialogTrigger
                  render={
                    <DropdownMenuItem className="cursor-pointer">
                      <LogInIcon className="mr-2 h-4 w-4" />
                      Fazer Login
                    </DropdownMenuItem>
                  }
                ></DialogTrigger>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <PhoneLogin />
        </Dialog>
      </div>
    </div>
  );
}
