// frontends/solid/src/AppRoutes.tsx
import { Route } from '@solidjs/router';

const TestPage = () => {
  return (
    <div class="p-8">
      <h1 class="text-2xl font-bold text-neutral-100">Hello from Test Page</h1>
      <p class="text-neutral-400 mt-4">SolidJS Todo App is working!</p>
    </div>
  );
};

const NotFound = () => {
  return (
    <div class="p-8">
      <h1 class="text-xl font-bold text-red-400">Page Not Found</h1>
      <p class="text-neutral-400 mt-2">The page you're looking for doesn't exist.</p>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Route path="/" component={TestPage} />
      <Route path="*" component={NotFound} />
    </>
  );
};

export default AppRoutes;
