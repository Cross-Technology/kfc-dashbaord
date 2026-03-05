import { ROUTES } from "@/utils/routes"
import { ChartPie, GalleryVerticalEnd, Hamburger, Megaphone, Settings, ShoppingBag, Store, TicketPercent, User, Users } from "lucide-react"
import { TbReport } from "react-icons/tb"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "KFC Dashboard",
    description: "KFC Dashboard",
    logo: "/images/logo/kfc-logo.jpeg",
    navItems: [
        {
            title: "Dashboard",
            isActive: true,
            icon: ChartPie,
            url: ROUTES.HOME,
        },

        {
            title: "Menus",
            url: ROUTES.PRODUCTS,
            icon: Hamburger,
        },
        {
            title: "Categories",
            url: ROUTES.CATEGORIES,
            icon: GalleryVerticalEnd,
        },
        {
            title: "Food Order",
            url: ROUTES.ORDERS,
            icon: ShoppingBag,
        },
        {
            title: "Voucher & Promo",
            url: ROUTES.PROMOTION,
            icon: TicketPercent,
        },
        {
            title: "Customers",
            url: ROUTES.CUSTOMERS,
            icon: User,
        },
        {
            title: "Announcement",
            url: ROUTES.ANNOUNCEMENT,
            icon: Megaphone,
        },
        {
            title: "Users Management",
            icon: Users,
            url: "#",
            items: [
                {
                    title: "Users",
                    url: ROUTES.USERS_MANAGEMENT,
                },
                {
                    title: 'Roles',
                    url: ROUTES.ROLES,
                }
            ],
        },

    ],
    reports: [
        {
            title: "Reports",
            url: "#",
            icon: TbReport,
            items: [
                {
                    title: "Sales Summary",
                    url: ROUTES.SETTINGS,
                    icon: Settings,
                },
                {
                    title: "Order Summary",
                    url: ROUTES.SETTINGS,
                    icon: Settings,
                }
            ]
        }
    ],
    navSecondary: [
        {
            title: "Settings",
            url: ROUTES.SETTINGS,
            icon: Settings,
        },
        {
            title: "Profile",
            url: ROUTES.PROFILE,
            icon: User,
        },
    ],
    branches: [
        {
            name: "KFC",
            logo: Store,
            location: "Norodom",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Sovanna",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Siem Reap",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Kampuchea Krom",
        },
        {
            name: "KFC",
            logo: Store,
            location: "CG Mall",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Toul Tompong",
        },
        {
            name: "KFC",
            logo: Store,
            location: "AEON Mall",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Beung Kengkang",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Furi Mall",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Steung Meanchey",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Battambang",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Prince Golden Bay",
        },
        {
            name: "KFC",
            logo: Store,
            location: "Koh Kong",
        }
    ],

}