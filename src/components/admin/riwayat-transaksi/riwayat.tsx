import React, { useState, useEffect, useMemo } from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import html2pdf from 'html2pdf.js';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { createClient } from '@supabase/supabase-js';
import 'cally';

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
  const [filterPlan, setFilterPlan] = useState('');
  const [startDate, setStartDate] = useState('');

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchPlan = filterPlan ? row.plan_name === filterPlan : true;

      const matchDate = startDate
        ? new Date(row.created_at).toLocaleDateString() ===
          new Date(startDate).toLocaleDateString()
        : true;

      return matchPlan && matchDate;
    });
  }, [data, filterPlan, startDate]);

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const fetchKaryawan = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { data, error } = await supabase
        .from('transactions')
        .select(
          'id, user_id, nama, order_id, plan_name, amount, status, created_at, end_date',
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
      day: 'numeric',
    });
  };

  const handleDownload = async () => {
    const content = document.getElementById('pdf-content');
    if (content) {
      // Tampilkan konten sementara untuk render
      content.style.display = 'block'; // Create a wrapper to center the content

      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.justifyContent = 'center';
      wrapper.style.alignItems = 'center';
      wrapper.style.width = '100%';
      wrapper.style.height = '100%';
      wrapper.appendChild(content.cloneNode(true));

      const options = {
        margin: [10, 10, 10, 10], // Margin (top, left, bottom, right)
        filename: 'riwayat-transaksi.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: true,
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait',
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
        },
      };

      try {
        await html2pdf()
          .set(options)
          .from(wrapper) // Render from the wrapper
          .toPdf()
          .get('pdf')
          .then(function (pdf) {
            pdf.setProperties({
              title: 'Data Riwayat Transaksi',
              creator: 'Admin',
              author: 'Harita',
            });
          })
          .save();
      } catch (error) {
        console.error('Error generating PDF:', error);
      } finally {
        // Sembunyikan kembali konten
        content.style.display = 'none';
      }
    }
  };

  // Definisikan header kolom untuk tabel PDF
  const pdfHeaders = [
    { key: 'user_id', title: 'User ID' },
    { key: 'nama', title: 'Nama' },
    { key: 'order_id', title: 'Order ID' },
    { key: 'plan_name', title: 'Langganan' },
    { key: 'amount', title: 'Harga' },
    { key: 'status', title: 'Status' },
    { key: 'created_at', title: 'Tanggal Pembayaran' },
    { key: 'end_date', title: 'Tanggal Berakhir' },
  ];

  // Pastikan `columns` yang ini tidak digunakan untuk tabel HTML di bawah, tetapi untuk rendering `useReactTable`
  const columns = [
    columnHelper.accessor('user_id', {
      id: 'user_id',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          User Id
        </p>
      ),
      cell: (info) => {
        return (
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {info.getValue()}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor('nama', {
      id: 'nama',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Nama</p>
      ),
      cell: (info) => {
        return (
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-navy-700 dark:text-white">
              {info.getValue()}
            </p>
          </div>
        );
      },
    }),
    columnHelper.accessor('order_id', {
      id: 'order_id',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Order Id
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('plan_name', {
      id: 'plan_name',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Langganan
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('amount', {
      id: 'amount',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Harga</p>
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
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {info.getValue() || '-'}
        </p>
      ),
    }),
    columnHelper.accessor('created_at', {
      id: 'created_at',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Tanggal Pembayaran
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {formatDate(info.getValue())}
        </p>
      ),
    }),
    columnHelper.accessor('end_date', {
      id: 'end_date',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Tanggal Berakhir
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-medium text-navy-700 dark:text-white">
          {formatDate(info.getValue())}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredData,
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
            Riwayat Transaksi
          </div>
          <CardMenu />
        </header>
        <div className="p-8 text-center">
          <div className="text-lg text-gray-600 dark:text-white">
            Tidak ada data transaksi
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6 pt-4'}>
      <header className="relative flex flex-col gap-y-4 pt-4 md:flex-row md:items-center md:justify-between">
        {/* Left Section: Title + Filters */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-navy-700 dark:text-white">
            Data Riwayat Transaksi
          </h1>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Filter Plan */}
            <div className="relative w-full max-w-xs">
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="peer w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-500 dark:focus:ring-green-500"
              >
                <option value="">Semua Langganan</option>
                <option value="1 Bulan">1 Bulan</option>
                <option value="3 Bulan">3 Bulan</option>
                <option value="6 Bulan">6 Bulan</option>
                <option value="1 Tahun">1 Tahun</option>
              </select>

              {/* Dropdown Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 peer-focus:text-green-600 dark:text-gray-300 dark:peer-focus:text-green-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Date Range */}
            <div className="relative w-full max-w-xs">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="peer w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition-all duration-200 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-green-500 dark:focus:ring-green-500"
              />

              {/* Calendar Icon */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 peer-focus:text-green-600 dark:text-gray-300 dark:peer-focus:text-green-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                ></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Button */}
        <div className="w-full md:w-auto">
          <button
            onClick={handleDownload}
            className="w-full rounded bg-[#294B29] px-4 py-2 font-bold text-white transition-colors hover:bg-green-800 active:bg-[#294B29] md:w-auto"
          >
            Download Data
          </button>
        </div>
      </header>

      <div
        className="scrollbar-thin mt-4 w-full"
        style={{ maxHeight: '500px', overflowY: 'scroll' }}
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

      <div
        id="pdf-content"
        style={{
          display: 'none',
          backgroundColor: '#ffffff',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          color: '#000000',
          minHeight: '100px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            borderBottom: '2px solid #333',
            paddingBottom: '15px',
          }}
        >
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0',
              color: '#333333',
            }}
          >
            Data Riwayat Transaksi
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#666666',
              margin: '5px 0 0 0',
            }}
          >
            Dibuat pada {new Date().toLocaleDateString('id-ID')}
          </p>
        </div>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            backgroundColor: '#ffffff',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              {pdfHeaders.map((header) => (
                <th
                  key={header.key}
                  style={{
                    border: '2px solid #333333',
                    padding: '12px 8px',
                    textAlign: 'left',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333333',
                    backgroundColor: '#e9ecef',
                  }}
                >
                  {header.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                }}
              >
                {pdfHeaders.map((header) => (
                  <td
                    key={header.key}
                    style={{
                      border: '1px solid #333333',
                      padding: '10px 8px',
                      fontSize: '11px',
                      color: '#333333',
                      wordWrap: 'break-word',
                      maxWidth: '150px',
                    }}
                  >
                    {header.key === 'created_at' || header.key === 'end_date'
                      ? formatDate(row[header.key])
                      : row[header.key] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              fontSize: '16px',
              color: '#666666',
            }}
          >
            Tidak ada data transaksi
          </div>
        )}
      </div>
    </Card>
  );
}

export default CheckTable;
