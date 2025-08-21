import React, { useState, useMemo } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  width?: string | number;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  selectable?: boolean;
  selectedRows?: T[];
  onRowSelect?: (selectedRows: T[]) => void;
  onRowClick?: (record: T, index: number) => void;
  className?: string;
  rowKey?: keyof T | ((record: T) => string | number);
}

type SortOrder = 'asc' | 'desc' | null;

interface SortState {
  key: string | null;
  order: SortOrder;
}

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  loadingText = 'Loading...',
  emptyText = 'No data available',
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onRowClick,
  className = '',
  rowKey = 'id'
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState>({ key: null, order: null });

  // Get row key
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] ?? index;
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.order) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue == null) comparison = -1;
      else if (bValue == null) comparison = 1;
      else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else {
        comparison = aValue < bValue ? -1 : 1;
      }

      return sortState.order === 'asc' ? comparison : -comparison;
    });
  }, [data, columns, sortState]);

  // Handle column sort
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prev => {
      if (prev.key === column.key) {
        // Cycle through: asc -> desc -> null
        const nextOrder: SortOrder = prev.order === 'asc' ? 'desc' : prev.order === 'desc' ? null : 'asc';
        return { key: nextOrder ? column.key : null, order: nextOrder };
      } else {
        return { key: column.key, order: 'asc' };
      }
    });
  };

  // Handle row selection
  const handleRowSelect = (record: T, checked: boolean) => {
    if (!onRowSelect) return;

    const recordKey = getRowKey(record, 0);
    let newSelectedRows: T[];

    if (checked) {
      newSelectedRows = [...selectedRows, record];
    } else {
      newSelectedRows = selectedRows.filter(row => getRowKey(row, 0) !== recordKey);
    }

    onRowSelect(newSelectedRows);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (!onRowSelect) return;

    if (checked) {
      onRowSelect([...data]);
    } else {
      onRowSelect([]);
    }
  };

  // Check if row is selected
  const isRowSelected = (record: T): boolean => {
    const recordKey = getRowKey(record, 0);
    return selectedRows.some(row => getRowKey(row, 0) === recordKey);
  };

  // Check if all rows are selected
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length;

  // Render sort icon
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    const isActive = sortState.key === column.key;
    const order = isActive ? sortState.order : null;

    return (
      <span className="ml-1 inline-flex flex-col">
        <svg
          className={`w-3 h-3 ${
            isActive && order === 'asc' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
        </svg>
        <svg
          className={`w-3 h-3 -mt-1 ${
            isActive && order === 'desc' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </span>
    );
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="table-row">
          {selectable && (
            <div className="table-cell">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          )}
          {columns.map((column) => (
            <div key={column.key} className="table-cell">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={`table-container ${className}`}>
      <table className="table">
        <thead className="table-header">
          <tr>
            {selectable && (
              <th className="table-header-cell w-12">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`table-header-cell ${column.sortable ? 'cursor-pointer select-none' : ''}`}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center">
                  {column.title}
                  {renderSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="table-cell text-center py-8">
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {loadingText}
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="table-cell text-center py-8 text-gray-500 dark:text-gray-400">
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((record, index) => (
              <tr
                key={getRowKey(record, index)}
                className={`table-row ${onRowClick ? 'cursor-pointer' : ''} ${
                  isRowSelected(record) ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
                onClick={() => onRowClick?.(record, index)}
              >
                {selectable && (
                  <td className="table-cell">
                    <input
                      type="checkbox"
                      checked={isRowSelected(record)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleRowSelect(record, e.target.checked);
                      }}
                      className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                      aria-label={`Select row ${index + 1}`}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.render
                      ? column.render(record[column.dataIndex], record, index)
                      : String(record[column.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
