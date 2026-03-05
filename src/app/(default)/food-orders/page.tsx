import { Suspense } from "react"
import OrdersPageContent from "./orders-page-content"

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4">Loading Orders...</div>}>
            <OrdersPageContent />
        </Suspense>
    )
}
