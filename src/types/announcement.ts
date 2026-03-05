export type AnnouncementStatus = "active" | "inactive" | "scheduled" | "expired";

export type AnnouncementTarget = "all" | "customers" | "employees" | "vip";

export type Announcement = {
    id: string;
    title: string;
    content: string;
    target: AnnouncementTarget;
    status: AnnouncementStatus;
    publishDate: Date;
    endDate?: Date;
    author: string;
    isPinned: boolean;
    createdAt: Date;
    updatedAt: Date;
};
