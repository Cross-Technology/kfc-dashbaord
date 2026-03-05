export type CategoryStatus = "active" | "inactive";

export type Category = {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    parentCategory?: string | null;
    status: CategoryStatus;
    createdAt: Date;
    updatedAt: Date;
};
