"use client"
import {  Home, Users,File,NotepadText, SquareCheckBig, TicketIcon, UsersRound, Moon, } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Leads",
    url: "/dashboard/leads",
    icon: NotepadText,
  },
  {
    title: "Deals",
    url: "/dashboard/deals",
    icon: File,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: SquareCheckBig,
  },
  {
    title: "Tickets",
    url: "/dashboard/tickets",
    icon: TicketIcon,
  },
  {
    title: "Teams",
    url: "/dashboard/teams",
    icon: UsersRound,
  },
 
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  
  return (
    <Sidebar className="custom-sidebar-hover">
      <SidebarContent className="h-full justify-between flex flex-col">

        <SidebarGroup>
          <SidebarGroupLabel>CR Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={pathname === item.url}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Dark Mode</span>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => {
                        setTheme(checked ? "dark" : "light");
                      }}
                    />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}
