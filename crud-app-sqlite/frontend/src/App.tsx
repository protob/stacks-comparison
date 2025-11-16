import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import ItemPage from './pages/ItemPage';
import AboutPage from './pages/AboutPage';
import ItemDetailPage from './pages/ItemDetailPage';
import Notifications from './components/common/Notifications';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-text-primary">
      <header className="border-b border-border bg-surface shrink-0">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold text-text-primary hover:text-primary transition-colors">
              Items
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/about'
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<ItemPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/items/:categorySlug/:itemSlug" element={<ItemDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Notifications />
    </div>
  );
}

export default App;