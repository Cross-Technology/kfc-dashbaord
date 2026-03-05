export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled";
export type OrderType = "pickup";
export type PaymentMethod = "cash" | "credit-card" | "mobile-payment";

export type OrderItem = {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    notes?: string;
};

export type Order = {
    id: string;
    orderNumber: string;
    customerName: string;
    status: OrderStatus;
    type: OrderType;
    items: OrderItem[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    paymentMethod: PaymentMethod;
    paymentStatus: "paid" | "unpaid";
    createdAt: Date;
    updatedAt: Date;
};
