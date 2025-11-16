import {
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { itemKeys } from './hooks/useItemsApi';
import * as itemApi from './api/itemApi';

// Import page/layout components (we will create/update these next)
import App from './App';
import ItemPage from './pages/ItemPage';
import AboutPage from './pages/AboutPage';
import ItemDetailPage from './pages/ItemDetailPage';

export const queryClient = new QueryClient();

// Create a root route that will serve as the main layout
const rootRoute = createRootRoute({
  component: App,
});

// Create the index route for the main item page
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ItemPage,
  // Loader to pre-fetch data for this route
  loader: () => {
    return queryClient.ensureQueryData({
      queryKey: itemKeys.tree(),
      queryFn: itemApi.getItemTree,
    });
  },
});

// Create the about route
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

// Create the item detail route with type-safe params
const itemDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/items/$categorySlug/$itemSlug',
    loader: ({ params }: { params: { categorySlug: string; itemSlug: string } }) => {
        const { categorySlug, itemSlug } = params;
        return queryClient.ensureQueryData({
            queryKey: itemKeys.detail(categorySlug, itemSlug),
            queryFn: () => itemApi.getItem(categorySlug, itemSlug),
        });
    },
    component: ItemDetailPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, itemDetailRoute]);

// Create the router instance
export const router = createRouter({ routeTree, context: { queryClient } });

// Register the router for typesafety
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}