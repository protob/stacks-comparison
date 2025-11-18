<!-- /src/routes/items/[categorySlug]/[itemSlug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import ItemDetailPage from 'lib/pages/ItemDetailPage.svelte';

  let { data }: { data: PageData } = $props();
</script>

<ItemDetailPage
  categorySlug={data.categorySlug}
  itemSlug={data.itemSlug}
/>