import React from "react";
import Card from "components/card";

const General = () => {
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Informasi Admin
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          Ringkasan informasi utama akun admin, termasuk detail kontak dan status pekerjaan.
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Nama Lengkap</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Joe Doe
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Jabatan</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Operasional Admin
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Departemen</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Operasional
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Lokasi Kerja</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Kantor Pusat
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Tanggal Bergabung</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            20 Mei 2023
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Email</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            jdoe@example.com
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
