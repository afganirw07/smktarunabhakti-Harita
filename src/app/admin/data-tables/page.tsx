'use client';
import CheckTable from 'components/admin/data-tables/CheckTable';
import DevelopmentTable from 'components/admin/data-tables/DevelopmentTable';
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';
import ComplexTable from 'components/admin/data-tables/ComplexTable';
import HistoryCard from 'components/admin/data-tables/historyPenukaran'

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable />
        <CheckTable />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable/>

        <ComplexTable />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <HistoryCard />
      </div>
    </div>
  );
};

export default Tables;
