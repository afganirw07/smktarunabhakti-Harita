import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import Card from 'components/card';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Komponen untuk menampilkan list assets
const AssetCardList = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('aset_barang')
        .select('id, nama, desc, img, stock, status, poin')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (assets.length === 0) {
    return <div className="p-4 text-center">Tidak ada data</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-7 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {assets.map((asset) => (
        <NftCard
          key={asset.id}
          id={asset.id}
          title={asset.nama}
          desc={asset.desc}
          image={asset.img}
          stock={asset.stock}
          poin={asset.poin}
          bidders={[]}
          onDataChange={fetchAssets}
        />
      ))}
    </div>
  );
};

const NftCard = (props) => {
  const { id, title, desc, stock, image, poin, extra, onDataChange } = props;
  const [heart, setHeart] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk form edit
  const [editForm, setEditForm] = useState({
    nama: title || '',
    desc: desc || '',
    img: image || '',
    stock: stock || 0,
    poin: poin || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form ketika modal dibuka
  useEffect(() => {
    if (isModalOpen) {
      setEditForm({
        nama: title || '',
        desc: desc || '',
        img: image || '',
        stock: stock || 0,
        poin: poin || 0,
      });
    }
  }, [isModalOpen, title, desc, image, stock]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) || 0 : value,
    }));
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (
      !editForm.nama.trim() ||
      !editForm.desc.trim() ||
      !editForm.img.trim()
    ) {
      toast.error('Semua field harus diisi!');
      return;
    }

    if (editForm.stock < 0) {
      toast.error('Stock tidak boleh negatif!');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase || !id) return;

      const newStatus = editForm.stock === 0 ? 'Tidak Tersedia' : 'Tersedia';

      const { error } = await supabase
        .from('aset_barang')
        .update({
          nama: editForm.nama.trim(),
          desc: editForm.desc.trim(),
          img: editForm.img.trim(),
          stock: editForm.stock,
          poin: editForm.poin,
          status: newStatus,
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Asset berhasil diperbarui!');
      toggleModal();

      setTimeout(() => {
        if (onDataChange) onDataChange();
      }, 1000);
    } catch (error) {
      console.error('Error updating asset:', error);
      toast.error('Gagal memperbarui asset!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!supabase || !id) return;

      const { error } = await supabase
        .from('aset_barang')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Asset berhasil dihapus!');
      setTimeout(() => {
        if (onDataChange) onDataChange();
      }, 3000);
    } catch (error) {
      console.error('Error deleting asset:', error);
      toast.error('Gagal menghapus asset!');
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Card
        extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
      >
        <div className="h-full w-full">
          <div className="relative mb-3 aspect-square w-full">
            <Image
              fill
              className="rounded-xl object-cover"
              src={image}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          {/* Bagian konten yang diperbarui */}
          <div className="mb-3 px-1">
            {/* Mengatur judul dan poin dalam satu baris, sejajar di kedua sisi */}
            <div className="flex items-start justify-between">
              <p className="text-lg font-bold text-navy-700 dark:text-white">
                {title}
              </p>
              <p className="text-sm font-medium text-gray-600">
                <span className="font-bold text-gray-600">{poin} Koin</span>
              </p>
            </div>

            {/* Deskripsi dan Stok ditempatkan di bawah judul */}
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {desc}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              Stok : <span className="font-bold text-gray-600">{stock}</span>
            </p>
          </div>

          <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
            <div className="flex gap-3">
              <button
                className="btn linear rounded-[20px] bg-red-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700"
                onClick={handleDelete}
              >
                Hapus
              </button>
              <button
                className="btn linear rounded-[20px] bg-[#294B29] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] active:bg-[#294B29]"
                onClick={toggleModal}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
          <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-sm dark:bg-gray-700">
            <form onSubmit={handleEditSubmit}>
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-600 md:p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Asset
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 p-4 md:p-5">
                {/* Preview Gambar Current */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Preview Gambar Saat Ini
                  </label>
                  <div className="relative mb-2 h-32 w-full">
                    <Image
                      fill
                      className="rounded-lg object-cover"
                      src={image}
                      alt={title}
                      sizes="400px"
                    />
                  </div>
                </div>

                {/* Input Nama */}
                <div>
                  <label
                    htmlFor="nama"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Asset
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={editForm.nama}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Masukkan nama asset"
                    required
                  />
                </div>

                {/* Input Deskripsi */}
                <div>
                  <label
                    htmlFor="desc"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Deskripsi
                  </label>
                  <textarea
                    id="desc"
                    name="desc"
                    value={editForm.desc}
                    onChange={handleInputChange}
                    rows="3"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Masukkan deskripsi asset"
                    required
                  />
                </div>

                {/* Input URL Gambar */}
                <div>
                  <label
                    htmlFor="img"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    URL Gambar
                  </label>
                  <input
                    type="url"
                    id="img"
                    name="img"
                    value={editForm.img}
                    onChange={handleInputChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                {/* Input Stock */}
                <div>
                  <label
                    htmlFor="stock"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={editForm.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="0"
                    required
                  />
                </div>
                {/* Input Poin */}
                <div>
                  <label
                    htmlFor="poin"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Poin
                  </label>
                  <input
                    type="number"
                    id="poin"
                    name="poin"
                    value={editForm.poin}
                    onChange={handleInputChange}
                    min="0"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="0"
                    required
                  />
                </div>
                {/* Preview Gambar Baru (jika URL berubah) */}
                {editForm.img !== image && editForm.img && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Preview Gambar Baru
                    </label>
                    <div className="relative h-32 w-full">
                      <Image
                        fill
                        className="rounded-lg object-cover"
                        src={editForm.img}
                        alt="Preview"
                        sizes="400px"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#294B29] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#86A789] focus:bg-[#294B29] disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssetCardList;
  