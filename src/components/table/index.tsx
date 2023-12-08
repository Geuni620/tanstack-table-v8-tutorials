import type { Row as TRow, Table as TTable } from '@tanstack/react-table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import DATA from '@/data';

interface Status {
  id: number;
  name: string;
}

interface ColumnDataProps {
  task: string;
  status: Status;
  due?: Date | null;
  notes: string;
}

interface TableProps {
  table: TTable<ColumnDataProps>;
}

interface RowProps {
  row: TRow<ColumnDataProps>;
}

const PAGE_SIZE_OPTIONS = [
  {
    value: 20,
    label: '20개씩 보기',
  },
  {
    value: 50,
    label: '50개씩 보기',
  },
  {
    value: 100,
    label: '100개씩 보기',
  },
];

export const Table: React.FC = () => {
  const [data] = useState(DATA);

  const [rowSelection, setRowSelection] = useState({});

  const columnHelper = createColumnHelper<ColumnDataProps>();
  const columns = [
    {
      id: 'select',
      header: ({ table }: TableProps) => (
        <input
          id="header-checkbox"
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: RowProps) => (
        <input
          id={`cell-checkbox-${row.id}`}
          type="checkbox"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 50,
    },
    columnHelper.accessor('task', {
      header: 'Task',
      cell: (props) => <p>{props.getValue()}</p>,
      size: 250,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (props) => <p>{props.getValue().name}</p>,
      size: 100,
    }),
    columnHelper.accessor('due', {
      header: 'Due',
      cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
      size: 100,
    }),
    columnHelper.accessor('notes', {
      header: 'Notes',
      size: 300,
      cell: (props) => <p>{props.getValue()}</p>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,

    state: {
      rowSelection,
    },

    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <>
      {/* TableControls */}
      <div>
        <select
          className="my-2 rounded-[4px] border-[1px] py-1 pl-2 pr-9 text-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {PAGE_SIZE_OPTIONS.map(({ value, label }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: `${header.getSize()}px`,
                    border: '1px solid gray',
                    textAlign: 'center',
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    width: `${cell.column.getSize()}px`,
                    border: '1px solid gray',
                    textAlign: 'center',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-[10px] flex items-center justify-center gap-2">
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          {'‹'}
        </button>

        <div className="text-base font-bold">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>

        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          {'›'}
        </button>
      </div>
    </>
  );
};
