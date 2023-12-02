import { useState } from 'react';
import { Table } from '@/components/table';

function App() {
  return (
    <div className="h-screen w-screen">
      <div className="mx-auto w-[800px]">
        <h3 className="mb-10 text-3xl font-bold">Tanstack Table</h3>
        <Table />
      </div>
    </div>
  );
}

export default App;
