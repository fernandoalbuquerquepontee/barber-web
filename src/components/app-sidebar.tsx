import {
  Briefcase,
  CalendarDays,
  Gem,
  LayoutDashboard,
  LogOut,
  Moon,
  ScissorsIcon,
  Sun,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "@/providers/theme-provider";

import logo from "../assets/logo.png";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agendamentos",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Barbeiros",
    url: "/doctors",
    icon: ScissorsIcon,
  },
  {
    title: "Serviços",
    url: "/patients",
    icon: Briefcase,
  },
];

export function AppSidebar() {
  const session = authClient.useSession();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { setTheme } = useTheme();

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <img
          src={logo}
          alt="Logo"
          width={136}
          height={28}
          className="invert dark:invert-0"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={pathname === item.url}>
                    <Link
                      to={item.url}
                      className="flex w-full items-center gap-2"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="font-light">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Outros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="w-full space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton isActive={pathname === "/subscription"}>
                  {/* AJUSTE AQUI: Adicionado 'flex', 'items-center' e 'gap-2' para ficar horizontal */}
                  <Link
                    to="/subscription"
                    className="flex w-full items-center gap-2"
                  >
                    <Gem className="h-4 w-4 shrink-0" />
                    <span className="font-light">Assinatura</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <SidebarMenuButton className="w-full">
                        {/* AJUSTE AQUI: Div com flexbox para alinhar o ícone do Sol e a palavra Tema */}
                        <div className="flex w-full items-center gap-2">
                          <Sun className="h-4 w-4 shrink-0" />
                          <span className="font-light">Tema</span>
                        </div>
                      </SidebarMenuButton>
                    }
                  />

                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      Claro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      Escuro
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg" className="w-full justify-start">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={session.data?.user?.image || ""} />
                      <AvatarFallback>
                        {session.data?.user?.name?.charAt(0).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {session.data?.user?.name || "Utilizador"}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {session.data?.user?.email}
                      </span>
                    </div>
                  </SidebarMenuButton>
                }
              />

              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4 shrink-0" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
