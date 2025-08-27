  import React from 'react';
  import Card from 'components/card';
  import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';



  function CheckTable() {

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
                <tr  className="!border-px !border-gray-400">
                    <th
                      className="cursor-pointer min-w-[120px] px-4 py-6 text-start"
                    >
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-white">
                      </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td  className="min-w-[100px] border-white/0 py-3">
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  export default CheckTable;