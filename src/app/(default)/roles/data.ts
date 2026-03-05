import { Role } from "@/types/role";
import { subDays } from "date-fns";

export const roleDatas: Role[] = [
    {
        id: "ROLE-001",
        name: "Administrator",
        description: "Full access to all features and settings across the entire platform.",
        permissions: [
            "view_dashboard", "manage_products", "manage_categories", "manage_customers",
            "manage_orders", "manage_promotions", "manage_announcements", "manage_users",
            "manage_roles", "view_reports", "manage_settings"
        ],
        userCount: 2,
        isSystem: true,
        createdAt: subDays(new Date(), 365),
        updatedAt: subDays(new Date(), 10),
    },
    {
        id: "ROLE-002",
        name: "Manager",
        description: "Can manage products, customers, and orders. Cannot manage users or system settings.",
        permissions: [
            "view_dashboard", "manage_products", "manage_categories", "manage_customers",
            "manage_orders", "manage_promotions", "view_reports"
        ],
        userCount: 3,
        isSystem: false,
        createdAt: subDays(new Date(), 200),
        updatedAt: subDays(new Date(), 30),
    },
    {
        id: "ROLE-003",
        name: "Staff",
        description: "Can view and update orders and products. Limited access only.",
        permissions: [
            "view_dashboard", "manage_products", "manage_orders"
        ],
        userCount: 5,
        isSystem: false,
        createdAt: subDays(new Date(), 150),
        updatedAt: subDays(new Date(), 45),
    },
    {
        id: "ROLE-004",
        name: "Support",
        description: "Can view customer information and manage announcements for customer communication.",
        permissions: [
            "view_dashboard", "manage_customers", "manage_announcements", "view_reports"
        ],
        userCount: 2,
        isSystem: false,
        createdAt: subDays(new Date(), 100),
        updatedAt: subDays(new Date(), 20),
    },
    {
        id: "ROLE-005",
        name: "Reports Viewer",
        description: "Read-only access to the dashboard and reporting features.",
        permissions: [
            "view_dashboard", "view_reports"
        ],
        userCount: 1,
        isSystem: false,
        createdAt: subDays(new Date(), 60),
        updatedAt: subDays(new Date(), 5),
    },
];
