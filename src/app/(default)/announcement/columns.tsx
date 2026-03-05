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
import { Announcement } from "@/types/announcement"
import { Ellipsis, Pin, MessageSquareText } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import StatusBadge from "@/components/common/status/status-badge"
import { format } from "date-fns"

const SortableColumnHeader = ({
    column,
    title,
}: {
    column: Column<Announcement, unknown>
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

type UseAnnouncementColumnsProps = {
    onDelete?: (announcement: Announcement) => void
    onEdit?: (announcement: Announcement) => void
    onTogglePin?: (announcement: Announcement) => void
}

const AnnouncementActions = ({
    item,
    labels,
    onDelete,
    onEdit,
    onTogglePin,
}: {
    item: Announcement
    labels: {
        edit: string
        delete: string
        cancel: string
        confirmDeleteTitle: string
        confirmDeleteMessage: string
    }
    onDelete?: (announcement: Announcement) => void
    onEdit?: (announcement: Announcement) => void
    onTogglePin?: (announcement: Announcement) => void
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handleConfirmDelete = () => {
        onDelete?.(item)
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
                            onEdit?.(item)
                        }}
                    >
                        {labels.edit}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={(event) => {
                            event.preventDefault()
                            onTogglePin?.(item)
                        }}
                    >
                        {item.isPinned ? "Unpin" : "Pin message"}
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

const TargetBadge = ({ target }: { target: string }) => {
    const label = target === "all" ? "Everyone" : target;
    return (
        <Badge variant="outline" className="capitalize text-xs text-muted-foreground font-normal bg-muted/30">
            {label}
        </Badge>
    );
};

export const useAnnouncementColumns = ({
    onDelete,
    onEdit,
    onTogglePin,
}: UseAnnouncementColumnsProps = {}): ColumnDef<Announcement>[] => {

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
                id: "title",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title={"Announcement Message"}
                    />
                ),
                accessorFn: (row) => `${row.title}`.trim(),
                cell: ({ row }) => {
                    const item = row.original;
                    return (
                        <div className="flex items-start gap-3 min-w-[280px]">
                            <div className="mt-1 flex-shrink-0 text-muted-foreground/60 hidden sm:block">
                                <MessageSquareText className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col gap-1 max-w-[400px]">
                                <div className="flex items-center gap-2">
                                    <span className="block font-medium text-sm leading-tight">
                                        {item.title}
                                    </span>
                                    {item.isPinned && <Pin className="h-3 w-3 text-orange-500 fill-orange-500 flex-shrink-0 rotate-45" />}
                                </div>
                                <span className="block text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {item.content}
                                </span>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: "target",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Target Audience"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex min-w-[100px]">
                        <TargetBadge target={row.original.target} />
                    </div>
                )
            },
            {
                id: "publishDate",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Published"
                    />
                ),
                accessorFn: (row) => row.publishDate,
                cell: ({ row }) => (
                    <div className="flex flex-col min-w-[100px] text-sm">
                        <span suppressHydrationWarning>{format(row.original.publishDate, "MMM dd, yyyy")}</span>
                        <span className="text-xs text-muted-foreground">by {row.original.author}</span>
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
                    <StatusBadge status={`ann-${row.original.status}`} />
                )
            },
            {
                accessorKey: "actions",
                header: () => (
                    <div className="text-center">Actions</div>
                ),
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <AnnouncementActions
                            item={row.original}
                            labels={{
                                edit: "Edit",
                                delete: "Delete",
                                cancel: "Cancel",
                                confirmDeleteTitle: "Delete Announcement",
                                confirmDeleteMessage: "Are you sure you want to delete this announcement? This action cannot be undone.",
                            }}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onTogglePin={onTogglePin}
                        />
                    </div>
                ),
            },
        ],
        [onDelete, onEdit, onTogglePin]
    )
}
