"use client";

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React, { useState } from "react";
import { customers } from "@/constants/customers";
import { Button } from "@/components/ui/button";
import { EyeIcon, TrashIcon, PencilIcon } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,  
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  joined: string;
  status: string;
};

const CustomerTable = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [open, setOpen] = React.useState(false) 
  const [customer, setCustomer] = React.useState<Customer | null>(null)

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "id",
      header: "Sl.no",
      enableColumnFilter: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      enableColumnFilter: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableColumnFilter: true,
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "joined",
      header: "Joined",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleView(row.original)}>
            <EyeIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleView = (customer: Customer) => {
    setOpen(true);    
    setCustomer(customer);  
  };

  const table = useReactTable({
    data: customers as unknown as Customer[],
    columns: columns as ColumnDef<Customer>[],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const nameFilter =
    (table.getColumn("name")?.getFilterValue() as string) || "";
  const emailFilter =
    (table.getColumn("email")?.getFilterValue() as string) || "";

  
  const joinedFilter =
    (table.getColumn("joined")?.getFilterValue() as string) || "";
  const statusFilter =
    (table.getColumn("status")?.getFilterValue() as string) || "";

  return (
    
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Customers</h1>

      <div className="flex gap-4 mb-4">
        <input
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="border px-3 py-2 rounded w-64 text-sm"
        />
        <input
          placeholder="Filter by email"
          value={emailFilter}
          onChange={(e) =>
            table.getColumn("email")?.setFilterValue(e.target.value)
          }
          className="border px-3 py-2 rounded w-64 text-sm"
        />
      
        <input
          placeholder="Filter by joined"
          value={joinedFilter}
          onChange={(e) =>
            table.getColumn("joined")?.setFilterValue(e.target.value)
          }
          className="border px-3 py-2 rounded w-64 text-sm"
        />
        <input
          placeholder="Filter by status"
          value={statusFilter}
          onChange={(e) =>
            table.getColumn("status")?.setFilterValue(e.target.value)
          }
          className="border px-3 py-2 rounded w-64 text-sm"
        />
      </div>

      <div className="border rounded-lg shadow overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-neutral-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
{
  open && (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>View Customer</DialogTitle>
        <DialogDescription>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input disabled type="text" value={customer?.name} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email</Label>
              <Input disabled type="text" value={customer?.email} />
            </div>  
            <div className="flex flex-col gap-2">
              <Label>Phone</Label>
              <Input disabled type="text" value={customer?.phone} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Joined</Label>
              <Input disabled type="text" value={customer?.joined} />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Input disabled type="text" value={customer?.status} />
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

    </div>
  );
};

export default CustomerTable;
