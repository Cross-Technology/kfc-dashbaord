export type Permission =
    | "view_dashboard"
    | "manage_products"
    | "manage_categories"
    | "manage_customers"
    | "manage_orders"
    | "manage_promotions"
    | "manage_announcements"
    | "manage_users"
    | "manage_roles"
    | "view_reports"
    | "manage_settings";

export type Role = {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
    userCount: number;
    isSystem: boolean;
    createdAt: Date;
    updatedAt: Date;
};
