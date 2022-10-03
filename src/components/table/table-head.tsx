// Packages
import { useState } from 'react';

// Interfaces
import { Column } from '../../common/interfaces';

interface TableHeadProps {
  columns: Column[];
  handleSorting: any;
}

export const TableHead = ({ columns, handleSorting }: TableHeadProps) => {
  // Hooks
  const [sortField, setSortField] = useState<string | undefined>('');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (sortable: boolean | undefined, accessor: string | undefined) => {
    if (!sortable) return;
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }: Column) => {
          const cl = sortable
            ? sortField === accessor && order === 'asc'
              ? 'up'
              : sortField === accessor && order === 'desc'
              ? 'down'
              : 'default'
            : '';
          return (
            <th key={accessor} onClick={() => handleSortingChange(sortable, accessor)} className={cl}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
