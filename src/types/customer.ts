export type CustomerStatus = "user-active" | "user-inactive";

export type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    totalOrders: number;
    totalSpent: number;
    status: CustomerStatus;
    createdAt: Date;
    updatedAt: Date;
};
