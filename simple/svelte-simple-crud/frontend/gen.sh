#!/bin/bash
# setup-svelte5-project.sh
set -e

echo "🚀 Creating Svelte 5 project structure..."

# Create directory structure
mkdir -p src/lib/{api,components/{common,items,layout},stores,types,utils}
mkdir -p src/routes
mkdir -p static

# Create main files
touch src/app.html
touch src/app.css
touch src/routes/+layout.svelte
touch src/routes/+page.svelte

# Create types
touch src/lib/types/index.ts

# Create utils
touch src/lib/utils/{helpers.ts,slugify.ts,schema-helpers.ts}

# Create API files
touch src/lib/api/{apiClient.ts,itemApi.ts}

# Create stores
touch src/lib/stores/{itemStore.ts,uiStore.ts}

# Create component files
touch src/lib/components/common/{Button.svelte,Icon.svelte,Modal.svelte,FormField.svelte,TagInput.svelte,SchemaField.svelte,SchemaForm.svelte,ConfirmDeleteModal.svelte,Notifications.svelte}
touch src/lib/components/items/{ItemForm.svelte,ItemItem.svelte}
touch src/lib/components/layout/{AppSidebar.svelte,FilterBar.svelte}

# Create config files
touch {vite.config.ts,svelte.config.js,tsconfig.json,tailwind.config.js}

# Create package.json
cat > package.json << 'EOF'
{
  "name": "svelte5-todo-app",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^3.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^3.0.0",
    "@tailwindcss/vite": "4.0.0-alpha.13",
    "autoprefixer": "^10.4.19",
    "svelte": "^5.0.0",
    "svelte-check": "^3.6.0",
    "tailwindcss": "4.0.0-alpha.13",
    "tslib": "^2.4.1",
    "typescript": "^5.0.0",
    "vite": "^5.0.3"
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "lucide-svelte": "^0.379.0",
    "zod": "^3.23.8"
  }
}
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "📁 Created directory structure:"
echo "├── src/"
echo "│   ├── lib/"
echo "│   │   ├── api/"
echo "│   │   ├── components/"
echo "│   │   │   ├── common/"
echo "│   │   │   ├── items/"
echo "│   │   │   └── layout/"
echo "│   │   ├── stores/"
echo "│   │   ├── types/"
echo "│   │   └── utils/"
echo "│   ├── routes/"
echo "│   ├── app.html"
echo "│   └── app.css"
echo "├── static/"
echo "└── config files"
echo ""
echo "🎯 Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Copy the provided code files to their respective locations"
echo "3. Start development: npm run dev"