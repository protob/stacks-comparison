import { Router, Route, Navigate } from '@solidjs/router';
import ItemPage from './pages/ItemPage';
import Notifications from './components/common/Notifications';

function App() {
  return (
    <div class="flex flex-col min-h-screen text-neutral-100">
      <header class="border-b border-neutral-800 bg-neutral-900">
        <div class="container px-4 py-4 mx-auto">
          <h1 class="text-xl font-semibold text-neutral-100">Items</h1>
        </div>
      </header>
      <main class="flex-1 w-full">
        <Router>
          <Route path="/" component={ItemPage} />
          <Route path="*" element={<Navigate href="/" />} />
        </Router>
      </main>
      <Notifications />
    </div>
  );
}

export default App;