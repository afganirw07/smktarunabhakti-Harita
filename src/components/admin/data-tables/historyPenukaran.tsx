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
    useReactTable,
} from '@tanstack/react-table';

const columnHelper = createColumnHelper();

function CheckTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState([]);
    const [expandedIds, setExpandedIds] = useState(new Set());

    useEffect(() => {
        // Fetch employee data when the component mounts
        fetchKaryawan();
    }, []);

    const fetchKaryawan = async () => {
        try {
            if (!supabase) {
                console.error('Supabase client not initialized');
                return;
            }

            // Fetch specific columns for employee data
            const { data, error } = await supabase
                .from('riwayat_aset')
                .select(
                    'id, id_penukaran, nama_penukar, barang_ditukar, stok, created_at',
                );

            if (error) throw error;

            setData(data || []);
        } catch (error) {
            console.error('Error fetching employee data:', error);
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

     const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

    // Define table columns
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
                                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                title={
                                    isExpanded ? 'Sembunyikan ID lengkap' : 'Tampilkan ID lengkap'
                                }
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
        columnHelper.accessor('id_penukaran', {
            id: 'id_penukaran',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Id Penukaran</p>
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
                                className="flex h-6 w-6 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                title={
                                    isExpanded ? 'Sembunyikan ID lengkap' : 'Tampilkan ID lengkap'
                                }
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
        columnHelper.accessor('nama_penukar', {
            id: 'nama_penukar',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Nama Penukar</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.getValue() || '-'}
                </p>
            ),
        }),
        columnHelper.accessor('barang_ditukar', {
            id: 'barang_ditukar',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Jenis Barang</p>
            ),
            cell: (info) => (
                <p className="text-sm font-medium text-navy-700 dark:text-white">
                    {info.getValue() || '-'}
                </p>
            ),
        }),
        columnHelper.accessor('stok', {
            id: 'stok',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">
                    Jumlah
                </p>
            ),
            cell: (info) => (
                <p className="text-sm font-medium text-navy-700 dark:text-white">
                    {info.getValue() || '-'}
                </p>
            ),
        }),
        columnHelper.accessor('created_at', {
            id: 'created_at',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Tanggal Penukaran</p>
            ),
            cell: (info) => (
                <p className="text-sm font-medium text-navy-700 dark:text-white">
                    {formatDate(info.getValue())}
                </p>
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
                <div className="p-8 text-center">
                    <div className="text-lg text-gray-600 dark:text-white">Memuat...</div>
                </div>
            </Card>
        );
    }

    if (data.length === 0) {
        return (
            <Card extra={'w-full h-full sm:overflow-auto px-6'}>
                <header className="relative flex items-center justify-between pt-4">
                    <div className="text-xl font-bold text-navy-700 dark:text-white">
                        Data Penukaran Aset
                    </div>
                    <CardMenu />
                </header>
                <div className="p-8 text-center">
                    <div className="text-lg text-gray-600 dark:text-white">
                        Tidak ada data penukaran
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card extra={'w-full h-full sm:overflow-auto px-6'}>
            <header className="relative flex items-center justify-between pt-4">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    Data Penukaran Aset
                </div>
                <CardMenu />
            </header>
            {/* The wrapper div for the table is now scrollable */}
            <div
                className="scrollbar-thin mt-4 w-full"
                style={{ maxHeight: '300px', overflowY: 'scroll' }}
            >
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
                                <tr
                                    key={row.id}
                                    className="border-b border-gray-100 dark:border-gray-700"
                                >
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
