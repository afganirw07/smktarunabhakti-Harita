import React, { useState, useEffect } from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { createClient } from '@supabase/supabase-js';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
    supabaseUrl && supabaseAnonKey
        ? createClient(supabaseUrl, supabaseAnonKey)
        : null;

const columnHelper = createColumnHelper();

function CheckTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = useState([]);
    const [expandedIds, setExpandedIds] = useState(new Set());

    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            if (!supabase) {
                console.error('Supabase client not initialized');
                return;
            }

            // Fetch data from 'reports' table
            const { data: reportsData, error: reportsError } = await supabase
                .from('reports')
                .select('user_id, full_name, phone_number, email, address, total_cost, area_type, created_at');

            if (reportsError) throw reportsError;

            // Fetch data from 'tukar_sampah' table
            const { data: tukarSampahData, error: tukarSampahError } = await supabase
                .from('tukar_sampah')
                .select('id, nama_lengkap, nomor_handphone, email, created_at, massa_sampah_kg, jenis_barang');

            if (tukarSampahError) throw tukarSampahError;

            // Normalize and combine data from both tables
            const normalizedReports = reportsData.map(item => ({
                id: item.user_id,
                jenis_data: 'Laporan', // Add a new field to identify the data source
                nama: item.full_name,
                nomor_handphone: item.phone_number,
                email: item.email,
                created_at: item.created_at,
                total: item.total_cost,
                // Gunakan area_type untuk jenis_barang di tabel reports
                jenis_barang: item.area_type, 
            }));

            const normalizedTukarSampah = tukarSampahData.map(item => ({
                id: item.id,
                jenis_data: 'Tukar Sampah', // Add a new field to identify the data source
                nama: item.nama_lengkap,
                nomor_handphone: item.nomor_handphone,
                email: item.email,
                created_at: item.created_at,
                jenis_barang: item.jenis_barang,
                total: item.massa_sampah_kg,
            }));

            // Combine both datasets and sort by created_at
            const combinedData = [...normalizedReports, ...normalizedTukarSampah].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            setData(combinedData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
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
        columnHelper.accessor('jenis_data', {
            id: 'jenis_data',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Jenis Data</p>
            ),
            cell: (info) => (
                <p className="text-sm font-medium text-navy-700 dark:text-white">
                    {info.getValue()}
                </p>
            ),
        }),
        columnHelper.accessor('nama', {
            id: 'nama',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Nama</p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {info.getValue() || '-'}
                </p>
            ),
        }),
        columnHelper.accessor('nomor_handphone', {
            id: 'nomor_handphone',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Nomor Handphone</p>
            ),
            cell: (info) => (
                <p className="text-sm font-medium text-navy-700 dark:text-white">
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
        // Perbarui `cell` di sini
        columnHelper.accessor('jenis_barang', {
            id: 'jenis_barang',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Jenis</p>
            ),
            cell: (info) => {
                const jenisData = info.row.original.jenis_data;
                const value = info.getValue();

                if (jenisData === 'Laporan') {
                    // Tampilkan area_type jika jenis data adalah Laporan
                    return (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {value || '-'}
                        </p>
                    );
                } else if (jenisData === 'Tukar Sampah') {
                    // Tampilkan jenis_barang jika jenis data adalah Tukar Sampah
                    return (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {value || '-'}
                        </p>
                    );
                }
                return (
                    <p className="text-sm font-medium text-navy-700 dark:text-white">
                        {value || '-'}
                    </p>
                );
            },
        }),
        columnHelper.accessor('total', {
            id: 'total',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Total</p>
            ),
            cell: (info) => {
                const jenisData = info.row.original.jenis_data;
                const value = info.getValue();

                if (jenisData === 'Tukar Sampah') {
                    return (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {value ? `${value} Kg` : '-'}
                        </p>
                    );
                } else if (jenisData === 'Laporan') {
                    return (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {value ? `Rp${value}` : '-'}
                        </p>
                    );
                } else {
                    return (
                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                            {value || '-'}
                        </p>
                    );
                }
            },
        }),
        columnHelper.accessor('created_at', {
            id: 'created_at',
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white">Tanggal</p>
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
                        Data Layanan
                    </div>
                    <CardMenu />
                </header>
                <div className="p-8 text-center">
                    <div className="text-lg text-gray-600 dark:text-white">
                        Tidak ada data layanan
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card extra={'w-full h-full sm:overflow-auto px-6'}>
            <header className="relative flex items-center justify-between pt-4">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    Data Layanan
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