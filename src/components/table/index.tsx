import { useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

const columns = [];

export const Table: React.FC = () => {
  const [data, setData] = useState();

  // TODO: docs와 연결해서 설명
  const table = useReactTable({
    data,
    column,
  });
  return <div></div>;
};
