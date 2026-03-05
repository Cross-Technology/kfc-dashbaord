import { Suspense } from "react";
import ProductsPageContent from "./prodcuts-page-content";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4">Loading Products...</div>}>
            <ProductsPageContent />
        </Suspense>
    )
}