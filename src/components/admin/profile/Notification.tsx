import React from "react";
import Card from "components/card";
import CardMenu from "components/card/CardMenu";
import Switch from "components/switch";

function Notification() {
  return (
    <Card extra={"w-full h-full p-3"}>
      <div className="relative mb-3 flex items-center justify-between pt-1">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Pengaturan Notifikasi
        </h4>
        <CardMenu />
      </div>
      <div className="flex flex-col">
        {/* Notifikasi Inventaris & Logistik */}
        <div className="mt-3 flex items-center gap-3">
          <Switch id="notif-stok-kritis" />
          <label
            htmlFor="notif-stok-kritis"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Peringatan stok barang di bawah batas minimum
          </label>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Switch id="notif-stok-habis" />
          <label
            htmlFor="notif-stok-habis"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Notifikasi jika stok barang habis
          </label>
        </div>

        {/* Notifikasi Pengguna & Akun */}
        <div className="mt-4 flex items-center gap-3">
          <Switch id="notif-akun-baru" />
          <label
            htmlFor="notif-akun-baru"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Notifikasi pendaftaran akun baru
          </label>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Switch id="notif-ubah-profil" />
          <label
            htmlFor="notif-ubah-profil"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Notifikasi perubahan profil karyawan
          </label>
        </div>

        {/* Notifikasi Operasional & Tugas */}
        <div className="mt-4 flex items-center gap-3">
          <Switch id="notif-tugas-selesai" />
          <label
            htmlFor="notif-tugas-selesai"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Notifikasi jika ada tugas yang selesai
          </label>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Switch id="notif-tugas-terlambat" />
          <label
            htmlFor="notif-tugas-terlambat"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Peringatan tugas yang melewati tenggat waktu
          </label>
        </div>

        {/* Notifikasi Aktivitas & Keamanan */}
        <div className="mt-4 flex items-center gap-3">
          <Switch id="notif-login-mencurigakan" />
          <label
            htmlFor="notif-login-mencurigakan"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Peringatan login mencurigakan
          </label>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Switch id="notif-perubahan-sistem" />
          <label
            htmlFor="notif-perubahan-sistem"
            className="text-base font-medium text-navy-700 dark:text-white"
          >
            Pemberitahuan perubahan penting pada sistem
          </label>
        </div>
      </div>
    </Card>
  );
}

export default Notification;