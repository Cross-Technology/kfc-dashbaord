"use client"

import { useMemo } from "react"
import { Column, ColumnDef } from "@tanstack/react-table"
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io"
import { Order } from "@/types/order"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { format } from "date-fns"
import { Clock, CheckCircle2, XCircle, ChefHat, Bike, Store, ShoppingBag, Ellipsis, Eye, SeparatorHorizontal } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const SortableColumnHeader = ({
    column,
    title,
}: {
    column: Column<Order, unknown>
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

const OrderStatusBadge = ({ status }: { status: Order["status"] }) => {
    switch (status) {
        case "pending":
            return <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>
        case "preparing":
            return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20"><ChefHat className="w-3 h-3 mr-1" /> Preparing</Badge>
        case "ready":
            return <Badge variant="outline" className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20"><ShoppingBag className="w-3 h-3 mr-1" /> Ready</Badge>
        case "delivered":
            return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Delivered</Badge>
        case "cancelled":
            return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/20"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>
        default:
            return <Badge variant="secondary">{status}</Badge>
    }
}

const OrderTypeIcon = ({ type }: { type: Order["type"] }) => {
    switch (type) {
        case "pickup":
            return <ShoppingBag className="w-4 h-4 text-muted-foreground" />
    }
}

export const OrderDetailsDialog = ({ order }: { order: Order }) => {
    return (
        <DialogContent className="max-w-2xl">
            <DialogHeader>
                <div className="flex items-center justify-between mt-4">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        Order {order.orderNumber}
                        <OrderStatusBadge status={order.status} />
                    </DialogTitle>
                </div>
                <DialogDescription className="flex items-center gap-2">
                    {format(new Date(order.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                    <span>•</span>
                    <span className="capitalize">{order.type}</span>
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Customer</p>
                        <p className="font-medium">{order.customerName}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                        <div className="flex items-center gap-2">
                            <span className="capitalize">{order.paymentMethod.replace("-", " ")}</span>
                            <Badge variant={order.paymentStatus === "paid" ? "secondary" : "destructive"} className="text-xs">
                                {order.paymentStatus}
                            </Badge>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="font-semibold mb-4">Order Items</h3>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{item.quantity}x</span>
                                        <span>{item.productName}</span>
                                    </div>
                                    {item.notes && (
                                        <p className="text-sm text-muted-foreground mt-1 ml-6">Note: {item.notes}</p>
                                    )}
                                </div>
                                <span className="font-medium">${item.totalPrice.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                        <div className="flex justify-between text-sm text-emerald-600">
                            <span>Discount</span>
                            <span>-${order.discount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t mt-2">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

const OrderActions = ({ order }: { order: Order }) => {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="data-[state=open]:bg-muted text-muted-foreground flex size-8 p-0"
                    >
                        <Ellipsis className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DialogTrigger asChild>
                        <DropdownMenuItem className="cursor-pointer font-medium">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <OrderDetailsDialog order={order} />
        </Dialog>
    )
}

export const useOrderColumns = (): ColumnDef<Order>[] => {

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
                accessorKey: "orderNumber",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title={"Order ID"}
                    />
                ),
                cell: ({ row }) => (
                    <span className="font-mono font-medium text-primary">
                        {row.original.orderNumber}
                    </span>
                )
            },
            {
                accessorKey: "createdAt",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title={"Date & Time"}
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex flex-col" suppressHydrationWarning>
                        <span className="text-sm font-medium">{format(new Date(row.original.createdAt), "MMM dd, yyyy")}</span>
                        <span className="text-xs text-muted-foreground">{format(new Date(row.original.createdAt), "hh:mm a")}</span>
                    </div>
                )
            },
            {
                accessorKey: "customerName",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Customer"
                    />
                ),
                cell: ({ row }) => (
                    <span className="font-medium">{row.original.customerName}</span>
                )
            },
            {
                accessorKey: "type",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Type"
                    />
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-2 capitalize text-sm">
                        <OrderTypeIcon type={row.original.type} />
                        {row.original.type.replace("-", " ")}
                    </div>
                )
            },
            {
                accessorKey: "status",
                enableSorting: true,
                header: ({ column }) => (
                    <SortableColumnHeader
                        column={column}
                        title="Status"
                    />
                ),
                cell: ({ row }) => (
                    <OrderStatusBadge status={row.original.status} />
                )
            },
            {
                accessorKey: "total",
                enableSorting: true,
                header: ({ column }) => (
                    <div className="text-right w-full">
                        <SortableColumnHeader
                            column={column}
                            title="Total"
                        />
                    </div>
                ),
                cell: ({ row }) => (
                    <div className=" font-medium">
                        $ {row.original.total.toFixed(2)}
                    </div>
                )
            },
            {
                accessorKey: "actions",
                header: () => (
                    <div className="text-right w-full">Actions</div>
                ),
                cell: ({ row }) => (
                    <div className="flex justify-end pr-2">
                        <OrderActions order={row.original} />
                    </div>
                ),
            },
        ],
        []
    )
}
