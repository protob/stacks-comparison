#!/bin/bash
# setup-react-project.sh
set -e

echo "\U0001f680 Creating React project structure in current directory..."

# Create directory structure
mkdir -p src/{components/{common,items,layout},stores,hooks,api,types,utils,pages}
mkdir -p public

# Create main files
touch src/{main.tsx,App.tsx,index.css}
touch src/types/index.ts
touch src/utils/{helpers.ts,slugify.ts,schema-helpers.ts}
touch src/api/{apiClient.ts,itemApi.ts}
touch src/stores/{useItemStore.ts,useUiStore.ts}
touch src/hooks/useItemFilters.ts
touch src/pages/ItemPage.tsx

# Create component files
touch src/components/common/{Button.tsx,Icon.tsx,Modal.tsx,FormField.tsx,TagInput.tsx,SchemaForm.tsx,SchemaField.tsx,ConfirmDeleteModal.tsx,Notifications.tsx}
touch src/components/items/{ItemForm.tsx,ItemItem.tsx}
touch src/components/layout/{AppSidebar.tsx,FilterBar.tsx}

# Create config files
touch {vite.config.ts,tsconfig.json,tsconfig.node.json,tailwind.config.js}
touch index.html

# Create package.json
cat > package.json << 'EOF'
{
  "name": "react-todo-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0",
    "zod": "^3.23.8",
    "lucide-react": "^0.379.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "@tailwindcss/vite": "^4.0.0-alpha.13",
    "tailwindcss": "^4.0.0-alpha.13",
    "autoprefixer": "^10.4.19",
    "unplugin-auto-import": "^0.17.6"
  }
}
EOF

echo "\u2705 Project structure created successfully!"
echo ""
echo "\U0001f4c1 Created directory structure:"
echo "\u251c\u2500\u2500 src/"
echo "\u2502   \u251c\u2500\u2500 components/"
echo "\u2502   \u2502   \u251c\u2500\u2500 common/"
echo "\u2502   \u2502   \u251c\u2500\u2500 items/"
echo "\u2502   \u2502   \u2514\u2500\u2500 layout/"
echo "\u2502   \u251c\u2500\u2500 stores/"
echo "\u2502   \u251c\u2500\u2500 hooks/"
echo "\u2502   \u251c\u2500\u2500 api/"
echo "\u2502   \u251c\u2500\u2500 types/"
echo "\u2502   \u251c\u2500\u2500 utils/"
echo "\u2502   \u2514\u2500\u2500 pages/"
echo "\u251c\u2500\u2500 public/"
echo "\u2514\u2500\u2500 config files (package.json, vite.config.ts, etc.)"
echo ""
echo "\U0001f3af Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Copy the provided code files to their respective locations"
echo "3. Start development: npm run dev"