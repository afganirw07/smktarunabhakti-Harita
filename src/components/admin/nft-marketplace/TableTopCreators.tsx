import React from 'react';
import Card from 'components/card';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';

type RowObj = {
  id: string;
  item: string;
  user: string;
  quantity: number;
  timestamp: string;
};

const columnHelper = createColumnHelper<RowObj>();

function CheckTable(props: { tableData: RowObj[] }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [data, setData] = React.useState(() => [...tableData]);

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>,
      cell: (info) => <p className="text-sm font-medium text-navy-700 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor('item', {
      id: 'item',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Barang</p>,
      cell: (info) => <p className="text-sm font-medium text-navy-700 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor('user', {
      id: 'user',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Pengguna</p>,
      cell: (info) => <p className="text-sm font-medium text-gray-600 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor('quantity', {
      id: 'quantity',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Kuantitas</p>,
      cell: (info) => <p className="text-sm font-medium text-gray-600 dark:text-white">{info.getValue()}</p>,
    }),
    columnHelper.accessor('timestamp', {
      id: 'timestamp',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Waktu</p>,
      cell: (info) => <p className="text-sm font-medium text-gray-600 dark:text-white">{info.getValue()}</p>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={'w-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">Penukaran Terakhir</div>
        <button className="linear rounded-[20px] bg-[#294B29] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
          Lihat Semua
        </button>
      </header>

      <div className="w-full overflow-x-auto scrollbar-thin">
        <table className="min-w-[7px] w-full table-auto">


          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer min-w-[120px] px-4 py-6 text-start"
                  >
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-white">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.slice(0, 5).map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="min-w-[100px] border-white/0 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CheckTable;