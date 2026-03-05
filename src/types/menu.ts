export type MenuStatus = "on_sale" | "new_arrival" | "hot_item" | "available" | "out_of_stock";

export type MenuOption = {
    id: string;
    name: string;
    additionalPrice: number;
    isDefault?: boolean;
};

export type ProductVariation = {
    id: string;
    name: string;
    additionalPrice: number;
    isDefault?: boolean;
};

export type Menu = {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    categoryId: string;
    image: string;
    status: MenuStatus;
    sizes?: MenuOption[];
    flavors?: MenuOption[];
    addons?: MenuOption[];

    createdAt: Date;
    updatedAt: Date;
};