import React from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import Progress from 'components/progress';
import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

// Mengubah tipe data untuk mencerminkan skema inventaris barang
type RowObj = {
  id: number;
  namaBarang: string;
  status: 'tersedia' | 'habis' | 'dipesan';
  jumlah: number;
  tanggalUpdate: string;
};

const columnHelper = createColumnHelper<RowObj>();

export default function ComplexTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columns = [
    // Kolom 0: ID
    columnHelper.accessor('id', {
      id: 'id',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // Kolom 1: Nama Barang
    columnHelper.accessor('namaBarang', {
      id: 'namaBarang',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Nama Barang</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // Kolom 2: Status
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Status
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          {info.getValue() === 'tersedia' ? (
            <MdCheckCircle className="me-1 text-green-500 dark:text-green-300" />
          ) : info.getValue() === 'dipesan' ? (
            <MdOutlineError className="me-1 text-amber-500 dark:text-amber-300" />
          ) : info.getValue() === 'habis' ? (
            <MdCancel className="me-1 text-red-500 dark:text-red-300" />
          ) : null}
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1)}
          </p>
        </div>
      ),
    }),
    // Kolom 3: Jumlah
    columnHelper.accessor('jumlah', {
      id: 'jumlah',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Jumlah</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // Kolom 4: Tanggal Update
    columnHelper.accessor('tanggalUpdate', {
      id: 'tanggalUpdate',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Tanggal Update</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ]; 

  const [data, setData] = React.useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={'w-full h-full px-6 pb-6 sm:overflow-x-auto'}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Inventaris Barang
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 overflow-x-scroll scrollbar-thin">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 pb-2 px-4 pt-4 text-start dark:border-white/30"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3 "
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}