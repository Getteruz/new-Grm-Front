"use client";

import { Bot, SquareTerminal } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "crops",
      url: "/crops",
      icon: SquareTerminal,
    },
    {
      title: "products",
      url: "/products",
      icon: SquareTerminal,
    },
    {
      title: "chat-statictik",
      url: "/chat-statictik",
      icon: SquareTerminal,
    },
    {
      title: "users",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "farmers",
          url: "/farmers",
        },
        {
          title: "area-managers",
          url: "/area-managers",
        },
        {
          title: "distributors",
          url: "/distributors",
        },
        {
          title: "sellers",
          url: "/sellers",
        },
        {
          title: "consultants",
          url: "/consultants",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
