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
import { Promotion } from "@/types/promotion"
import { Ellipsis, Copy, Check } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import StatusBadge from "@/components/common/status/status-badge"
import { format } from "date-fns"

const SortableColumnHeader = ({
    column,
    title,
}: {
    column: Column<Promotion, unknown>
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

type UsePromotionColumnsProps = {
    onDelete?: (promotion: Promotion) => void
    onEdit?: (promotion: Promotion) => void
}

const PromotionActions = ({
    promotion,
    labels,
    onDelete,
    onEdit,
}: {
    promotion: Promotion
    labels: {
        edit: string
        delete: string
        cancel: string
        confirmDeleteTitle: string
        confirmDeleteMessage: string
    }
    onDelete?: (promotion: Promotion) => void
    onEdit?: (promotion: Promotion) => void
}) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const handleConfirmDelete = () => {
        onDelete?.(promotion)
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
                            onEdit?.(promotion)
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

const CodeCell = ({ code }: { code: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } else {
            // Fallback for older browsers or insecure contexts
            console.warn("Clipboard API not available");
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono bg-muted/50 text-emerald-600 border-emerald-600/20 px-2  text-xs uppercase tracking-wider">
                {code}
            </Badge>
            <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Copy code"
            >
                {copied ? <Check className="size-3 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </button>
        </div>
    )
}

export const usePromotionColumns = ({
    onDelete,
    onEdit,
}: UsePromotionColumnsProps = {}): ColumnDef<Promotion>[] => {

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
                id: "code",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title={"Promo Code"}
                    />
                ),
                accessorFn: (row) => `${row.code}`.trim(),
                cell: ({ row }) => <CodeCell code={row.original.code} />
            },
            {
                id: "name",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title={"Promotion"}
                    />
                ),
                accessorFn: (row) => `${row.name}`.trim(),
                cell: ({ row }) => {
                    const promo = row.original
                    return (
                        <div className="flex flex-col min-w-[200px]">
                            <span className="block font-medium">
                                {promo.name}
                            </span>
                            <span className="block text-xs text-muted-foreground max-w-[250px] truncate">
                                {promo.description}
                            </span>
                        </div>
                    )
                },
            },
            {
                accessorKey: "type",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Discount"
                    />
                ),
                cell: ({ row }) => {
                    const promo = row.original;
                    let displayValue = "";

                    if (promo.type === "percentage") {
                        displayValue = `${promo.value}% OFF`;
                    } else if (promo.type === "fixed_amount") {
                        displayValue = `$${promo.value.toFixed(2)} OFF`;
                    } else if (promo.type === "free_shipping") {
                        displayValue = "Free Shipping";
                    }

                    return (
                        <div className="flex flex-col min-w-[120px] text-sm whitespace-normal">
                            <span className="font-medium text-emerald-600 dark:text-emerald-500">{displayValue}</span>
                            {promo.minSpend && (
                                <span className="text-xs text-muted-foreground">Min. spend: ${promo.minSpend.toFixed(2)}</span>
                            )}
                        </div>
                    )
                }
            },
            {
                id: "usage",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Usage"
                    />
                ),
                accessorFn: (row) => row.usedCount,
                cell: ({ row }) => {
                    const promo = row.original;
                    return (
                        <div className="flex items-center min-w-[100px] text-sm">
                            <span className="font-medium">{promo.usedCount}</span>
                            {promo.usageLimit && <span className="text-muted-foreground mr-1">/{promo.usageLimit}</span>}
                        </div>
                    )
                }
            },
            {
                id: "validity",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Validity"
                    />
                ),
                accessorFn: (row) => row.endDate,
                cell: ({ row }) => {
                    const promo = row.original;
                    return (
                        <div className="flex flex-col min-w-[130px] text-xs">
                            <span className="text-muted-foreground">From: {format(promo.startDate, "MMM dd, yyyy")}</span>
                            <span className="font-medium">To: {format(promo.endDate, "MMM dd, yyyy")}</span>
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
                cell: ({ row }) => {
                    // Using our default item status translations but could be extended if needed
                    let statusMapping = row.original.status;
                    return <StatusBadge status={statusMapping} />
                }
            },
            {
                accessorKey: "actions",
                header: () => (
                    <div className="text-center">Actions</div>
                ),
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <PromotionActions
                            promotion={row.original}
                            labels={{
                                edit: "Edit",
                                delete: "Delete",
                                cancel: "Cancel",
                                confirmDeleteTitle: "Confirm Delete",
                                confirmDeleteMessage: "Are you sure you want to delete this promotion?",
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
