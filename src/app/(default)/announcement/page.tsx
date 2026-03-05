import { Suspense } from "react";
import AnnouncementPageContent from "./announcement-page-content";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4">Loading Announcements...</div>}>
            <AnnouncementPageContent />
        </Suspense>
    )
}
