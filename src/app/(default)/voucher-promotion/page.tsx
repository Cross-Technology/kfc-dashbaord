import { Suspense } from "react";
import VoucherPromotionPageContent from "./voucher-promotion-page-content";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-4">Loading Promotions...</div>}>
            <VoucherPromotionPageContent />
        </Suspense>
    )
}
