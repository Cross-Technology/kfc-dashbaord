"use client"

import { DataTable } from "@/components/table/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRoleColumns } from "./columns"
import { roleDatas } from "./data"

const RolesPageContent = () => {
    const columns = useRoleColumns()
    return (
        <section className="@container/main flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between gap-5">
                <div className="min-w-80">
                    <h1 className="text-md lg:text-lg font-semibold tracking-tight">
                        Roles & Permissions
                    </h1>
                    <p className="text-sm">Manage access control and user roles</p>
                </div>
                <Button>
                    <Plus />
                    Create Role
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={roleDatas}
                pageCount={1}
            />
        </section>
    )
}

export default RolesPageContent