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
import { User } from "@/types/user"
import { Ellipsis, ShieldAlert, ShieldCheck, Shield, LifeBuoy } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StatusBadge from "@/components/common/status/status-badge"
import { formatDistanceToNow } from "date-fns"

const SortableColumnHeader = ({
    column,
    title,
}: {
    column: Column<User, unknown>
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

type UseUserColumnsProps = {
    onDelete?: (user: User) => void
    onEdit?: (user: User) => void
}

const UserActions = ({
    user,
    labels,
    onDelete,
    onEdit,
}: {
    user: User
    labels: {
        edit: string
        delete: string
        cancel: string
        confirmDeleteTitle: string
        confirmDeleteMessage: string
    }
    onDelete?: (user: User) => void
    onEdit?: (user: User) => void
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handleConfirmDelete = () => {
        onDelete?.(user)
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
                            onEdit?.(user)
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

const RoleIcon = ({ role }: { role: string }) => {
    switch (role) {
        case "admin": return <ShieldAlert className="h-4 w-4 text-red-500" />;
        case "manager": return <ShieldCheck className="h-4 w-4 text-blue-500" />;
        case "support": return <LifeBuoy className="h-4 w-4 text-green-500" />;
        default: return <Shield className="h-4 w-4 text-slate-500" />;
    }
}

export const useUserColumns = ({
    onDelete,
    onEdit,
}: UseUserColumnsProps = {}): ColumnDef<User>[] => {

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
                        title={"User Info"}
                    />
                ),
                accessorFn: (row) => `${row.name}`.trim(),
                cell: ({ row }) => {
                    const user = row.original
                    return (
                        <div className="flex items-center gap-3 min-w-[200px]">
                            <Avatar className="h-9 w-9 relative overflow-hidden">
                                <AvatarImage
                                    src={`${user.avatar || ''}`}
                                    alt={user.name}
                                    className="object-cover select-none pointer-events-none w-full h-full"
                                />
                                <AvatarFallback className="bg-primary/10 text-primary uppercase text-xs font-semibold">
                                    {user.name.charAt(0)}
                                    {user.name.split(" ")[1]?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="block font-medium leading-tight">
                                    {user.name}
                                </span>
                                <span className="block text-xs text-muted-foreground mt-0.5">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: "role",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Role"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-2 min-w-[100px] text-sm capitalize">
                        <RoleIcon role={row.original.role} />
                        {row.original.role}
                    </div>
                )
            },
            {
                accessorKey: "lastLogin",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Last Login"
                    />
                ),
                cell: ({ row }) => {
                    const date = new Date(row.original.lastLogin);
                    const isNever = date.getFullYear() === 1970;
                    return (
                        <div className="flex items-center min-w-[120px] text-sm text-muted-foreground" suppressHydrationWarning>
                            {isNever ? "Never" : formatDistanceToNow(date, { addSuffix: true })}
                        </div>
                    )
                }
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
                    <StatusBadge status={`user-${row.original.status}`} />
                )
            },
            {
                accessorKey: "actions",
                header: () => (
                    <div className="text-center">Actions</div>
                ),
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <UserActions
                            user={row.original}
                            labels={{
                                edit: "Edit User",
                                delete: "Delete User",
                                cancel: "Cancel",
                                confirmDeleteTitle: "Delete User Account",
                                confirmDeleteMessage: "Are you sure you want to delete this user? All their access will be revoked immediately.",
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
