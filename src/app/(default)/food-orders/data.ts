import { Order } from "@/types/order";
import { subMinutes, subHours } from "date-fns";

export const orderDatas: Order[] = [
    {
        id: "ORD-1001",
        orderNumber: "#1001",
        customerName: "John Doe",
        status: "delivered",
        type: "pickup",
        items: [
            { id: "item-1", productName: "Zinger Burger Deal", quantity: 2, unitPrice: 6.50, totalPrice: 13.00 },
            { id: "item-2", productName: "Pepsi Large", quantity: 2, unitPrice: 2.00, totalPrice: 4.00 }
        ],
        subtotal: 17.00,
        discount: 0,
        tax: 1.70,
        total: 18.70,
        paymentMethod: "credit-card",
        paymentStatus: "paid",
        createdAt: subHours(new Date(), 2),
        updatedAt: subHours(new Date(), 1),
    },
    {
        id: "ORD-1002",
        orderNumber: "#1002",
        customerName: "Walk-in Customer",
        status: "ready",
        type: "pickup",
        items: [
            { id: "item-3", productName: "Family Bucket 9pc", quantity: 1, unitPrice: 22.00, totalPrice: 22.00 }
        ],
        subtotal: 22.00,
        discount: 2.00,
        tax: 2.00,
        total: 22.00,
        paymentMethod: "cash",
        paymentStatus: "paid",
        createdAt: subMinutes(new Date(), 45),
        updatedAt: subMinutes(new Date(), 10),
    },
    {
        id: "ORD-1003",
        orderNumber: "#1003",
        customerName: "Jane Smith",
        status: "preparing",
        type: "pickup",
        items: [
            { id: "item-4", productName: "Twister Combo", quantity: 1, unitPrice: 7.50, totalPrice: 7.50 },
            { id: "item-5", productName: "Hot Wings 6pc", quantity: 1, unitPrice: 5.00, totalPrice: 5.00 }
        ],
        subtotal: 12.50,
        discount: 0,
        tax: 1.25,
        total: 13.75,
        paymentMethod: "mobile-payment",
        paymentStatus: "paid",
        createdAt: subMinutes(new Date(), 20),
        updatedAt: subMinutes(new Date(), 5),
    },
    {
        id: "ORD-1004",
        orderNumber: "#1004",
        customerName: "Michael Johnson",
        status: "pending",
        type: "pickup",
        items: [
            { id: "item-6", productName: "Crunchy Chicken 2pc", quantity: 3, unitPrice: 4.50, totalPrice: 13.50, notes: "Extra spicy" }
        ],
        subtotal: 13.50,
        discount: 0,
        tax: 1.35,
        total: 14.85,
        paymentMethod: "cash",
        paymentStatus: "unpaid",
        createdAt: subMinutes(new Date(), 5),
        updatedAt: subMinutes(new Date(), 5),
    },
    {
        id: "ORD-1005",
        orderNumber: "#1005",
        customerName: "Emily Davis",
        status: "cancelled",
        type: "pickup",
        items: [
            { id: "item-7", productName: "Popcorn Chicken Large", quantity: 1, unitPrice: 6.00, totalPrice: 6.00 }
        ],
        subtotal: 6.00,
        discount: 0,
        tax: 0.60,
        total: 6.60,
        paymentMethod: "credit-card",
        paymentStatus: "unpaid",
        createdAt: subHours(new Date(), 3),
        updatedAt: subHours(new Date(), 2),
    },
];
