"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Building2,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { siteConfig } from "@/config/site"
import NavMain from "./nav-main"
import NavReports from "./nav-reports"
import StoreSwitcher from "./store-switcher"
import NavSecondary from "./nav-secondary"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  branches: [
    {
      name: "KFC",
      logo: Building2,
      location: "Norodom",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Sovanna",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Siem Reap",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Kampuchea Krom",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "CG Mall",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Toul Tompong",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "AEON Mall",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Beung Kengkang",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Furi Mall",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Steung Meanchey",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Battambang",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Prince Golden Bay",
    },
    {
      name: "KFC",
      logo: Building2,
      location: "Koh Kong",
    }
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <StoreSwitcher data={siteConfig.branches} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={siteConfig.navItems} />
        <NavReports data={siteConfig.reports} />
        <NavSecondary data={siteConfig.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
