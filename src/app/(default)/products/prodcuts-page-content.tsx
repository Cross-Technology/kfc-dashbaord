"use client"

import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/utils/routes"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMenuColumns } from "./columns"
import { datas } from "@/app/(default)/products/data"


const ProductsPageContent = () => {
    const router = useRouter()
    const goToProductForm = () => {
        router.push(ROUTES.PRODUCT_FORM)
    }
    const columns = useMenuColumns()
    return (
        <section className="@container/main flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
                <div className="min-w-80">
                    <h1 className="text-md lg:text-lg font-semibold tracking-tight">
                        Menus
                    </h1>
                    <p className="text-sm">Manage your menus</p>
                </div>
                <Button onClick={goToProductForm}>
                    <Plus />
                    Add Menu
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={datas}
                pageCount={1}


            />
        </section>
    )
}

export default ProductsPageContent