import { createRouter, createWebHistory } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import { itemKeys } from '@/composables/useItemsApi';
import { getItemTree, getItemBySlug } from '@/api/itemApi';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/ItemPage.vue'),
      meta: {
        loader: async () => {
          const queryClient = useQueryClient();
          await queryClient.ensureQueryData({
            queryKey: itemKeys.tree(),
            queryFn: getItemTree,
          });
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
    },
    {
      path: '/items/:categorySlug/:itemSlug',
      name: 'item-detail',
      component: () => import('@/pages/ItemDetailPage.vue'),
      meta: {
        loader: async (to: any) => {
          const queryClient = useQueryClient();
          await queryClient.ensureQueryData({
            queryKey: itemKeys.detail(to.params.categorySlug, to.params.itemSlug),
            queryFn: () => getItemBySlug(to.params.categorySlug, to.params.itemSlug),
          });
        },
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.loader) {
    try {
      await (to.meta.loader as Function)(to);
    } catch (error) {
      console.error('Route loader error:', error);
    }
  }
  next();
});

export default router;