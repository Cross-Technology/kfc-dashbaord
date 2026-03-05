"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { siteConfig } from "@/config/site"

interface Props {
  data: {
    name: string
    logo: React.ElementType
    location: string
  }[]
}

const StoreSwitcher: React.FC<Props> = ({ data }) => {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(data[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground select-none"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <div className="relative overflow-hidden rounded-lg size-8">
                  <Image
                    src={siteConfig.logo}
                    alt="@kfc"
                    width={80}
                    height={80}
                    quality={75}
                    className="object-cover w-full h-full select-none pointer-events-none"
                  />
                </div>
              </div>
              <div className="grid flex-1 text-left text-sm leading-none">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">Branch {activeTeam.location}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Branches
            </DropdownMenuLabel>
            {data.map((item, index) => (
              <DropdownMenuItem
                key={item.location}
                onClick={() => setActiveTeam(item)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <item.logo className="size-3.5 shrink-0" />
                </div>
                {item.location}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default StoreSwitcher

