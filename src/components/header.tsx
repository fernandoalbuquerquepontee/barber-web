import { LogInIcon, LogOutIcon } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";

import logo from "../assets/logo.png";
import avatar_icon from "../assets/user-photo.png";
import { PhoneLogin } from "./phone-login";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Header() {
  const { data: session } = useSession();

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
      <div className="flex items-center">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session?.user.image || avatar_icon} />
                  <AvatarFallback>
                    {session?.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              }
            />
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-500"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="ghost" className="flex items-center gap-3">
                  Fazer login
                  <LogInIcon />
                </Button>
              }
            />
            <PhoneLogin />
          </Dialog>
        )}
      </div>
    </div>
  );
}
