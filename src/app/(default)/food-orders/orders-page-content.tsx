"use client"

import { useState } from "react"
import { DataTable } from "@/components/table/data-table"
import { Dialog } from "@/components/ui/dialog"
import { OrderDetailsDialog, useOrderColumns } from "./columns"
import { orderDatas } from "./data"
import { Order } from "@/types/order"

const OrdersPageContent = () => {
    const columns = useOrderColumns()
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    return (
        <section className="@container/main flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
                <div className="min-w-80">
                    <h1 className="text-md lg:text-lg font-semibold tracking-tight">
                        Orders
                    </h1>
                    <p className="text-sm">View and manage customer food orders (Read-Only View)</p>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={orderDatas}
                pageCount={1}
                searchKey="orderNumber"
                onRowClick={(row) => setSelectedOrder(row.original)}
            />
            <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                {selectedOrder && <OrderDetailsDialog order={selectedOrder} />}
            </Dialog>
        </section>
    )
}

export default OrdersPageContent
