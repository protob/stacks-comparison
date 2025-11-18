// src/routes/+page.ts
import type { PageLoad } from './$types';
import * as itemApi from '$lib/api/itemApi';
import type { ItemTree } from '$lib/types';

export const load: PageLoad = async () => {
	try {
		const itemTree: ItemTree = await itemApi.getItemTree();

		return {
			itemTree,
			initialLoadError: null
		};
	} catch (error) {
		console.error('Failed to load item tree in +page.ts:', error);
		return {
			itemTree: {} as ItemTree,
			initialLoadError:
				error instanceof Error ? error.message : 'Failed to load items'
		};
	}
};