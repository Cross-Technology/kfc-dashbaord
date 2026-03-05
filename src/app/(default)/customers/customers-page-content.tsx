"use client"

import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useCustomerColumns } from "./columns"
import { customerDatas } from "./data"

const CustomersPageContent = () => {
    const columns = useCustomerColumns()
    return (
        <section className="@container/main flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
                <div className="min-w-80">
                    <h1 className="text-md lg:text-lg font-semibold tracking-tight">
                        Customers
                    </h1>
                    <p className="text-sm">Manage your customers</p>
                </div>
                <Button>
                    <Plus />
                    Add Customer
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={customerDatas}
                pageCount={1}
            />
        </section>
    )
}

export default CustomersPageContent
