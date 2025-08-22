import React from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { AiOutlineClockCircle } from 'react-icons/ai';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

// Mengubah tipe data untuk mencerminkan kolom-kolom baru
type RowObj = {
  id: number;
  nama: string;
  role: string;
  divisi: string;
  tugas: number;
  status: 'active' | 'nonactive' | 'in-progress';
};

function ColumnsTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  let defaultData = tableData;
  const columnHelper = createColumnHelper<RowObj>();

  const columns = [
    // Kolom 1: ID
    columnHelper.accessor('id', {
      id: 'id',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // Kolom 2: Nama
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Nama</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // Kolom 3: Role
    columnHelper.accessor('role', {
      id: 'role',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Role</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // Kolom 4: Divisi
    columnHelper.accessor('divisi', {
      id: 'divisi',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Divisi</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // Kolom 5: Tugas
    columnHelper.accessor('tugas', {
      id: 'tugas',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Tugas</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    // Kolom 6: Status
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Status</p>
      ),
      cell: (info) => (
        <div className="flex items-center gap-2">
          {info.getValue() === 'active' ? (
            <BsCheckCircleFill className="text-green-500" />
          ) : info.getValue() === 'in-progress' ? (
            <AiOutlineClockCircle className="text-yellow-500" />
          ) : (
            <BsXCircleFill className="text-red-500" />
          )}
          <p className="text-sm font-medium text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
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
    <Card extra={'w-full pb-10 p-4 h-full'}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Data Karyawan
        </div>
        <CardMenu />
      </header>

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
                          className="min-w-[150px] border-white/0 py-3 px-7 "
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

export default ColumnsTable;