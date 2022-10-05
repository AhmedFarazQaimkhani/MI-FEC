// Hooks
import { useSortableTable } from '../hooks/useSortableHooks';

// Components
import { TableBody } from './table-body';
import { TableHead } from './table-head';

// Interfaces
import { Column } from '../common/interfaces';

interface TableProps {
  data: any;
  columns: Column[];
}
export const Table = ({ data, columns }: TableProps) => {
  // Hooks
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <>
      <table className="table">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};
