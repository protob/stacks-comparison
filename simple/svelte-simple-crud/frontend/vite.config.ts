import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(), // Tailwind 4 plugin MUST come first
		sveltekit()
	],
	server: {
		watch: {
			ignored: ['**/server-node-data/**']
		}
	}
});
