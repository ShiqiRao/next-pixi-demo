import {Rabbit, Fish, TrainTrack, PersonStanding, Github } from "lucide-react"

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
    title: "Bunny",
    url: "/bunny",
    icon: Rabbit,
  },
  {
    title: "Fish Pond",
    url: "/fish-pond",
    icon: Fish,
  },
  {
    title: "Chocho Train",
    url: "/chocho-train",
    icon: TrainTrack,
  },
  {
    title: "Spine Boy",
    url: "/spine-boy",
    icon: PersonStanding,
  },
  {
    title: "Code@Github",
    url: "https://github.com/ShiqiRao/next-pixi-demo",
    icon: Github,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pixi.js Demo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
      </SidebarContent>
    </Sidebar>
  )
}
