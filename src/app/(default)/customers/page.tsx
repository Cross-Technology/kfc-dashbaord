import { Suspense } from "react";
import CustomersPageContent from "./customers-page-content";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4">Loading Customers...</div>}>
            <CustomersPageContent />
        </Suspense>
    )
}
