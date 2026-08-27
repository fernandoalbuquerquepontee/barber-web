import logo from "../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function Header() {
  return (
    <div className="border-w-[0.5px] flex w-full items-center justify-between border-b py-5">
      <div>
        <img src={logo} alt="Logo" width={150} height={150} />
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline">Cliente</Badge>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
