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
import { Category } from "@/types/category"
import { Ellipsis } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StatusBadge from "@/components/common/status/status-badge"

const SortableColumnHeader = ({
    column,
    title,
}: {
    column: Column<Category, unknown>
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

type UseCategoryColumnsProps = {
    onDelete?: (category: Category) => void
    onEdit?: (category: Category) => void
}

const CategoryActions = ({
    category,
    labels,
    onDelete,
    onEdit,
}: {
    category: Category
    labels: {
        edit: string
        delete: string
        cancel: string
        confirmDeleteTitle: string
        confirmDeleteMessage: string
    }
    onDelete?: (category: Category) => void
    onEdit?: (category: Category) => void
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handleConfirmDelete = () => {
        onDelete?.(category)
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
                            onEdit?.(category)
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

export const useCategoryColumns = ({
    onDelete,
    onEdit,
}: UseCategoryColumnsProps = {}): ColumnDef<Category>[] => {

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
                        title={"Category Name"}
                    />
                ),
                accessorFn: (row) => `${row.name}`.trim(),
                cell: ({ row }) => {
                    const category = row.original

                    return (
                        <div className="flex items-center gap-3 min-w-[150px]">
                            <Avatar className="h-12 w-12 rounded-md relative overflow-hidden">
                                <AvatarImage
                                    src={`${category.thumbnail}`}
                                    alt={category.name}
                                    className="object-top object-cover select-none pointer-events-none w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/5"></div>
                                <AvatarFallback>
                                    {category.name?.charAt(0)}
                                    {category.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="block text-sm">
                                    {category.name}
                                </span>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: "description",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Description"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center min-w-[200px] text-sm text-muted-foreground whitespace-normal">
                        {row.original.description}
                    </div>
                )
            },
            {
                accessorKey: "parentCategory",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Parent Category"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-3 min-w-[150px]">
                        <span className="capitalize">{row.original.parentCategory ? row.original.parentCategory.replace(/-/g, " ") : "-"}</span>
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
                        <CategoryActions
                            category={row.original}
                            labels={{
                                edit: "Edit",
                                delete: "Delete",
                                cancel: "Cancel",
                                confirmDeleteTitle: "Confirm Delete",
                                confirmDeleteMessage: "Are you sure you want to delete this category?",
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
