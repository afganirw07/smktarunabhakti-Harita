import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import Card from 'components/card';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';

// Inisialisasi Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Komponen untuk menampilkan list status
const StatusCardList = () => {
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatusData();
  }, []);

  const fetchStatusData = async () => {
    try {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('status_aset')
        .select('id, nama, img, total, beroperasi, perawatan');

      if (error) throw error;

      setStatusData(data || []);
    } catch (error) {
      console.error('Error fetching status data:', error);
      toast.error('Gagal memuat data status!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (statusData.length === 0) {
    return <div className="text-center p-4">Tidak ada data status</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-7">
      {statusData.map((status, index) => (
        <StatusCard
          key={status.id}
          id={status.id}
          title={status.nama}
          total={status.total}
          beroperasi={status.beroperasi}
          perawatan={status.perawatan}
          image={status.img}
          onDataChange={fetchStatusData}
        />
      ))}
    </div>
  );
};

const StatusCard = (props) => {
  const { id, title, total, beroperasi, perawatan, image, extra, onDataChange } = props;
  const [heart, setHeart] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk form edit status
  const [editForm, setEditForm] = useState({
    total: total || 0,
    beroperasi: beroperasi || 0,
    perawatan: perawatan || 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form ketika modal dibuka
  useEffect(() => {
    if (isModalOpen) {
      setEditForm({
        total: total || 0,
        beroperasi: beroperasi || 0,
        perawatan: perawatan || 0
      });
    }
  }, [isModalOpen, total, beroperasi, perawatan]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    
    setEditForm(prev => ({
      ...prev,
      [name]: numValue
    }));
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi: total harus sama dengan beroperasi + perawatan
    const totalCalculated = editForm.beroperasi + editForm.perawatan;
    if (editForm.total !== totalCalculated) {
      toast.error(`Total kendaraan (${editForm.total}) harus sama dengan Beroperasi + Perawatan (${totalCalculated})`);
      return;
    }

    // Validasi: tidak boleh negatif
    if (editForm.total < 0 || editForm.beroperasi < 0 || editForm.perawatan < 0) {
      toast.error('Semua nilai tidak boleh negatif!');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!supabase || !id) return;

      const { error } = await supabase
        .from('status_aset')
        .update({
          total: editForm.total,
          beroperasi: editForm.beroperasi,
          perawatan: editForm.perawatan
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Status kendaraan berhasil diperbarui!');
      toggleModal();
      
      setTimeout(() => {
        if (onDataChange) onDataChange();
      }, 1000);

    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Gagal memperbarui status kendaraan!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hitung kendaraan yang tidak beroperasi dan tidak dalam perawatan (idle)
  const idle = total - beroperasi - perawatan;

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Card
        extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
      >
        <div className="h-full w-full">
          <div className="relative w-full aspect-video mb-3">
            <Image
              fill
              className="rounded-xl object-cover"
              src={image}
              alt={title}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
            <div className="mb-2 w-full">
              <p className="text-lg font-bold text-navy-700 dark:text-white mb-3">
                {title}
              </p>
              
              {/* Status Summary */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total :</span>
                  <span className="text-sm font-bold text-navy-700">{total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600"> Beroperasi:</span>
                  <span className="text-sm font-bold text-green-700">{beroperasi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-orange-600">Perawatan:</span>
                  <span className="text-sm font-bold text-orange-700">{perawatan}</span>
                </div>
                {idle > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Idle/Standby:</span>
                    <span className="text-sm font-bold text-gray-600">{idle}</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500" 
                    style={{width: `${(beroperasi/total)*100}%`}}
                  ></div>
                  <div 
                    className="bg-orange-500" 
                    style={{width: `${(perawatan/total)*100}%`}}
                  ></div>
                  {idle > 0 && (
                    <div 
                      className="bg-gray-400" 
                      style={{width: `${(idle/total)*100}%`}}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
            <button
              className="btn linear rounded-[20px] bg-[#294B29] px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-[#86A789] active:bg-[#294B29] w-full"
              onClick={toggleModal}
            >
              Edit Status
            </button>
          </div>
        </div>
      </Card>

      {/* Modal Edit Status */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
          <div className="max-h-full w-full max-w-md rounded-lg bg-white shadow-sm dark:bg-gray-700 overflow-y-auto">
            <form onSubmit={handleEditSubmit}>
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-600 md:p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Status
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                {/* Current Status Display */}
                <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Status Saat Ini:</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    <strong>Total:</strong> {total}, <strong>Beroperasi:</strong> {beroperasi}, <strong>Perawatan:</strong> {perawatan}
                  </p>
                </div>

                {/* Input Total  */}
                <div>
                  <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Total 
                  </label>
                  <input
                    type="number"
                    id="total"
                    name="total"
                    value={editForm.total}
                    onChange={handleInputChange}
                    min="0"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="0"
                    required
                  />
                </div>

                {/* Input  Beroperasi */}
                <div>
                  <label htmlFor="beroperasi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Sedang Beroperasi
                  </label>
                  <input
                    type="number"
                    id="beroperasi"
                    name="beroperasi"
                    value={editForm.beroperasi}
                    onChange={handleInputChange}
                    min="0"
                    max={editForm.total}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="0"
                    required
                  />
                </div>

                {/* Input Kendaraan Perawatan */}
                <div>
                  <label htmlFor="perawatan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Perlu Perawatan
                  </label>
                  <input
                    type="number"
                    id="perawatan"
                    name="perawatan"
                    value={editForm.perawatan}
                    onChange={handleInputChange}
                    min="0"
                    max={editForm.total}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="0"
                    required
                  />
                </div>

                {/* Live Preview */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">Preview:</h4>
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    <strong>Total :</strong> {editForm.total}, 
                    <strong> Sedang Beroperasi:</strong> {editForm.beroperasi}, 
                    <strong> Perlu Perawatan:</strong> {editForm.perawatan}
                  </p>
                  {editForm.total !== (editForm.beroperasi + editForm.perawatan) && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      ⚠️ Total harus sama dengan Beroperasi + Perawatan ({editForm.beroperasi + editForm.perawatan})
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 rounded-b border-t border-gray-200 p-4 dark:border-gray-600 md:p-5">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#294B29] hover:bg-[#86A789] focus:bg-[#294B29] px-5 py-2.5 text-center text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || editForm.total !== (editForm.beroperasi + editForm.perawatan)}
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export { StatusCardList, StatusCard };
export default StatusCardList;