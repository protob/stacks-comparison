import { Routes, Route, Navigate } from 'react-router-dom';
import ItemPage from './pages/ItemPage';
import Notifications from './components/common/Notifications';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary">
      <header className="border-b border-border bg-surface">
        <div className="container px-4 py-4 mx-auto">
          <h1 className="text-xl font-semibold text-text-primary">Items</h1>
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