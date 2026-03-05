export type PromotionStatus = "active" | "inactive" | "expired" | "scheduled";

export type PromotionType = "percentage" | "fixed_amount" | "free_shipping";

export type Promotion = {
    id: string;
    code: string;
    name: string;
    description: string;
    type: PromotionType;
    value: number; // Percentage (e.g., 20) or fixed amount (e.g., 5.00)
    minSpend?: number;
    maxDiscount?: number;
    usageLimit?: number; // Total number of times the code can be used
    usedCount: number; // Number of times it has already been used
    startDate: Date;
    endDate: Date;
    status: PromotionStatus;
    createdAt: Date;
    updatedAt: Date;
};
