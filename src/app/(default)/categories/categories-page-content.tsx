"use client"

import CategoryModal from "@/components/common/modal/category-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import { DataTable } from "@/components/table/data-table"
import { useCategoryColumns } from "./columns"
import { categoryDatas } from "./data"
const CategoriesPageContent = () => {
    const [open, setOpen] = useState(false)
    const columns = useCategoryColumns()
    return (
        <section className="@container/main flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
                <div className="min-w-80">
                    <h1 className="text-md lg:text-lg font-semibold tracking-tight">
                        Categories
                    </h1>
                    <p className="text-sm">Manage your menu categories</p>
                </div>
                <Button onClick={() => setOpen(true)}>
                    <Plus />
                    Add Category
                </Button>
            </div>
            <CategoryModal open={open} onOpenChange={setOpen} />
            <DataTable
                columns={columns}
                data={categoryDatas}
                pageCount={1}
            />
        </section>
    )
}

export default CategoriesPageContent