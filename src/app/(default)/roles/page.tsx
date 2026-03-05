import { Suspense } from "react"
import RolesPageContent from "./roles-page-content"

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4">Loading Roles...</div>}>
            <RolesPageContent />
        </Suspense>
    )
}