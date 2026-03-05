export type UserRole = "admin" | "manager" | "staff" | "support";

export type UserStatus = "active" | "inactive" | "pending";

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    avatar?: string;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
};
