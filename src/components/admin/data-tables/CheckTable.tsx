import React, { useState, useEffect } from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { createClient } from '@supabase/supabase-js';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

function CheckTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState([]);
  const [expandedIds, setExpandedIds] = useState(new Set());

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, city, address, phone, plan, status');

      if (error) throw error;

      // Gabungkan first_name dan last_name menjadi username untuk keperluan tabel
      const processedData = (data || []).map(user => ({
        ...user,
        username: `${user.first_name || ''} ${user.last_name || ''}`.trim()
      }));

      setData(processedData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleIdExpansion = (id) => {
    const newExpandedIds = new Set(expandedIds);
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id);
    } else {
      newExpandedIds.add(id);
    }
    setExpandedIds(newExpandedIds);
  };

  const truncateId = (id) => {
    if (typeof id !== 'string') return id;
    return id.length > 5 ? `${id.substring(0, 5)}...` : id;
  };

  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">ID</p>
      ),
      cell: (info) => {
        const id = info.getValue();
        const isExpanded = expandedIds.has(id);
        
        return (
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {isExpanded ? id : truncateId(id)}
            </p>
            {id && id.length > 5 && (
              <button
                onClick={() => toggleIdExpansion(id)}
                className="flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                title={isExpanded ? "Hide full ID" : "Show full ID"}
              >
                <span className="text-xs font-bold">
                  {isExpanded ? '−' : '⋯'}
                </span>
              </button>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('username', {
      id: 'username',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Nama
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Email</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('city', {
      id: 'city',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Kota</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('address', {
      id: 'address',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Alamat
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('phone', {
      id: 'phone',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Nomor</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('plan', {
      id: 'plan',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Plan</p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Status
        </p>
      ),
      cell: (info) => (
        <div className="flex h-full min-h-[24px] items-center justify-start">
          <span className="flex items-center gap-2">
            {info.getValue() === 'yes' ? (
              <BsCheckCircleFill className="text-base text-green-500" />
            ) : (
              <BsXCircleFill className="text-base text-red-500" />
            )}
            <span className="text-sm font-medium text-navy-700 dark:text-white">
              {info.getValue()
                ? info.getValue().charAt(0).toUpperCase() +
                  info.getValue().slice(1)
                : 'Inactive'}
            </span>
          </span>
        </div>
      ),
    }),
  ];

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

  if (loading) {
    return (
      <Card extra={'w-full h-full sm:overflow-auto px-6'}>
        <div className="text-center p-8">
          <div className="text-lg text-gray-600 dark:text-white">Loading...</div>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card extra={'w-full h-full sm:overflow-auto px-6'}>
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Data Pengguna
          </div>
          <CardMenu />
        </header>
        <div className="text-center p-8">
          <div className="text-lg text-gray-600 dark:text-white">Tidak ada data pengguna</div>
        </div>
      </Card>
    );
  }

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Data Pengguna ({data.length} pengguna)
        </div>
        <CardMenu />
      </header>
      <div className="scrollbar-thin w-full overflow-x-auto mt-4">
        <table className="w-full min-w-[700px] table-auto">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 px-5 pb-2 pt-4 text-start dark:border-white/30"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: ' ↑',
                          desc: ' ↓',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id} className="border-b border-gray-100 dark:border-gray-700">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="min-w-[150px] px-5 py-3 text-left align-middle"
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

export default CheckTable;