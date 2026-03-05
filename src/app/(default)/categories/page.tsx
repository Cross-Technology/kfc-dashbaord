import { Suspense } from "react";
import CategoriesPageContent from "./categories-page-content";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4">Loading Categories...</div>}>
            <CategoriesPageContent />
        </Suspense>
    )
}