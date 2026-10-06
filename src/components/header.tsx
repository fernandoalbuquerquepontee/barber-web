import { LogInIcon, LogOutIcon, Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { useTheme } from "@/providers/theme-provider";

import logo from "../assets/logo.png";
import avatar_icon from "../assets/user-photo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function Header() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: window.location.origin,
      errorCallbackURL: window.location.origin,
    });
  };

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
      <div>
        <img src={logo} alt="Logo" width={150} height={150} />
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline">
          {session?.user.role === "admin" ? "Administrador" : "Cliente"}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Avatar className="cursor-pointer">
                <AvatarImage src={session?.user.image || avatar_icon} />
                <AvatarFallback>
                  {session?.user?.name?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            }
          />
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
              {theme === "light" ? (
                <Moon className="mr-2 h-4 w-4" />
              ) : (
                <Sun className="mr-2 h-4 w-4" />
              )}
              {theme === "light" ? "Tema Escuro" : "Tema Claro"}
            </DropdownMenuItem>

            {session ? (
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-500"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={handleGoogleLogin}
                className="cursor-pointer"
              >
                <LogInIcon className="mr-2 h-4 w-4" />
                Fazer login com Google
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
