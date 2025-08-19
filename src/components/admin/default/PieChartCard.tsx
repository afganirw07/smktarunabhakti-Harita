import React from 'react';
import CardMenu from 'components/card/CardMenu';
import PieChart from 'components/charts/PieChart';
import Card from 'components/card';

// Asumsi data ini berasal dari file 'variables/charts.js'
// Anda harus mengubah data ini di file tersebut
export const newPieChartData = [63, 25, 12]; // Contoh: 63% Organik, 25% Anorganik, 12% B3
export const newPieChartOptions = {
  labels: ['Organik', 'Anorganik', 'B3'],
  colors: ['#294B29', '#86A789', '#D2E3C8'],
  // Opsi lain
};

const PieChartCard = () => {
  return (
    <Card extra="rounded-[20px] p-3">
      <div className="flex flex-row justify-between px-3 pt-2">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Persentase Sampah
          </h4>
        </div>
        <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Bulanan</option>
            <option value="yearly">Tahunan</option>
            <option value="weekly">Mingguan</option>
          </select>
        </div>
      </div>
      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart chartOptions={newPieChartOptions} chartData={newPieChartData} />
      </div>
      <div className="flex flex-row !justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#294B29]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Organik</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {/* Tampilkan persentase dari data */}
            {newPieChartData[0]}%
          </p>
        </div>
        <div className="h-11 w-px bg-gray-300 dark:bg-white/10" />
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#86A789]" />
            <p className="ml-1 text-sm font-normal text-gray-600">Anorganik</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {/* Tampilkan persentase dari data */}
            {newPieChartData[1]}%
          </p>
        </div>
        <div className="h-11 w-px bg-[#D2E3C8] dark:bg-white/10" />
         <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-[#D2E3C8]" />
            <p className="ml-1 text-sm font-normal text-gray-600">B3</p>
          </div>
          <p className="mt-px text-xl font-bold text-navy-700 dark:text-white">
            {/* Tampilkan persentase dari data */}
            {newPieChartData[2]}%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PieChartCard;