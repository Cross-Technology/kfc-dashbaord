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
import { Customer } from "@/types/customer"
import { Ellipsis } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StatusBadge from "@/components/common/status/status-badge"

const SortableColumnHeader = ({
    column,
    title,
}: {
    column: Column<Customer, unknown>
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

type UseCustomerColumnsProps = {
    onDelete?: (customer: Customer) => void
    onEdit?: (customer: Customer) => void
}

const CustomerActions = ({
    customer,
    labels,
    onDelete,
    onEdit,
}: {
    customer: Customer
    labels: {
        edit: string
        delete: string
        cancel: string
        confirmDeleteTitle: string
        confirmDeleteMessage: string
    }
    onDelete?: (customer: Customer) => void
    onEdit?: (customer: Customer) => void
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handleConfirmDelete = () => {
        onDelete?.(customer)
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
                            onEdit?.(customer)
                        }}
                    >
                        {labels.edit}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                            variant="destructive"
                            onSelect={(event) => event.preventDefault()}
                        >
                            {labels.delete}
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
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

export const useCustomerColumns = ({
    onDelete,
    onEdit,
}: UseCustomerColumnsProps = {}): ColumnDef<Customer>[] => {

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
                id: "name",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title={"Customer"}
                    />
                ),
                accessorFn: (row) => `${row.name}`.trim(),
                cell: ({ row }) => {
                    const customer = row.original

                    return (
                        <div className="flex items-center gap-3 min-w-[200px]">
                            <Avatar className="h-10 w-10 relative overflow-hidden">
                                <AvatarImage
                                    src={`${customer.avatar}`}
                                    alt={customer.name}
                                    className="object-cover select-none pointer-events-none w-full h-full"
                                />
                                <AvatarFallback>
                                    {customer.name?.charAt(0)}
                                    {customer.name?.split(" ")[1]?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="block font-medium">
                                    {customer.name}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                    {customer.email}
                                </span>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: "phone",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Phone Number"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center min-w-[150px] text-sm whitespace-normal">
                        {row.original.phone}
                    </div>
                )
            },
            {
                accessorKey: "totalOrders",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Total Orders"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center min-w-[100px] text-sm">
                        {row.original.totalOrders}
                    </div>
                )
            },
            {
                accessorKey: "totalSpent",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Total Spent"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center min-w-[100px] text-sm">
                        ${row.original.totalSpent.toFixed(2)}
                    </div>
                )
            },
            {
                accessorKey: "createdAt",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Register Date"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center min-w-[100px] text-sm">
                        {new Date(row.original.createdAt).toLocaleDateString()}
                    </div>
                )
            },
            {
                accessorKey: "Status",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Status"
                    />
                ),
                cell: ({ row }) => (
                    <StatusBadge status={row.original.status} />
                )
            },
            {
                accessorKey: "actions",
                header: () => (
                    <div className="text-center">Actions</div>
                ),
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <CustomerActions
                            customer={row.original}
                            labels={{
                                edit: "Edit",
                                delete: "Delete",
                                cancel: "Cancel",
                                confirmDeleteTitle: "Confirm Delete",
                                confirmDeleteMessage: "Are you sure you want to delete this customer?",
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
