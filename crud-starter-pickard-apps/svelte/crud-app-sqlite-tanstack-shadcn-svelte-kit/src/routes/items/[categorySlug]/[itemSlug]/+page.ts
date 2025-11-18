// /src/routes/items/[categorySlug]/[itemSlug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { categorySlug, itemSlug } = params;

  return {
    categorySlug,
    itemSlug
  };
};