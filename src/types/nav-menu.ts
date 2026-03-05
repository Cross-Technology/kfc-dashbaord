import { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"

export type NavMenu = {
    title: string
    url: string
    icon?: LucideIcon | IconType
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
}