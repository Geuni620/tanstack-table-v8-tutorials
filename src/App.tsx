import { TableComponents } from '@/components/table';
import { TableCaption } from '@/components/ui/table';

function App() {
  return (
    <div className="h-screen w-screen">
      <div className="mx-auto w-[900px]">
        <TableCaption className="mb-10 text-3xl font-bold">
          Tanstack Table
        </TableCaption>
        <TableComponents />
      </div>
    </div>
  );
}

export default App;
