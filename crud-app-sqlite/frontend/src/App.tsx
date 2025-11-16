import { Routes, Route, Navigate } from 'react-router';
import ItemPage from './pages/ItemPage';
import Notifications from './components/common/Notifications';

function App() {
  return (
    <div className="flex flex-col min-h-screen text-neutral-100">
      <header className="border-b border-neutral-800 bg-neutral-900">
        <div className="container px-4 py-4 mx-auto">
          <h1 className="text-xl font-semibold text-neutral-100">Items</h1>
        </div>
      </header>
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<ItemPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Notifications />
    </div>
  );
}

export default App;