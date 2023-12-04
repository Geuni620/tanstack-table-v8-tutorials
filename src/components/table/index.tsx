import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import DATA from '@/data';

const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        id="header-checkbox"
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
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
  {
    accessorKey: 'task',
    header: 'Task',
    cell: (props) => <p>{props.getValue()}</p>,
    size: 250,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props) => <p>{props.getValue()?.name}</p>,
    size: 100,
  },
  {
    accessorKey: 'due',
    header: 'Due',
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
    size: 100,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    size: 300,
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

export const Table: React.FC = () => {
  const [data, setData] = useState(DATA);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  console.log('row 선택하기', rowSelection);

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {/* Table 헤더 */}
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
  );
};
