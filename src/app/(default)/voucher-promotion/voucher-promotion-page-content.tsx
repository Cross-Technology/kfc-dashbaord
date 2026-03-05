"use client"

import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { usePromotionColumns } from "./columns"
import { promotionDatas } from "./data"

const VoucherPromotionPageContent = () => {
    const columns = usePromotionColumns()
    return (
        <section className="@container/main flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
                <div className="min-w-80">
                    <h1 className="text-md lg:text-lg font-semibold tracking-tight">
                        Voucher Promotions
                    </h1>
                    <p className="text-sm">Manage discount codes and voucher promotions</p>
                </div>
                <Button>
                    <Plus />
                    Add Promotion
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={promotionDatas}
                pageCount={1}
            />
        </section>
    )
}

export default VoucherPromotionPageContent
