"use client"

import { useMemo, useState } from "react"
import { Column, ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Role } from "@/types/role"
import { Ellipsis, ShieldAlert, ShieldCheck } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const SortableColumnHeader = ({
    column,
    title,
}: {
    column: Column<Role, unknown>
    title: string
}) => {
    const sorted = column.getIsSorted()

    return (
        <button
            type="button"
            className="flex items-center gap-1 text-left font-medium cursor-pointer"
            onClick={() => column.toggleSorting(sorted === "asc")}
        >
            {title}
            {sorted === "asc" ? <IoIosArrowRoundUp /> : sorted === "desc" ? <IoIosArrowRoundDown /> : null}
        </button>
    )
}

type UseRoleColumnsProps = {
    onDelete?: (role: Role) => void
    onEdit?: (role: Role) => void
}

const RoleActions = ({
    role,
    labels,
    onDelete,
    onEdit,
}: {
    role: Role
    labels: {
        edit: string
        delete: string
        cancel: string
        confirmDeleteTitle: string
        confirmDeleteMessage: string
    }
    onDelete?: (role: Role) => void
    onEdit?: (role: Role) => void
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handleConfirmDelete = () => {
        onDelete?.(role)
        setIsAlertOpen(false)
    }

    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                        size="icon"
                    >
                        <Ellipsis />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                        onSelect={(event) => {
                            event.preventDefault()
                            onEdit?.(role)
                        }}
                    >
                        {labels.edit}
                    </DropdownMenuItem>
                    {!role.isSystem && (
                        <>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    variant="destructive"
                                    onSelect={(event) => event.preventDefault()}
                                >
                                    {labels.delete}
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{labels.confirmDeleteTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {labels.confirmDeleteMessage}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{labels.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmDelete}>
                        {labels.delete}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export const useRoleColumns = ({
    onDelete,
    onEdit,
}: UseRoleColumnsProps = {}): ColumnDef<Role>[] => {

    return useMemo(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="shadow-none"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="shadow-none"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "name",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title={"Role Name"}
                    />
                ),
                cell: ({ row }) => {
                    const role = row.original
                    return (
                        <div className="flex items-center gap-3 min-w-[200px]">
                            {role.isSystem ? <ShieldAlert className="h-5 w-5 text-destructive" /> : <ShieldCheck className="h-5 w-5 text-primary" />}
                            <div className="flex flex-col">
                                <span className="font-medium">{role.name}</span>
                                {role.isSystem && <span className="text-xs text-muted-foreground mr-1">System Default</span>}
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: "description",
                enableSorting: false,
                header: "Description",
                cell: ({ row }) => (
                    <div className="flex min-w-[250px] max-w-[400px] text-sm text-muted-foreground line-clamp-2">
                        {row.original.description}
                    </div>
                )
            },
            {
                accessorKey: "userCount",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Users"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center min-w-[80px]">
                        <Badge variant="secondary" className="font-mono">
                            {row.original.userCount}
                        </Badge>
                    </div>
                )
            },
            {
                accessorKey: "actions",
                header: () => (
                    <div className="text-center">Actions</div>
                ),
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <RoleActions
                            role={row.original}
                            labels={{
                                edit: "Edit Role",
                                delete: "Delete Role",
                                cancel: "Cancel",
                                confirmDeleteTitle: "Delete Role",
                                confirmDeleteMessage: "Are you sure you want to delete this role? Any users assigned to this role will lose their current permissions.",
                            }}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    </div>
                ),
            },
        ],
        [onDelete, onEdit]
    )
}
