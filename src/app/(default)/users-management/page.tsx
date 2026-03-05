import { Suspense } from "react";
import UsersManagementPageContent from "./users-page-content";


export default function Page() {
    return (
        <Suspense fallback={<div className="p-4">Loading Users...</div>}>
            <UsersManagementPageContent />
        </Suspense>
    )
}