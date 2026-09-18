import { LogInIcon, LogOutIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "@/lib/auth-client";

import logo from "../assets/logo.png";
import avatar_icon from "../assets/user-photo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function Header() {
  const { data: session } = useSession();

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "https://barber-pro-umber.vercel.app/",
      errorCallbackURL: "https://barber-pro-umber.vercel.app/",
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
              <Avatar>
                <AvatarImage src={session?.user.image || avatar_icon} />
                <AvatarFallback>
                  {session?.user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            }
          />
          <DropdownMenuContent className="w-full">
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
