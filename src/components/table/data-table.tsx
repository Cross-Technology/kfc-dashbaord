"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  Table as TanstackTable,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Columns2 } from "lucide-react"

type FilterComponent<TData> =
  | React.ReactNode
  | ((table: TanstackTable<TData>) => React.ReactNode)

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageCount?: number
  pagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>
  sorting?: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  searchValue?: string
  searchKey?: string
  onSearchChange?: (value: string) => void
  isLoading?: boolean
  totalItems?: number
  pageSizeOptions?: number[]
  filterComponent?: FilterComponent<TData>
  renderExpandedRow?: (row: Row<TData>) => React.ReactNode
  onRowClick?: (row: Row<TData>) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  searchValue,
  searchKey = "name",
  onSearchChange,
  isLoading,
  totalItems,
  pageSizeOptions = [10, 20, 30, 40, 50],
  filterComponent,
  renderExpandedRow,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize pagination state from URL params
  const initialPageIndex = searchParams.get("pageIndex") ? Number(searchParams.get("pageIndex")) : 0;
  const initialPageSize = searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : 10;

  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  })
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const resolvedSorting = sorting ?? internalSorting
  const handleSortingChange = onSortingChange ?? setInternalSorting
  const resolvedPagination = pagination ?? internalPagination

  // Sync internal pagination changes to the URL
  const handlePaginationChange = React.useCallback(
    (updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState)) => {
      const newPagination =
        typeof updaterOrValue === "function"
          ? updaterOrValue(resolvedPagination)
          : updaterOrValue;

      // Update state
      if (onPaginationChange) {
        onPaginationChange(newPagination);
      } else {
        setInternalPagination(newPagination);
      }

      // Update URL
      const params = new URLSearchParams(searchParams.toString());
      params.set("pageIndex", String(newPagination.pageIndex));
      params.set("pageSize", String(newPagination.pageSize));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [onPaginationChange, resolvedPagination, router, pathname, searchParams]
  );
  const manualPagination = Boolean(onPaginationChange)
  const manualSorting = Boolean(onSortingChange)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: handleSortingChange,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: renderExpandedRow ? () => true : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    onExpandedChange: setExpanded,
    manualPagination,
    manualSorting,
    pageCount: manualPagination ? pageCount : undefined,
    state: {
      sorting: resolvedSorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: resolvedPagination,
      expanded,
    },
  })

  const searchInputValue =
    searchValue ?? ((table.getColumn(searchKey)?.getFilterValue() as string) ?? "")
  const totalRowCount = totalItems ?? table.getFilteredRowModel().rows.length
  const selectedRowCount = table.getFilteredSelectedRowModel().rows.length
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount() || 1
  const resolvedPageSizeOptions = React.useMemo(() => {
    const uniqueOptions = Array.from(new Set(pageSizeOptions)).filter(
      (option) => option > 0
    )
    if (uniqueOptions.includes(resolvedPagination.pageSize)) {
      return uniqueOptions
    }
    return [...uniqueOptions, resolvedPagination.pageSize].sort(
      (a, b) => a - b
    )
  }, [pageSizeOptions, resolvedPagination.pageSize])

  const renderedFilterComponent = React.useMemo(() => {
    if (!filterComponent) return null
    return typeof filterComponent === "function"
      ? filterComponent(table)
      : filterComponent
  }, [filterComponent, table])

  return (
    <div className="flex flex-col gap-5 py-5">
      <div className="flex items-center gap-3 ">
        <Input
          placeholder="Search..."
          value={searchInputValue}
          onChange={(event) => {
            if (onSearchChange) {
              onSearchChange(event.target.value)
              return
            }

            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }}

          className="max-w-sm shadow-none"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shadow-none">
              <Columns2 /> Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {renderedFilterComponent}
      </div>
      <div className="relative overflow-auto">
        <div className="min-h-[65vh] overflow-hidden rounded-md border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan} className="py-3.5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-14">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => onRowClick && onRowClick(row)}
                      className={onRowClick ? "cursor-pointer" : ""}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="whitespace-normal">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {renderExpandedRow && row.getIsExpanded() && (
                      <TableRow className='hover:bg-transparent'>
                        <TableCell
                          colSpan={table.getVisibleLeafColumns().length}
                          className="p-0"
                        >
                          {renderExpandedRow(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {selectedRowCount} of {totalRowCount} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20 shadow-none" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {resolvedPageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex shadow-none"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8 shadow-none"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8 shadow-none"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>

  )
}
