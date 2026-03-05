"use client"

import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/utils/routes"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMenuColumns } from "./columns"
import { datas } from "@/app/(default)/products/data"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"


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
                filterComponent={
                    <>
                        <Select >
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent className="shadow-none">
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="apple">Chicken</SelectItem>
                                    <SelectItem value="banana">Burger</SelectItem>
                                    <SelectItem value="banana">Fries</SelectItem>
                                    <SelectItem value="banana">Drink</SelectItem>
                                    <SelectItem value="banana">Dessert</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Filter by statuss" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>status</SelectLabel>
                                    <SelectItem value="apple">Available</SelectItem>
                                    <SelectItem value="banana">Unavailable</SelectItem>
                                    <SelectItem value="banana">Hot Item</SelectItem>
                                    <SelectItem value="banana">New Arrival</SelectItem>
                                    <SelectItem value="banana">On Sale</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </>
                }


            />
        </section>
    )
}

export default ProductsPageContent