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
import { Menu } from "@/types/menu"
import { Ellipsis } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import StatusBadge from "@/components/common/status/status-badge"


const SortableColumnHeader = ({
  column,
  title,
}: {
  column: Column<Menu, unknown>
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

type UseMenuColumnsProps = {
  onDelete?: (menu: Menu) => void
  onEdit?: (menu: Menu) => void
}

const MenuActions = ({
  menu,
  labels,
  onDelete,
  onEdit,
}: {
  menu: Menu
  labels: {
    edit: string
    delete: string
    cancel: string
    confirmDeleteTitle: string
    confirmDeleteMessage: string
  }
  onDelete?: (menu: Menu) => void
  onEdit?: (menu: Menu) => void
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handleConfirmDelete = () => {
    onDelete?.(menu)
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
              onEdit?.(menu)
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

export const useMenuColumns = ({
  onDelete,
  onEdit,
}: UseMenuColumnsProps = {}): ColumnDef<Menu>[] => {

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
            title={"Menu Title"}
          />
        ),
        accessorFn: (row) => `${row.image}`.trim(),
        cell: ({ row }) => {
          const menu = row.original

          return (
            <div className="flex items-center gap-3 min-w-[150px]">
              <Avatar className="h-12 w-12 rounded-md relative overflow-hidden">
                <AvatarImage
                  src={`${menu.image}`}
                  alt={menu.image}
                  className="object-top object-cover select-none pointer-events-none w-full h-full"
                />
                <div className="absolute inset-0 bg-black/5"></div>
                <AvatarFallback>
                  {menu.name?.charAt(0)}
                  {menu.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="block text-sm">
                  {menu.name} {menu.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  8850001000074
                </span>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "category",
        enableSorting: true,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title="Category"
          />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-[150px]">
            <span className="capitalize">{row.original.categoryId.replace(/-/g, " ")}</span>
          </div>
        )
      },
      {
        accessorKey: "Price",
        enableSorting: true,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title="Price"
          />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1 min-w-[150px]">
            <span>${row.original.basePrice.toFixed(2)}</span>
          </div>
        )
      },
      {
        accessorKey: "sizes",
        enableSorting: true,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title="Sizes"
          />
        ),
        cell: ({ row }) => (
          <div className="flex flex-wrap items-center gap-1 min-w-[150px]">
            {row.original?.sizes?.map((size) => (
              <Button key={size.id} variant="outline" size="xs" className=" shadow-none">
                {size.name} - ${size.additionalPrice.toFixed(2)}
              </Button>
            ))}
          </div>
        )
      },
      {
        accessorKey: "addons",
        enableSorting: true,
        header: ({ column }) => (
          <SortableColumnHeader
            column={column}
            title="Add-ons"
          />
        ),
        cell: ({ row }) => (
          <div className="flex flex-wrap items-center gap-1 min-w-[150px]">
            {row.original?.addons?.map((addon) => (
              <Button key={addon.id} variant="outline" size="xs" className=" shadow-none">
                {addon.name} - ${addon.additionalPrice.toFixed(2)}
              </Button>
            ))}
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
            <MenuActions
              menu={row.original}
              labels={{
                edit: "Edit",
                delete: "Delete",
                cancel: "Cancel",
                confirmDeleteTitle: "Confirm Delete",
                confirmDeleteMessage: "Are you sure you want to delete this menu?",
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
