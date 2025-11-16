import { createRouter, createWebHistory } from 'vue-router'
// The layout is now handled by App.vue, not the router

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: '<div class="flex flex-col items-center justify-center h-full p-8 text-center"><h1 class="text-2xl font-bold">Welcome to DAM</h1><p class="text-neutral-400">Select a workspace from the sidebar to begin.</p></div>' }
    },
    {
      path: '/workspace/:path(.*)*',
      name: 'workspace',
      component: () => import('@/views/workspace/SunoFolderView.vue'),
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('@/views/library/CollectionsView.vue')
    },
    {
      path: '/library/collections/:id',
      name: 'library-collection',
      component: () => import('@/views/library/CollectionView.vue')
    },
    {
      path: '/library/projects/:id',
      name: 'library-project',
      component: () => import('@/views/library/ProjectView.vue')
    },
    {
      path: '/library/ideas/:id',
      name: 'library-idea',
      component: () => import('@/views/library/IdeaView.vue')
    },
    {
      path: '/library/songs/:id',
      name: 'library-song',
      component: () => import('@/views/library/SongView.vue')
    },
    { path: '/search', name: 'search', component: { template: '<div class="p-8"><h1>Search</h1></div>' } },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
  ]
})

export default router