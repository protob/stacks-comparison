# Frontend Source Code Collection (svelte-simple-crud)

**Generated on:** wto, 18 lis 2025, 14:19:04 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/simple/svelte-simple-crud/frontend

---

## `gen.sh`
```
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
```

## `tsconfig.json`
```
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true
	}
}
```

## `tailwind.config.ts`
```
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./src/app.html'
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			}
		}
	}
} satisfies Config;

```

## `package.json`
```
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
		"@sveltejs/adapter-auto": "^6.0.1",
		"@sveltejs/kit": "^2.21.1",
		"@sveltejs/vite-plugin-svelte": "^5.0.3",
		"@tailwindcss/vite": "^4.0.0",
		"svelte": "^5.33.11",
		"svelte-check": "^4.2.1",
		"tailwindcss": "^4.0.0",
		"tslib": "^2.8.1",
		"typescript": "^5.8.3",
		"vite": "^6.3.5"
	},
	"dependencies": {
		"clsx": "^2.1.1",
		"lucide-svelte": "^0.511.0",
		"zod": "^3.25.46"
	}
}

```

## `TODO.md`
```
buttons icons are currently added as plain svg rather than lucide icons
```

## `.svelte-kit/tsconfig.json`
```
{
	"compilerOptions": {
		"paths": {
			"$lib": [
				"../src/lib"
			],
			"$lib/*": [
				"../src/lib/*"
			]
		},
		"rootDirs": [
			"..",
			"./types"
		],
		"verbatimModuleSyntax": true,
		"isolatedModules": true,
		"lib": [
			"esnext",
			"DOM",
			"DOM.Iterable"
		],
		"moduleResolution": "bundler",
		"module": "esnext",
		"noEmit": true,
		"target": "esnext"
	},
	"include": [
		"ambient.d.ts",
		"non-ambient.d.ts",
		"./types/**/$types.d.ts",
		"../vite.config.js",
		"../vite.config.ts",
		"../src/**/*.js",
		"../src/**/*.ts",
		"../src/**/*.svelte",
		"../tests/**/*.js",
		"../tests/**/*.ts",
		"../tests/**/*.svelte"
	],
	"exclude": [
		"../node_modules/**",
		"../src/service-worker.js",
		"../src/service-worker/**/*.js",
		"../src/service-worker.ts",
		"../src/service-worker/**/*.ts",
		"../src/service-worker.d.ts",
		"../src/service-worker/**/*.d.ts"
	]
}
```

## `.svelte-kit/ambient.d.ts`
```

// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const LSCOLORS: string;
	export const SESSION_MANAGER: string;
	export const WINDOWID: string;
	export const __ETC_PROFILE_DONE: string;
	export const __HM_SESS_VARS_SOURCED: string;
	export const COLORTERM: string;
	export const GTK_THEME: string;
	export const SANE_CONFIG_DIR: string;
	export const XDG_CONFIG_DIRS: string;
	export const LESS: string;
	export const NIX_LD_LIBRARY_PATH: string;
	export const XDG_MENU_PREFIX: string;
	export const TERM_PROGRAM_VERSION: string;
	export const TMUX: string;
	export const NODE: string;
	export const LC_ADDRESS: string;
	export const LC_NAME: string;
	export const SSH_AUTH_SOCK: string;
	export const XCURSOR_PATH: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const LOCALE_ARCHIVE_2_27: string;
	export const npm_config_local_prefix: string;
	export const XMODIFIERS: string;
	export const LC_MONETARY: string;
	export const SSH_AGENT_PID: string;
	export const GDK_PIXBUF_MODULE_FILE: string;
	export const KITTY_PID: string;
	export const SPACESHIP_ROOT: string;
	export const XCURSOR_SIZE: string;
	export const EDITOR: string;
	export const GST_PLUGIN_SYSTEM_PATH_1_0: string;
	export const NAUTILUS_4_EXTENSION_DIR: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const NIX_GSETTINGS_OVERRIDES_DIR: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const XDG_SESSION_TYPE: string;
	export const CUPS_DATADIR: string;
	export const NIX_PATH: string;
	export const SYSTEMD_EXEC_PID: string;
	export const NIXPKGS_CONFIG: string;
	export const _: string;
	export const XAUTHORITY: string;
	export const DESKTOP_STARTUP_ID: string;
	export const KITTY_PUBLIC_KEY: string;
	export const TERMINAL: string;
	export const GJS_DEBUG_TOPICS: string;
	export const ZSH_TMUX_CONFIG: string;
	export const GRIM_DEFAULT_DIR: string;
	export const GTK2_RC_FILES: string;
	export const GI_TYPELIB_PATH: string;
	export const HOME: string;
	export const AUTOJUMP_ERROR_PATH: string;
	export const SSH_ASKPASS: string;
	export const LC_PAPER: string;
	export const LANG: string;
	export const TMUX_TMPDIR: string;
	export const LS_COLORS: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const _ZSH_TMUX_FIXED_CONFIG: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const WAYLAND_DISPLAY: string;
	export const AWS_PAGER: string;
	export const GIO_EXTRA_MODULES: string;
	export const KITTY_WINDOW_ID: string;
	export const INVOCATION_ID: string;
	export const DCONF_PROFILE: string;
	export const MANAGERPID: string;
	export const QT_QPA_PLATFORM: string;
	export const NIX_USER_PROFILE_DIR: string;
	export const INFOPATH: string;
	export const npm_lifecycle_script: string;
	export const GJS_DEBUG_OUTPUT: string;
	export const GNOME_SETUP_DISPLAY: string;
	export const TERMINFO: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_name: string;
	export const GTK_PATH: string;
	export const ZDOTDIR: string;
	export const USER: string;
	export const TMUX_PANE: string;
	export const TZDIR: string;
	export const NIX_LD: string;
	export const VISUAL: string;
	export const AUTOJUMP_SOURCED: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const GSK_RENDERER: string;
	export const SHLVL: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const __HM_ZSH_SESS_VARS_SOURCED: string;
	export const PAGER: string;
	export const LC_TELEPHONE: string;
	export const QTWEBKIT_PLUGIN_PATH: string;
	export const QT_IM_MODULE: string;
	export const LC_MEASUREMENT: string;
	export const __NIXOS_SET_ENVIRONMENT_DONE: string;
	export const LOCALE_ARCHIVE: string;
	export const SPACESHIP_VERSION: string;
	export const LESSKEYIN_SYSTEM: string;
	export const npm_config_user_agent: string;
	export const TERMINFO_DIRS: string;
	export const npm_execpath: string;
	export const LD_LIBRARY_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const ZSH_TMUX_TERM: string;
	export const NIX_XDG_DESKTOP_PORTAL_DIR: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const X11_BASE_RULES_XML: string;
	export const JOURNAL_STREAM: string;
	export const XCURSOR_THEME: string;
	export const XDG_DATA_DIRS: string;
	export const LIBEXEC_PATH: string;
	export const PATH: string;
	export const XDG_SCREENSHOTS_DIR: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const X11_EXTRA_RULES_XML: string;
	export const KITTY_INSTALLATION_DIR: string;
	export const GIO_LAUNCHED_DESKTOP_FILE_PID: string;
	export const npm_node_execpath: string;
	export const GIO_LAUNCHED_DESKTOP_FILE: string;
	export const LC_NUMERIC: string;
	export const OLDPWD: string;
	export const TERM_PROGRAM: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		LSCOLORS: string;
		SESSION_MANAGER: string;
		WINDOWID: string;
		__ETC_PROFILE_DONE: string;
		__HM_SESS_VARS_SOURCED: string;
		COLORTERM: string;
		GTK_THEME: string;
		SANE_CONFIG_DIR: string;
		XDG_CONFIG_DIRS: string;
		LESS: string;
		NIX_LD_LIBRARY_PATH: string;
		XDG_MENU_PREFIX: string;
		TERM_PROGRAM_VERSION: string;
		TMUX: string;
		NODE: string;
		LC_ADDRESS: string;
		LC_NAME: string;
		SSH_AUTH_SOCK: string;
		XCURSOR_PATH: string;
		MEMORY_PRESSURE_WRITE: string;
		LOCALE_ARCHIVE_2_27: string;
		npm_config_local_prefix: string;
		XMODIFIERS: string;
		LC_MONETARY: string;
		SSH_AGENT_PID: string;
		GDK_PIXBUF_MODULE_FILE: string;
		KITTY_PID: string;
		SPACESHIP_ROOT: string;
		XCURSOR_SIZE: string;
		EDITOR: string;
		GST_PLUGIN_SYSTEM_PATH_1_0: string;
		NAUTILUS_4_EXTENSION_DIR: string;
		PWD: string;
		NIX_PROFILES: string;
		NIX_GSETTINGS_OVERRIDES_DIR: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		XDG_SESSION_TYPE: string;
		CUPS_DATADIR: string;
		NIX_PATH: string;
		SYSTEMD_EXEC_PID: string;
		NIXPKGS_CONFIG: string;
		_: string;
		XAUTHORITY: string;
		DESKTOP_STARTUP_ID: string;
		KITTY_PUBLIC_KEY: string;
		TERMINAL: string;
		GJS_DEBUG_TOPICS: string;
		ZSH_TMUX_CONFIG: string;
		GRIM_DEFAULT_DIR: string;
		GTK2_RC_FILES: string;
		GI_TYPELIB_PATH: string;
		HOME: string;
		AUTOJUMP_ERROR_PATH: string;
		SSH_ASKPASS: string;
		LC_PAPER: string;
		LANG: string;
		TMUX_TMPDIR: string;
		LS_COLORS: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		_ZSH_TMUX_FIXED_CONFIG: string;
		MEMORY_PRESSURE_WATCH: string;
		WAYLAND_DISPLAY: string;
		AWS_PAGER: string;
		GIO_EXTRA_MODULES: string;
		KITTY_WINDOW_ID: string;
		INVOCATION_ID: string;
		DCONF_PROFILE: string;
		MANAGERPID: string;
		QT_QPA_PLATFORM: string;
		NIX_USER_PROFILE_DIR: string;
		INFOPATH: string;
		npm_lifecycle_script: string;
		GJS_DEBUG_OUTPUT: string;
		GNOME_SETUP_DISPLAY: string;
		TERMINFO: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		npm_package_name: string;
		GTK_PATH: string;
		ZDOTDIR: string;
		USER: string;
		TMUX_PANE: string;
		TZDIR: string;
		NIX_LD: string;
		VISUAL: string;
		AUTOJUMP_SOURCED: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		GSK_RENDERER: string;
		SHLVL: string;
		MOZ_ENABLE_WAYLAND: string;
		__HM_ZSH_SESS_VARS_SOURCED: string;
		PAGER: string;
		LC_TELEPHONE: string;
		QTWEBKIT_PLUGIN_PATH: string;
		QT_IM_MODULE: string;
		LC_MEASUREMENT: string;
		__NIXOS_SET_ENVIRONMENT_DONE: string;
		LOCALE_ARCHIVE: string;
		SPACESHIP_VERSION: string;
		LESSKEYIN_SYSTEM: string;
		npm_config_user_agent: string;
		TERMINFO_DIRS: string;
		npm_execpath: string;
		LD_LIBRARY_PATH: string;
		XDG_RUNTIME_DIR: string;
		ZSH_TMUX_TERM: string;
		NIX_XDG_DESKTOP_PORTAL_DIR: string;
		npm_package_json: string;
		LC_TIME: string;
		X11_BASE_RULES_XML: string;
		JOURNAL_STREAM: string;
		XCURSOR_THEME: string;
		XDG_DATA_DIRS: string;
		LIBEXEC_PATH: string;
		PATH: string;
		XDG_SCREENSHOTS_DIR: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		X11_EXTRA_RULES_XML: string;
		KITTY_INSTALLATION_DIR: string;
		GIO_LAUNCHED_DESKTOP_FILE_PID: string;
		npm_node_execpath: string;
		GIO_LAUNCHED_DESKTOP_FILE: string;
		LC_NUMERIC: string;
		OLDPWD: string;
		TERM_PROGRAM: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}

```

## `.svelte-kit/non-ambient.d.ts`
```

// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};

```

## `.svelte-kit/types/src/routes/$types.d.ts`
```
import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | null
type LayoutParams = RouteParams & {  }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { data: PageData }
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { data: LayoutData; children: import("svelte").Snippet }
```

## `.svelte-kit/types/route_meta_data.json`
```
{
	"/": []
}
```

## `.svelte-kit/generated/server/internal.js`
```

import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n    <title>Svelte Todo App - Manage Your Tasks</title>\n    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n    <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap\" rel=\"stylesheet\">\n    " + head + "\n  </head>\n  <body data-sveltekit-preload-data=\"hover\" class=\"font-sans\">\n    <div style=\"display: contents\">" + body + "</div>\n  </body>\n</html>",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "1aflyvn"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };

```

## `.svelte-kit/generated/root.js`
```
import { asClassComponent } from 'svelte/legacy';
import Root from './root.svelte';
export default asClassComponent(Root);
```

## `.svelte-kit/generated/client/nodes/2.js`
```
export { default as component } from "../../../../src/routes/+page.svelte";
```

## `.svelte-kit/generated/client/nodes/0.js`
```
export { default as component } from "../../../../src/routes/+layout.svelte";
```

## `.svelte-kit/generated/client/nodes/1.js`
```
export { default as component } from "../../../../node_modules/@sveltejs/kit/src/runtime/components/svelte-5/error.svelte";
```

## `.svelte-kit/generated/client/matchers.js`
```
export const matchers = {};
```

## `.svelte-kit/generated/client/app.js`
```
export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2')
];

export const server_loads = [];

export const dictionary = {
		"/": [2]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';
```

## `.svelte-kit/generated/root.svelte`
```
<!-- This file is generated by @sveltejs/kit — do not edit it! -->
<svelte:options runes={true} />
<script>
	import { setContext, onMount, tick } from 'svelte';
	import { browser } from '$app/environment';

	// stores
	let { stores, page, constructors, components = [], form, data_0 = null, data_1 = null } = $props();

	if (!browser) {
		setContext('__svelte__', stores);
	}

	if (browser) {
		$effect.pre(() => stores.page.set(page));
	} else {
		stores.page.set(page);
	}
	$effect(() => {
		stores;page;constructors;components;form;data_0;data_1;
		stores.page.notify();
	});

	let mounted = $state(false);
	let navigated = $state(false);
	let title = $state(null);

	onMount(() => {
		const unsubscribe = stores.page.subscribe(() => {
			if (mounted) {
				navigated = true;
				tick().then(() => {
					title = document.title || 'untitled page';
				});
			}
		});

		mounted = true;
		return unsubscribe;
	});

	const Pyramid_1=$derived(constructors[1])
</script>

{#if constructors[1]}
	{@const Pyramid_0 = constructors[0]}
							<!-- svelte-ignore binding_property_non_reactive -->
							<Pyramid_0 bind:this={components[0]} data={data_0} {form}>
								<!-- svelte-ignore binding_property_non_reactive -->
										<Pyramid_1 bind:this={components[1]} data={data_1} {form} />
							</Pyramid_0>
	
{:else}
	{@const Pyramid_0 = constructors[0]}
	<!-- svelte-ignore binding_property_non_reactive -->
	<Pyramid_0 bind:this={components[0]} data={data_0} {form} />
	
{/if}

{#if mounted}
	<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px">
		{#if navigated}
			{title}
		{/if}
	</div>
{/if}
```

## `svelte.config.js`
```
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
```

## `vite.config.ts`
```
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

```

## `src/lib/components/items/ItemItem.svelte`
```
<!-- src/lib/components/items/ItemItem.svelte -->
<script lang="ts">
	import clsx from 'clsx';
	import Button from '../common/Button.svelte';
	import type { Item, Priority } from '$lib/types';

	let { item, onToggleComplete, onEdit, onDelete }: {
		item: Item;
		onToggleComplete: (item: Item) => void;
		onEdit: (item: Item) => void;
		onDelete: (item: Item) => void;
	} = $props();

	const getPriorityClass = (priority: Priority) => {
		switch (priority) {
			case 'high':
				return 'bg-red-900/50 text-red-300 border border-red-800';
			case 'mid':
				return 'bg-yellow-900/50 text-yellow-300 border border-yellow-800';
			case 'low':
				return 'bg-green-900/50 text-green-300 border border-green-800';
			default:
				return 'bg-neutral-700 text-neutral-400';
		}
	};
</script>

<div class="p-4 border rounded bg-neutral-800 border-neutral-700">
	<div class="flex items-start justify-between gap-4">
		<div class="flex items-start flex-1 min-w-0 gap-3">
			<input
				type="checkbox"
				checked={item.isCompleted}
				onchange={() => onToggleComplete(item)}
				class="w-4 h-4 mt-1 text-blue-600 rounded border-neutral-600 bg-neutral-700 focus:ring-blue-500 focus:ring-1"
			/>
			<div class="flex-1 min-w-0">
				<div class="flex items-center gap-2 mb-2">
					<h3 class={clsx(
						'font-medium text-lg',
						item.isCompleted ? 'line-through text-neutral-500' : 'text-neutral-100'
					)}>
						{item.name}
					</h3>
					<span class={clsx(
						'px-2 py-0.5 rounded text-xs font-medium',
						getPriorityClass(item.priority)
					)}>
						{item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
					</span>
				</div>
				<p class={clsx(
					'text-sm mb-3',
					item.isCompleted ? 'line-through text-neutral-600' : 'text-neutral-400'
				)}>
					{item.text || 'No description provided.'}
				</p>
				{#if item.tags?.length > 0}
					<div class="overflow-y-auto max-h-16 scrollbar-thin">
						<div class="flex flex-wrap gap-1">
							{#each item.tags as tag}
								<span class="px-2 py-1 text-xs rounded bg-neutral-700 text-neutral-400">
									{tag}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
		<div class="flex gap-2">
			<Button 
				variant="ghost" 
				size="icon" 
				onclick={() => onEdit(item)} 
				icon="Pencil" 
				iconOnly
			/>
			<Button 
				variant="ghost" 
				size="icon" 
				onclick={() => onDelete(item)} 
				icon="Trash" 
				iconOnly
			/>
		</div>
	</div>
</div>

```

## `src/lib/components/items/ItemForm.svelte`
```
<!-- src/lib/components/items/ItemForm.svelte -->
<script lang="ts">
	import z from 'zod';
	import Button from '../common/Button.svelte';
	import SchemaForm from '../common/SchemaForm.svelte';
	import type { Item, Priority } from '$lib/types';

	interface Props {
		item?: Item | null;
		isLoading?: boolean;
		prefilledCategory?: string;
		onSubmit: (data: any) => void;
		onCancel: () => void;
	}

	let { item, isLoading = false, prefilledCategory = '', onSubmit, onCancel }: Props = $props();

	// Zod schema for the form
	const priorityEnum = z.enum(['low', 'mid', 'high']).optional().default('mid');
	const itemZodSchema = z.object({
		name: z.string().min(1, 'Name is required.'),
		text: z.string().min(1, 'Description is required.'),
		category: z.string().min(1, 'Category is required.'),
		priority: priorityEnum,
		tags: z.array(z.string()).optional().default([]),
		isCompleted: z.boolean().optional().default(false)
	});

	type ItemFormDataType = z.infer<typeof itemZodSchema>;

	// Form data state
	let formData = $state<Partial<ItemFormDataType>>({});

	// Layout hints for SchemaForm
	const layoutHints = $derived(() => ({
		name: {
			order: 10,
			placeholder: 'e.g., Buy groceries',
			label: 'Item Name'
		},
		text: {
			order: 20,
			widget: 'textarea',
			rows: 4,
			placeholder: 'Add more details about this item...',
			label: 'Description'
		},
		category: {
			order: 30,
			label: 'Category',
			placeholder: 'e.g., Work, Personal, Shopping'
		},
		priority: {
			order: 40,
			widget: 'select',
			label: 'Priority (optional)',
			options: [
				{ value: 'low', label: 'Low' },
				{ value: 'mid', label: 'Medium' },
				{ value: 'high', label: 'High' }
			]
		},
		tags: {
			order: 50,
			widget: 'tag-input',
			placeholder: 'Add tags...',
			label: 'Tags (optional)'
		},
		isCompleted: {
			order: 60,
			label: 'Mark as completed',
			hidden: !item
		}
	}));

	// Initialize form data when props change
	$effect(() => {
		if (item) {
			// Editing existing item
			formData = {
				name: item.name || '',
				text: item.text || '',
				category: item.categories[0] || '',
				priority: (item.priority || 'mid') as 'low' | 'mid' | 'high',
				tags: Array.isArray(item.tags) ? [...item.tags] : [],
				isCompleted: !!item.isCompleted
			};
		} else {
			// Creating new item
			formData = {
				name: '',
				text: '',
				category: prefilledCategory || '',
				priority: 'mid',
				tags: [],
				isCompleted: false
			};
		}
	});

	const handleSubmit = (validatedData: ItemFormDataType) => {
		console.log('ItemForm handleSubmit called with:', validatedData);
		
		const submissionPayload: any = {
			name: validatedData.name,
			text: validatedData.text,
			priority: validatedData.priority || 'mid',
			tags: validatedData.tags || [],
			categories: validatedData.category ? [validatedData.category.trim()] : []
		};

		// Only include isCompleted for existing items
		if (item) {
			submissionPayload.isCompleted = validatedData.isCompleted;
		}

		console.log('ItemForm submitting payload:', submissionPayload);
		onSubmit(submissionPayload);
	};

	// Update form data using store setter
	const handleFormDataChange = (key: string, value: any) => {
		formData = { ...formData, [key]: value };
	};

	const handleCancel = () => {
		console.log('ItemForm cancel clicked');
		onCancel();
	};
</script>

<SchemaForm
	schema={itemZodSchema}
	value={formData}
	onChange={handleFormDataChange}
	layoutHints={layoutHints}
	columns={1}
	onSubmit={handleSubmit}
	onCancel={handleCancel}
	showErrors={true}
>
	{#snippet footer({ submit })}
		<div class="flex justify-end pt-6 space-x-3 border-t border-neutral-700 mt-6">
			<Button 
				variant="secondary" 
				onclick={handleCancel}
				class="min-w-[100px]"
			>
				Cancel
			</Button>
			<Button 
				variant="primary" 
				loading={isLoading} 
				onclick={() => {
					console.log('Update button clicked, calling submit function');
					submit();
				}}
				icon={item?.id ? 'Save' : 'Plus'}
				class="min-w-[160px]"
			>
				{item?.id ? 'Update Item' : 'Create Item'}
			</Button>
		</div>
	{/snippet}
</SchemaForm>

```

## `src/lib/components/common/ConfirmDeleteModal.svelte`
```
<!-- src/lib/components/common/ConfirmDeleteModal.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		onConfirm: () => void;
		title?: string;
		message?: string;
		confirmText?: string;
		isLoading?: boolean;
	}

	let {
		isOpen = false,
		onClose,
		onConfirm,
		title = 'Confirm Deletion',
		message = 'Are you sure you want to delete this item? This action cannot be undone.',
		confirmText = 'Delete',
		isLoading = false
	}: Props = $props();

	// Fix: Use a more reliable approach without element binding
	$effect(() => {
		if (isOpen) {
			// Wait for the modal to render, then focus the cancel button
			setTimeout(() => {
				const cancelButton = document.querySelector('[data-cancel-button]') as HTMLButtonElement;
				if (cancelButton) {
					cancelButton.focus();
				}
			}, 100);
		}
	});
</script>

<Modal {isOpen} onClose={onClose} {title} size="sm" persistent>
	<p class="mb-6 text-sm text-neutral-300">{@html message}</p>
	
	<div class="flex justify-end gap-3">
		<Button 
			data-cancel-button
			variant="secondary" 
			onclick={onClose}
		>
			Cancel
		</Button>
		<Button 
			variant="danger" 
			onclick={onConfirm} 
			loading={isLoading}
		>
			{confirmText}
		</Button>
	</div>
</Modal>

```

## `src/lib/components/common/SchemaForm.svelte`
```
<!-- src/lib/components/common/SchemaForm.svelte -->
<script lang="ts">
	import { z } from 'zod';
	import clsx from 'clsx';
	import SchemaField from './SchemaField.svelte';
	import Button from './Button.svelte';
	import { getBaseSchema } from '$lib/utils/schema-helpers';

	interface Props {
		schema: z.ZodTypeAny;
		value: Record<string, any>;
		onChange: (key: string, value: any) => void;
		layoutHints?: Record<string, any>;
		columns?: number;
		excludeFields?: string[];
		showErrors?: boolean;
		onSubmit?: (data: any) => void;
		onCancel?: () => void;
		children?: any;
		customFields?: any;
		footer?: any;
	}

	let {
		schema,
		value = {},
		onChange,
		layoutHints = {},
		columns = 1,
		excludeFields = ['id', 'slug', 'createdat', 'modifiedat', 'updatedAt', 'createdAt'],
		showErrors = true,
		onSubmit,
		onCancel,
		children,
		customFields,
		footer
	}: Props = $props();

	let errors = $state<Record<string, { message: string }>>({});
	let touchedFields = $state<Record<string, boolean>>({});

	const columnClass = $derived(() => {
		switch (columns) {
			case 1: return '';
			case 2: return 'md:grid-cols-2';
			case 3: return 'md:grid-cols-3';
			case 4: return 'md:grid-cols-4';
			default: return '';
		}
	});

	const sortedFieldKeys = $derived(() => {
		const baseSchema = getBaseSchema(schema);
		if (!baseSchema || !(baseSchema instanceof z.ZodObject)) {
			console.error('SchemaForm: Cannot compute sortedFields. Base schema is not a ZodObject.');
			return [];
		}

		const schemaShape = baseSchema.shape as Record<string, z.ZodTypeAny>;
		if (!schemaShape) {
			console.error('SchemaForm: Schema shape is undefined!');
			return [];
		}

		const keys = Object.keys(schemaShape);
		return keys.sort((keyA, keyB) => {
			const orderA = layoutHints[keyA]?.order ?? 999;
			const orderB = layoutHints[keyB]?.order ?? 999;
			return orderA - orderB;
		});
	});

	const shouldRenderField = (key: string): boolean => {
		const excluded = excludeFields.includes(key);
		const hidden = layoutHints[key]?.hidden;
		return !excluded && !hidden;
	};

	const getFieldSchema = (key: string): z.ZodTypeAny | undefined => {
		const baseSchema = getBaseSchema(schema);
		if (!baseSchema || !(baseSchema instanceof z.ZodObject)) {
			return undefined;
		}
		return baseSchema.shape[key];
	};

	const getLayoutHint = (key: string): Record<string, any> => {
		return layoutHints[key] || {};
	};

	const updateFieldValue = (key: string, fieldValue: any) => {
		touchedFields[key] = true;
		onChange(key, fieldValue);
		validateField(key, fieldValue);
	};

	const getFieldName = (key: string): string => {
		return layoutHints[key]?.label || key
			.replace(/_/g, ' ')
			.replace(/([A-Z])/g, ' $1')
			.trim()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const validateField = (key: string, fieldValue: any) => {
		const fieldSchema = getFieldSchema(key);
		if (!fieldSchema) return;

		const result = fieldSchema.safeParse(fieldValue);
		if (!result.success) {
			errors[key] = { message: result.error.errors[0]?.message || 'Invalid value' };
		} else {
			delete errors[key];
		}
	};

	const validateForm = () => {
		errors = {};
		const parseResult = schema.safeParse(value);
		
		if (parseResult.success) {
			return { valid: true, data: parseResult.data };
		} else {
			const formattedErrors = parseResult.error.format();
			const errorMap: Record<string, { message: string }> = {};
			
			Object.entries(formattedErrors).forEach(([key, errorValue]) => {
				if (key === '_errors') return;
				
				if (errorValue && typeof errorValue === 'object' && '_errors' in errorValue) {
					if (Array.isArray(errorValue._errors) && errorValue._errors.length > 0) {
						errorMap[key] = { message: errorValue._errors[0] };
					}
				}
			});
			
			if (formattedErrors._errors?.length) {
				errorMap.form = { message: formattedErrors._errors[0] };
			}
			
			errors = errorMap;
			return { valid: false, errors: errorMap };
		}
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const result = validateForm();
		if (result.valid && onSubmit) {
			onSubmit(result.data);
		}
	};

	// This is the function that gets passed to the footer snippet
	const submitForm = () => {
		console.log('submitForm called');
		const result = validateForm();
		if (result.valid && onSubmit) {
			console.log('Form is valid, calling onSubmit with:', result.data);
			onSubmit(result.data);
		} else {
			console.log('Form validation failed:', result);
		}
	};

	// Watch for changes in touched fields
	$effect(() => {
		Object.keys(touchedFields).forEach(key => {
			if (touchedFields[key] && Object.prototype.hasOwnProperty.call(value, key)) {
				validateField(key, value[key]);
			}
		});
	});
</script>

<form onsubmit={handleSubmit} class="space-y-5">
	<!-- Render children if provided -->
	{#if children}
		{@render children()}
	{/if}

	<div class={clsx('grid gap-x-4 gap-y-0 grid-cols-1', columnClass())}>
		{#each sortedFieldKeys() as key}
			{#if shouldRenderField(key)}
				<SchemaField
					name={key}
					schema={getFieldSchema(key)}
					value={value[key]}
					error={errors[key]?.message}
					layoutHint={getLayoutHint(key)}
					onChange={(fieldValue) => updateFieldValue(key, fieldValue)}
				/>
			{/if}
		{/each}
	</div>

	<!-- Render custom fields if provided -->
	{#if customFields}
		{@render customFields()}
	{/if}

	<!-- Error summary -->
	{#if showErrors && Object.keys(errors).length > 0}
		<div class="p-3 mt-4 text-red-300 border rounded bg-red-900/10 border-red-700/50">
			<h4 class="mb-1 font-medium">Please fix the following errors:</h4>
			<ul class="space-y-1 text-sm list-disc list-inside">
				{#each Object.entries(errors) as [field, error]}
					<li>
						{#if field === 'form'}
							{error.message}
						{:else}
							<span class="font-semibold">{getFieldName(field)}:</span> {error.message}
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Footer -->
	<div class="flex justify-end gap-3 pt-4 mt-6 border-t border-neutral-700">
		{#if footer}
			{@render footer({ submit: submitForm })}
		{:else}
			<Button onclick={onCancel} variant="secondary">Cancel</Button>
			<Button type="submit" variant="primary" icon="Save">Save</Button>
		{/if}
	</div>
</form>

```

## `src/lib/components/common/FormField.svelte`
```
<script lang="ts">
  import { clsx } from 'clsx';
  
  let {
    label = '',
    labelFor = '',
    help = '',
    error = '',
    required = false,
    labelClass = '',
    fullWidth = false,
    class: className = '',
    children
  }: {
    label?: string;
    labelFor?: string;
    help?: string;
    error?: string;
    required?: boolean;
    labelClass?: string;
    fullWidth?: boolean;
    class?: string;
    children?: any;
  } = $props();
  
  const containerClass = $derived(
    clsx('mb-4', fullWidth && 'w-full', className)
  );
  
  const computedLabelClass = $derived(
    clsx(
      'block text-sm font-medium mb-1',
      labelClass || 'text-neutral-300',
      error && 'text-red-400'
    )
  );
</script>

<div class={containerClass}>
  {#if label}
    <label for={labelFor} class={computedLabelClass}>
      {label}
      {#if required}
        <span class="ml-1 text-red-500">*</span>
      {/if}
    </label>
  {/if}
  {@render children?.()}
  {#if help && !error}
    <div class="mt-1 text-xs text-neutral-500">
      {help}
    </div>
  {/if}
  {#if error}
    <div class="mt-1 text-xs text-red-400">
      {error}
    </div>
  {/if}
</div>
```

## `src/lib/components/common/Icon.svelte`
```
<!-- src/lib/components/common/Icon.svelte -->
<script lang="ts">
	import * as LucideIcons from 'lucide-svelte';
	import type { IconName } from '$lib/types';

	interface Props {
		name: IconName;
		class?: string;
		size?: number | string;
		color?: string;
	}

	let { name, class: className = '', size = 24, color = 'currentColor' }: Props = $props();

	const Component = $derived((LucideIcons as any)[name] ?? LucideIcons.HelpCircle);

	// Fix: Handle size properly
	const sizeValue = $derived(() => {
		if (typeof size === 'number') return size;
		const s = Number(size);
		return isNaN(s) ? 24 : s;
	});

	const iconProps = $derived(() => {
		return {
			class: `inline-flex items-center justify-center shrink-0 ${className}`,
			color,
			size: sizeValue,
			style: 'vertical-align: middle; display: inline-flex; align-items: center;'
		};
	});
</script>

<Component {...iconProps} />

```

## `src/lib/components/common/Modal.svelte`
```
<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		isOpen: boolean;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
		persistent?: boolean;
		closeOnEsc?: boolean;
		hideCloseButton?: boolean;
		headerClass?: string;
		bodyClass?: string;
		footerClass?: string;
		modalClass?: string;
		children?: any;
		footer?: any;
	}

	let {
		isOpen = $bindable(),
		title,
		size = 'md',
		persistent = false,
		closeOnEsc = true,
		hideCloseButton = false,
		headerClass = '',
		bodyClass = 'py-4 px-6',
		footerClass = '',
		modalClass = '',
		children,
		footer
	}: Props = $props();

	let modalRef = $state<HTMLDivElement>();

	const baseSizeClasses = $derived(() => {
		if (modalClass && (modalClass.includes('max-w-') || modalClass.includes('w-'))) {
			return '';
		}
		
		const sizeMap = {
			sm: 'sm:max-w-sm',
			md: 'sm:max-w-md',
			lg: 'sm:max-w-lg'
		};
		
		return sizeMap[size] || 'sm:max-w-md';
	});

	const closeModal = () => {
		if (persistent && !hideCloseButton) {
			isOpen = false;
			return;
		}
		if (!persistent) {
			isOpen = false;
		}
	};

	const handleBackdropClick = (event: MouseEvent) => {
		if (event.target === event.currentTarget && !persistent) {
			closeModal();
		}
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' && closeOnEsc && isOpen) {
			closeModal();
		}
	};

	onMount(() => {
		const handleEsc = (event: KeyboardEvent) => handleKeydown(event);
		
		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.body.style.overflow = 'unset';
		};
	});

	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 flex items-center justify-center p-4 z-100 bg-black/70 backdrop-blur-sm"
		onclick={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		tabindex="-1"
	>
		<div
			bind:this={modalRef}
			class="bg-neutral-800 text-neutral-100 flex flex-col overflow-hidden w-full {baseSizeClasses()} {modalClass}"
		>
			{#if title || !hideCloseButton}
				<header class="p-4 border-b border-neutral-700 flex items-center justify-between shrink-0 {headerClass}">
					{#if title}
						<h2 id="modal-title" class="text-lg font-semibold">{title}</h2>
					{:else}
						<div></div>
					{/if}
					
					{#if !hideCloseButton}
						<button
							onclick={closeModal}
							class="ml-auto -mr-2 -my-2 bg-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/60 focus:ring-blue-500/30 p-1.5"
							aria-label="Close modal"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					{/if}
				</header>
			{/if}

			<div class="flex-1 overflow-y-auto scrollbar-thin {bodyClass}">
				{@render children?.()}
			</div>

			{#if footer}
				<footer class="p-4 border-t border-neutral-700 shrink-0 {footerClass}">
					{@render footer()}
				</footer>
			{/if}
		</div>
	</div>
{/if}

```

## `src/lib/components/common/TagInput.svelte`
```
<script lang="ts">
	interface Props {
		value?: string[];
		onChange?: (tags: string[]) => void;
		placeholder?: string;
		error?: string;
		allowDuplicates?: boolean;
		maxTags?: number;
		delimiter?: string;
		maxTagLength?: number;
	}

	let {
		value = $bindable([]),
		onChange,
		placeholder = 'Add items...',
		error = '',
		allowDuplicates = false,
		maxTags = 10,
		delimiter = ',',
		maxTagLength = 50
	}: Props = $props();

	let inputValue = $state('');
	let inputRef = $state<HTMLInputElement>();

	// Ensure value is always an array
	$effect(() => {
		if (!Array.isArray(value)) {
			value = [];
		}
	});

	const addCurrentTag = () => {
		const trimmedValue = inputValue.trim();
		if (!trimmedValue) return;

		const tryAddTag = (tagToAdd: string) => {
			const finalTag = tagToAdd.substring(0, maxTagLength);
			if (!finalTag) return;

			if (value.length >= maxTags) {
				console.warn(`TagInput: Max tags limit (${maxTags}) reached.`);
				return;
			}

			if (!allowDuplicates && value.includes(finalTag)) {
				console.log(`TagInput: Duplicate tag "${finalTag}" ignored.`);
				return;
			}

			const newValue = [...value, finalTag];
			value = newValue;
			onChange?.(newValue);
		};

		// Support pasting comma-separated values if delimiter is set
		if (delimiter && trimmedValue.includes(delimiter)) {
			const newTags = trimmedValue
				.split(delimiter)
				.map((tag) => tag.trim())
				.filter((tag) => tag.length > 0);
			newTags.forEach(tryAddTag);
		} else {
			tryAddTag(trimmedValue);
		}

		inputValue = '';
	};

	const removeTag = (index: number) => {
		if (index >= 0 && index < value.length) {
			const newValue = [...value];
			newValue.splice(index, 1);
			value = newValue;
			onChange?.(newValue);
			inputRef?.focus();
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === 'Tab') {
			event.preventDefault();
			addCurrentTag();
		} else if (event.key === 'Backspace' && !inputValue && value.length > 0) {
			removeTag(value.length - 1);
		} else if (event.key === ',' && delimiter === ',') {
			event.preventDefault();
			addCurrentTag();
		}
	};

	const handleBlur = () => {
		setTimeout(() => {
			if (inputValue.trim()) {
				addCurrentTag();
			}
		}, 150);
	};

	const focusInput = () => {
		inputRef?.focus();
	};
</script>

<div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="flex flex-wrap items-center gap-x-1.5 gap-y-1 w-full px-3 py-2 border bg-neutral-800 text-neutral-200 rounded border-neutral-600 focus-within:ring-1 focus-within:ring-blue-500/70 focus-within:border-blue-500/50 transition-colors duration-150 {error
			? 'border-red-500'
			: 'border-neutral-600'}"
		onclick={focusInput}
		role="textbox"
		tabindex="0"
		aria-label="Tag input"
	>
		<!-- Existing tags -->
		{#each value as tag, index (tag + '-' + index)}
			<div class="flex items-center px-2 text-xs rounded-sm h-28px bg-neutral-700 text-neutral-200 whitespace-nowrap">
				<span>{tag}</span>
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						removeTag(index);
					}}
					class="ml-1 p-0.5 rounded-full text-neutral-400 hover:bg-red-800/50 hover:text-red-300 focus:outline-none transition-colors"
					aria-label="Remove tag"
				>
					<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		{/each}

		<!-- Input for new tag -->
		<input
			bind:this={inputRef}
			bind:value={inputValue}
			onkeydown={handleKeyDown}
			onblur={handleBlur}
			class="flex-grow px-2 py-1 text-sm bg-transparent border-none rounded-none outline-none min-w-120px h-28px text-neutral-200 placeholder:text-neutral-500"
			placeholder={value.length === 0 ? placeholder : ''}
		/>
	</div>

	<!-- Error message -->
	{#if error}
		<div class="mt-1 text-xs text-red-400">{error}</div>
	{/if}
</div>

```

## `src/lib/components/common/SchemaField.svelte`
```
<script lang="ts">
	import { z } from 'zod';
	import FormField from './FormField.svelte';
	import TagInput from './TagInput.svelte';
	import { unwrapZodType } from '$lib/utils/schema-helpers';

	interface Props {
		schema: z.ZodTypeAny;
		name: string;
		value: any;
		error?: string;
		layoutHint?: Record<string, any>;
		onChange: (value: any) => void;
	}

	let { schema, name, value, error, layoutHint, onChange }: Props = $props();

	const fieldId = $derived(`field-${name}`);
	const baseSchema = $derived(() => unwrapZodType(schema));

	const fieldType = $derived(() => {
		const schema = baseSchema();
		if (!schema) {
			console.warn(`SchemaField: Schema is undefined for field ${name}`);
			return 'unknown';
		}

		if (schema instanceof z.ZodString) return 'string';
		if (schema instanceof z.ZodNumber) return 'number';
		if (schema instanceof z.ZodBoolean) return 'boolean';
		if (schema instanceof z.ZodEnum) return 'enum';
		if (schema instanceof z.ZodArray) return 'array';
		if (schema instanceof z.ZodObject) return 'object';

		if (name.toLowerCase().includes('date') || (schema as any).def?.typeName === 'ZodDate') {
			return 'date';
		}

		console.warn(`SchemaField: Unknown Zod type for field ${name}. Schema definition:`, (schema as any).def);
		return 'unknown';
	});

	const effectiveFieldType = $derived(() => {
		if (layoutHint?.widget === 'textarea' && fieldType() === 'string') return 'textarea';
		if (layoutHint?.widget === 'select' && fieldType() === 'string') {
			if (layoutHint?.options) return 'select-string-enum';
		}
		if (layoutHint?.widget === 'select' && fieldType() === 'enum') return 'enum';
		if (fieldType() === 'array' && (layoutHint?.widget === 'tag-input' || ['tags', 'categories'].includes(name.toLowerCase()))) {
			return 'tag-input';
		}
		return fieldType();
	});

	const isRequired = $derived(() => {
		const originalSchema = schema;
		return !(
			originalSchema instanceof z.ZodOptional ||
			originalSchema instanceof z.ZodNullable ||
			originalSchema instanceof z.ZodDefault
		);
	});

	const enumOptions = $derived(() => {
		if (fieldType() === 'enum') {
			const schema = baseSchema();
			if (schema instanceof z.ZodEnum) {
				return schema.options.map((opt: string) => ({
					value: opt,
					label: formatEnumOption(opt)
				}));
			}
		}
		if (effectiveFieldType() === 'select-string-enum' && layoutHint?.options) {
			return layoutHint.options;
		}
		return [];
	});

	const getLabel = (): string => {
		return layoutHint?.label || name
			.replace(/_/g, ' ')
			.replace(/([A-Z])/g, ' $1')
			.trim()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const formatEnumOption = (optionValue: string): string => {
		if (layoutHint?.options) {
			const foundOption = layoutHint.options.find((opt: { value: string; label: string }) => opt.value === optionValue);
			if (foundOption) return foundOption.label;
		}
		return optionValue
			.replace(/_/g, ' ')
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	const fieldClass = $derived(() => {
		if (layoutHint?.colSpan === 2) return 'md:col-span-2';
		if (layoutHint?.colSpan === 3) return 'md:col-span-3';
		return '';
	});

	const handleChange = (newValue: any) => {
		const effectiveType = effectiveFieldType();
		const required = isRequired();
		let processedValue = newValue;

		if ((effectiveType === 'enum' || effectiveType === 'select-string-enum') && !required && newValue === '') {
			processedValue = undefined;
		} else if (effectiveType === 'number') {
			const num = parseFloat(newValue as string);
			processedValue = isNaN(num) ? (required ? 0 : undefined) : num;
		}

		onChange(processedValue);
	};

	// Initialize value properly for arrays
	$effect(() => {
		if (effectiveFieldType() === 'tag-input' && !Array.isArray(value)) {
			onChange([]);
		}
	});

	// Local reactive values for form inputs
	let localValue = $state(value || '');
	let localChecked = $state(!!value);
	let localNumberValue = $state(value || '');
	let localArrayValue = $state<string[]>(Array.isArray(value) ? value : []);

	// Sync with external value changes
	$effect(() => {
		localValue = value || '';
		localChecked = !!value;
		localNumberValue = value || '';
		localArrayValue = Array.isArray(value) ? value : [];
	});
</script>

<FormField
	label={getLabel()}
	required={isRequired()}
	error={error}
	help={layoutHint?.help}
	labelFor={fieldId}
	class={fieldClass()}
>
	{#if effectiveFieldType() === 'textarea'}
		<textarea
			id={fieldId}
			bind:value={localValue}
			oninput={(e) => handleChange(e.currentTarget.value)}
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			rows={layoutHint?.rows || 3}
			placeholder={layoutHint?.placeholder}
			required={isRequired()}
			aria-invalid={!!error}
		></textarea>
	{:else if effectiveFieldType() === 'tag-input'}
		<TagInput
			bind:value={localArrayValue}
			onChange={handleChange}
			placeholder={layoutHint?.placeholder || 'Add items...'}
			error={error}
		/>
	{:else if effectiveFieldType() === 'enum' || effectiveFieldType() === 'select-string-enum'}
		<select
			id={fieldId}
			bind:value={localValue}
			onchange={(e) => handleChange(e.currentTarget.value)}
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			required={isRequired()}
			aria-invalid={!!error}
		>
			{#if !isRequired()}
				<option value="">-- Optional --</option>
			{/if}
			{#each enumOptions() as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{:else if effectiveFieldType() === 'date'}
		<input
			id={fieldId}
			bind:value={localValue}
			oninput={(e) => handleChange(e.currentTarget.value)}
			type="date"
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			required={isRequired()}
			aria-invalid={!!error}
		/>
	{:else if effectiveFieldType() === 'number'}
		<input
			id={fieldId}
			bind:value={localNumberValue}
			oninput={(e) => handleChange(e.currentTarget.value)}
			type="number"
			step={layoutHint?.step || 'any'}
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			placeholder={layoutHint?.placeholder}
			required={isRequired()}
			aria-invalid={!!error}
		/>
	{:else if effectiveFieldType() === 'boolean'}
		<div class="flex items-center h-10">
			<input
				id={fieldId}
				bind:checked={localChecked}
				onchange={(e) => handleChange(e.currentTarget.checked)}
				type="checkbox"
				class="w-4 h-4 rounded accent-blue-500 focus:ring-blue-500 border-neutral-600 bg-neutral-700"
				required={isRequired()}
				aria-invalid={!!error}
			/>
		</div>
	{:else if effectiveFieldType() === 'string'}
		<input
			id={fieldId}
			bind:value={localValue}
			oninput={(e) => handleChange(e.currentTarget.value)}
			type="text"
			class="w-full px-3 py-2 border rounded bg-neutral-800 border-neutral-600 text-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
			placeholder={layoutHint?.placeholder}
			required={isRequired()}
			aria-invalid={!!error}
		/>
	{:else}
		<div class="p-2 text-xs italic text-red-400 border rounded bg-neutral-800 border-red-700/50">
			Unsupported field type: {effectiveFieldType()} ({name})
		</div>
	{/if}
</FormField>

```

## `src/lib/components/common/Button.svelte`
```
<!-- src/lib/components/common/Button.svelte -->
<script lang="ts">
	type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
	type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

	interface Props {
		variant?: ButtonVariant;
		size?: ButtonSize;
		class?: string;
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: (event: MouseEvent) => void;
		children?: any;
		icon?: string;
		iconOnly?: boolean;
	}

	let {
		variant = 'primary',
		size = 'md',
		class: className = '',
		disabled = false,
		loading = false,
		type = 'button',
		onclick,
		children,
		icon,
		iconOnly = false,
		...rest
	}: Props = $props();

	// Base button styles that always apply
	const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md';

	// Variant styles
	const variantStyles = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm',
		secondary: 'bg-neutral-600 text-white hover:bg-neutral-700 active:bg-neutral-800 shadow-sm',
		danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm',
		ghost: 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600 hover:text-white',
		outline: 'border border-neutral-600 bg-transparent text-neutral-200 hover:bg-neutral-700 hover:text-white'
	};

	// Size styles
	const sizeStyles = {
		sm: iconOnly ? 'h-8 w-8 p-0' : 'h-8 px-3 text-sm',
		md: iconOnly ? 'h-10 w-10 p-0' : 'h-10 px-4 py-2',
		lg: iconOnly ? 'h-12 w-12 p-0' : 'h-12 px-6 py-3 text-lg',
		icon: 'h-10 w-10 p-0'
	};

	// Combine all styles
	const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

	function handleClick(event: MouseEvent) {
		if (disabled || loading) {
			event.preventDefault();
			return;
		}
		onclick?.(event);
	}
</script>

<button
	{type}
	class={buttonClasses}
	{disabled}
	onclick={handleClick}
	{...rest}
>
	{#if loading}
		<svg class="animate-spin h-4 w-4 {children ? 'mr-2' : ''}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	{:else if icon && !children}
		<!-- Icon only button -->
		{#if icon === 'Plus'}
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
		{:else if icon === 'Pencil'}
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
			</svg>
		{:else if icon === 'Trash'}
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
			</svg>
		{:else if icon === 'Save'}
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
			</svg>
		{/if}
	{:else if icon && children}
		<!-- Button with icon and text -->
		{#if icon === 'Plus'}
			<svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
		{:else if icon === 'Save'}
			<svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
			</svg>
		{/if}
		{@render children?.()}
	{:else}
		<!-- Text only button -->
		{@render children?.()}
	{/if}
</button>

```

## `src/lib/components/common/Notifications.svelte`
```
<script lang="ts">
  import { clsx } from 'clsx';
  import Icon from './Icon.svelte';
  import { uiStore } from '$lib/stores/uiStore';
  import type { NotificationType } from '$lib/types';
  
  const notifications = $derived(uiStore.notifications);
  
  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info':
      default: return 'Info';
    }
  };
  
  const getBgClassForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'bg-green-700 border-green-600';
      case 'error': return 'bg-red-700 border-red-600';
      case 'warning': return 'bg-yellow-700 border-yellow-600';
      case 'info':
      default: return 'bg-blue-700 border-blue-600';
    }
  };
  
  const getTextClassForType = (type: NotificationType) => {
    switch (type) {
      case 'success': return 'text-green-100';
      case 'error': return 'text-red-100';
      case 'warning': return 'text-yellow-100';
      case 'info':
      default: return 'text-blue-100';
    }
  };
</script>

{#if notifications.length > 0}
  <div class="fixed z-[200] flex flex-col max-w-md gap-2 top-4 right-4">
    <div class="space-y-2">
      {#each notifications as notification (notification.id)}
        <div
          class={clsx(
            'flex items-start p-3 rounded-sm shadow-lg border text-white',
            getBgClassForType(notification.type)
          )}
        >
          <Icon
            name={getIconForType(notification.type)}
            class={clsx('h-5 w-5 mt-0.5 mr-2 shrink-0', getTextClassForType(notification.type))}
          />
          <div class="flex-1 mr-2">
            <p class={clsx('text-sm', getTextClassForType(notification.type))}>
              {notification.message}
            </p>
          </div>
          <button
            onclick={() => uiStore.removeNotification(notification.id)}
            class={clsx('text-neutral-300 hover:text-white', getTextClassForType(notification.type))}
          >
            <Icon name="X" class="w-4 h-4" />
          </button>
        </div>
      {/each}
    </div>
  </div>
{/if}
```

## `src/lib/components/layout/FilterBar.svelte`
```
<script lang="ts">
  interface FilterOption {
    value: string;
    label: string;
  }
  
  let {
    showPriorityFilter = true,
    priorityLabel = 'Priority',
    priorityOptions = [
      { value: 'all', label: 'All' },
      { value: 'high', label: 'High' },
      { value: 'mid', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
    selectedPriority = 'all',
    onPriorityChange,
    
    showStatusFilter = true,
    statusLabel = 'Status',
    completedLabel = 'Show completed',
    showCompleted = false,
    onShowCompletedChange
  }: {
    showPriorityFilter?: boolean;
    priorityLabel?: string;
    priorityOptions?: FilterOption[];
    selectedPriority?: string;
    onPriorityChange: (priority: string) => void;
    
    showStatusFilter?: boolean;
    statusLabel?: string;
    completedLabel?: string;
    showCompleted?: boolean;
    onShowCompletedChange: (show: boolean) => void;
  } = $props();
</script>

<div class="flex items-center gap-8 p-3 mb-6 border rounded bg-neutral-800 border-neutral-700">
  {#if showPriorityFilter}
    <div>
      <h4 class="mb-2 text-sm font-medium text-neutral-300">{priorityLabel}</h4>
      <div class="flex gap-4">
        {#each priorityOptions as option}
          <label class="flex items-center gap-2 text-sm text-neutral-400">
            <input
              value={option.value}
              checked={selectedPriority === option.value}
              onchange={(e) => onPriorityChange(e.currentTarget.value)}
              type="radio"
              class="w-4 h-4 text-blue-600 border-neutral-600 bg-neutral-700"
              name="priority"
            />
            {option.label}
          </label>
        {/each}
      </div>
    </div>
  {/if}
  
  {#if showStatusFilter}
    <div>
      <h4 class="mb-2 text-sm font-medium text-neutral-300">{statusLabel}</h4>
      <label class="flex items-center gap-2 text-sm text-neutral-400">
        <input
          checked={showCompleted}
          onchange={(e) => onShowCompletedChange(e.currentTarget.checked)}
          type="checkbox"
          class="w-4 h-4 text-blue-600 rounded border-neutral-600 bg-neutral-700"
        />
        {completedLabel}
      </label>
    </div>
  {/if}
</div>
```

## `src/lib/components/layout/AppSidebar.svelte`
```
<script lang="ts">
  import { clsx } from 'clsx';
  
  let {
    searchQuery = '',
    onSearchQueryChange,
    searchPlaceholder = 'Search items...',
    availableTags = [],
    selectedTags = [],
    onToggleTag,
    tagsLabel = 'TAGS',
    tagPrefix = '#'
  }: {
    searchQuery?: string;
    onSearchQueryChange: (query: string) => void;
    searchPlaceholder?: string;
    availableTags?: string[];
    selectedTags?: string[];
    onToggleTag: (tag: string) => void;
    tagsLabel?: string;
    tagPrefix?: string;
  } = $props();
</script>

<div class="w-64 p-4 space-y-6 border-r bg-neutral-800 border-neutral-700">
  <div>
    <h3 class="mb-3 text-sm font-medium text-neutral-300">Search</h3>
    <input
      value={searchQuery}
      oninput={(e) => onSearchQueryChange(e.currentTarget.value)}
      type="text"
      placeholder={searchPlaceholder}
      class="w-full px-3 py-2 text-sm border rounded bg-neutral-700 border-neutral-600 text-neutral-200 placeholder:text-neutral-500"
    />
  </div>
  
  {#if availableTags.length > 0}
    <div>
      <h3 class="mb-3 text-sm font-medium text-neutral-300">{tagsLabel}</h3>
      <div class="overflow-y-auto max-h-64 scrollbar-thin">
        <div class="flex flex-wrap gap-2">
          {#each availableTags as tag}
            <button
              onclick={() => onToggleTag(tag)}
              class={clsx(
                'px-2 py-1 text-xs rounded transition-colors',
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              )}
            >
              {tagPrefix}{tag}
            </button>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>
```

## `src/lib/utils/slugify.ts`
```
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
```

## `src/lib/utils/helpers.ts`
```
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};
```

## `src/lib/utils/schema-helpers.ts`
```
import { z } from 'zod';

export function unwrapZodType(schema: z.ZodTypeAny): z.ZodTypeAny {
  if (
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  ) {
    const inner = schema._def.innerType || (typeof (schema as any).unwrap === 'function' ? (schema as any).unwrap() : undefined);
    return inner ? unwrapZodType(inner) : schema;
  }
  if (schema instanceof z.ZodEffects) {
    return unwrapZodType(schema.innerType());
  }
  return schema;
}

export function getBaseSchema(schema: z.ZodTypeAny): z.ZodObject<any, any, any> | null {
  const unwrapped = unwrapZodType(schema);
  if (unwrapped instanceof z.ZodObject) {
    return unwrapped;
  }
  console.error("getBaseSchema: Expected a ZodObject after unwrapping, but got:", unwrapped);
  return null;
}
```

## `src/lib/stores/uiStore.ts`
```
import { writable, derived } from 'svelte/store';
import type { Notification, NotificationType } from '$lib/types';

function createUiStore() {
  const _isLoading = writable(false);
  const _loadingMessage = writable<string | null>(null);
  const _notifications = writable<Notification[]>([]);

  const setIsLoading = (status: boolean, message?: string) => {
    _isLoading.set(status);
    _loadingMessage.set(message || null);
  };

  const showNotification = (
    type: NotificationType,
    message: string,
    duration: number = 3000
  ): string => {
    const id = `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const notification: Notification = { id, type, message, duration, timestamp: Date.now() };
    
    _notifications.update(n => [...n, notification]);

    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration);
    }
    return id;
  };

  const removeNotification = (id: string) => {
    _notifications.update(n => n.filter(notif => notif.id !== id));
  };

  return {
    subscribe: _notifications.subscribe,
    isLoading: derived(_isLoading, $isLoading => $isLoading),
    loadingMessage: derived(_loadingMessage, $loadingMessage => $loadingMessage),
    notifications: derived(_notifications, $notifications => $notifications),
    setIsLoading,
    showNotification,
    removeNotification,
  };
}

export const uiStore = createUiStore();
```

## `src/lib/stores/itemStore.ts`
```
import { writable, derived } from 'svelte/store';
import type { Item, Priority } from '$lib/types';
import * as itemApi from '$lib/api/itemApi';
import { slugify } from '$lib/utils/slugify';

export interface ItemTree {
	[categorySlug: string]: Item[];
}

export interface CreateItemPayload {
	name: string;
	text: string;
	priority: Priority;
	tags?: string[];
	categories: string[];
}

export interface UpdateItemPayload extends Partial<Omit<CreateItemPayload, 'categories'>> {
	isCompleted?: boolean;
	categories?: string[];
}

function createItemStore() {
	const itemTree = writable<ItemTree>({});
	const isLoading = writable(false);
	const error = writable<string | null>(null);

	// Derived stores
	const categories = derived(itemTree, ($itemTree) => Object.keys($itemTree));

	// Actions
	const fetchItemTree = async (): Promise<ItemTree> => {
		isLoading.set(true);
		error.set(null);
		try {
			const tree = await itemApi.getItemTree();
			console.log('Raw API response:', tree);
			
			// Ensure all categories have arrays of items
			const normalizedTree: ItemTree = {};
			
			// Handle both direct data and wrapped response
			const data = tree.data || tree;
			
			if (data && typeof data === 'object') {
				Object.entries(data).forEach(([categorySlug, items]) => {
					normalizedTree[categorySlug] = Array.isArray(items) ? items : [];
				});
			}
			
			console.log('Normalized tree:', normalizedTree);
			itemTree.set(normalizedTree);
			return normalizedTree;
		} catch (e: any) {
			const errorMessage = e.message || 'Failed to fetch items';
			console.error('Fetch error:', e);
			error.set(errorMessage);
			const emptyTree = {};
			itemTree.set(emptyTree);
			return emptyTree;
		} finally {
			isLoading.set(false);
		}
	};

	const addItem = async (newItemData: CreateItemPayload): Promise<Item | undefined> => {
		isLoading.set(true);
		try {
			const createdItem = await itemApi.createItem(newItemData);
			// Refresh the tree to ensure consistency
			await fetchItemTree();
			return createdItem;
		} catch (e: any) {
			const errorMessage = e.message || 'Failed to add item';
			error.set(errorMessage);
			return undefined;
		} finally {
			isLoading.set(false);
		}
	};

	const updateItem = async (
		originalCategorySlug: string,
		itemSlug: string,
		updateData: UpdateItemPayload
	): Promise<Item | undefined> => {
		isLoading.set(true);
		try {
			const updatedItem = await itemApi.updateItem(originalCategorySlug, itemSlug, updateData);
			// Refresh the tree to handle potential category changes
			await fetchItemTree();
			return updatedItem;
		} catch (e: any) {
			const errorMessage = e.message || 'Failed to update item';
			error.set(errorMessage);
			return undefined;
		} finally {
			isLoading.set(false);
		}
	};

	const toggleItemCompletion = async (item: Item): Promise<Item | undefined> => {
		return updateItem(slugify(item.categories[0]), item.slug, {
			isCompleted: !item.isCompleted
		});
	};

	const deleteItem = async (categorySlug: string, itemSlug: string): Promise<boolean> => {
		isLoading.set(true);
		try {
			await itemApi.deleteItem(categorySlug, itemSlug);
			// Update local tree
			itemTree.update((tree) => {
				if (tree[categorySlug]) {
					tree[categorySlug] = tree[categorySlug].filter((t) => t.slug !== itemSlug);
					if (tree[categorySlug].length === 0) {
						delete tree[categorySlug];
					}
				}
				return tree;
			});
			return true;
		} catch (e: any) {
			const errorMessage = e.message || 'Failed to delete item';
			error.set(errorMessage);
			return false;
		} finally {
			isLoading.set(false);
		}
	};

	return {
		// Stores
		itemTree: { subscribe: itemTree.subscribe },
		categories: { subscribe: categories.subscribe },
		isLoading: { subscribe: isLoading.subscribe },
		error: { subscribe: error.subscribe },
		
		// Actions
		fetchItemTree,
		addItem,
		updateItem,
		toggleItemCompletion,
		deleteItem
	};
}

export const itemStore = createItemStore();

// Export a function that returns the store instance
export function useItemStore() {
	return itemStore;
}

```

## `src/lib/composables/useItemFilters.ts`
```
import { writable, derived } from 'svelte/store';
import type { Item, Priority } from '$lib/types';

export interface ItemTree {
	[categorySlug: string]: Item[];
}

export function useItemFilters(itemTreeAccessor: () => Record<string, Item[]>) {
	// Filter state with writable stores
	const searchQueryStore = writable('');
	const selectedPriorityStore = writable<'all' | Priority>('all');
	const showCompletedStore = writable(true);
	const selectedTagsStore = writable<string[]>([]);

	// Derived readable values - these return the actual values, not stores
	const searchQuery = derived(searchQueryStore, ($searchQuery) => $searchQuery);
	const selectedPriority = derived(selectedPriorityStore, ($selectedPriority) => $selectedPriority);
	const showCompleted = derived(showCompletedStore, ($showCompleted) => $showCompleted);
	const selectedTags = derived(selectedTagsStore, ($selectedTags) => $selectedTags);

	// Setter functions
	const setSearchQuery = (query: string) => searchQueryStore.set(query);
	const setSelectedPriority = (priority: 'all' | Priority) => selectedPriorityStore.set(priority);
	const setShowCompleted = (show: boolean) => showCompletedStore.set(show);

	// Extract all available tags from the item tree
	const allTags = derived(
		[searchQueryStore],
		() => {
			const itemTree = itemTreeAccessor();
			const tags = new Set<string>();
			
			if (itemTree && typeof itemTree === 'object') {
				Object.values(itemTree).forEach((items) => {
					if (Array.isArray(items)) {
						items.forEach((item) => {
							if (item && item.tags && Array.isArray(item.tags)) {
								item.tags.forEach((tag) => {
									if (typeof tag === 'string') {
										tags.add(tag);
									}
								});
							}
						});
					}
				});
			}
			
			return Array.from(tags).sort();
		}
	);

	// Check if any filters are currently active
	const hasActiveFilters = derived(
		[searchQueryStore, selectedPriorityStore, showCompletedStore, selectedTagsStore],
		([$searchQuery, $selectedPriority, $showCompleted, $selectedTags]) => {
			return (
				$searchQuery.trim() !== '' ||
				$selectedPriority !== 'all' ||
				!$showCompleted ||
				$selectedTags.length > 0
			);
		}
	);

	// Apply all filters to the item tree
	const filteredItemTree = derived(
		[searchQueryStore, selectedPriorityStore, showCompletedStore, selectedTagsStore],
		([$searchQuery, $selectedPriority, $showCompleted, $selectedTags]) => {
			const itemTree = itemTreeAccessor();
			const filtered: Record<string, Item[]> = {};

			if (!itemTree || typeof itemTree !== 'object') {
				return filtered;
			}

			Object.entries(itemTree).forEach(([categoryName, items]) => {
				if (!Array.isArray(items)) {
					console.warn(`Items for category ${categoryName} is not an array:`, items);
					return;
				}

				const filteredItems = items.filter((item) => {
					if (!item || typeof item !== 'object') {
						console.warn('Invalid item found:', item);
						return false;
					}

					// Search filter - check name, text, and tags
					if ($searchQuery.trim()) {
						const query = $searchQuery.toLowerCase();
						const matchesSearch =
							(item.name && item.name.toLowerCase().includes(query)) ||
							(item.text && item.text.toLowerCase().includes(query)) ||
							(item.tags && Array.isArray(item.tags) && item.tags.some((tag) => 
								typeof tag === 'string' && tag.toLowerCase().includes(query)
							));
						if (!matchesSearch) return false;
					}

					// Priority filter
					if ($selectedPriority !== 'all' && item.priority !== $selectedPriority) {
						return false;
					}

					// Completion status filter
					if (!$showCompleted && item.isCompleted) {
						return false;
					}

					// Tag filter - item must have at least one selected tag
					if ($selectedTags.length > 0) {
						const hasSelectedTag = $selectedTags.some((tag) =>
							item.tags && Array.isArray(item.tags) && item.tags.includes(tag)
						);
						if (!hasSelectedTag) return false;
					}

					return true;
				});

				// Only include categories that have items after filtering
				if (filteredItems.length > 0) {
					filtered[categoryName] = filteredItems;
				}
			});

			return filtered;
		}
	);

	// Calculate total items across all categories
	const totalItems = derived(
		[searchQueryStore],
		() => {
			const itemTree = itemTreeAccessor();
			if (!itemTree || typeof itemTree !== 'object') {
				return 0;
			}
			return Object.values(itemTree).reduce((total, items) => {
				return total + (Array.isArray(items) ? items.length : 0);
			}, 0);
		}
	);

	// Calculate total filtered items
	const totalFilteredItems = derived(
		filteredItemTree,
		($filteredItemTree) => {
			return Object.values($filteredItemTree).reduce((total, items) => {
				return total + (Array.isArray(items) ? items.length : 0);
			}, 0);
		}
	);

	// Toggle a tag in the selected tags list
	const toggleTag = (tag: string) => {
		selectedTagsStore.update((tags) => {
			const index = tags.indexOf(tag);
			if (index > -1) {
				return tags.filter((t) => t !== tag);
			} else {
				return [...tags, tag];
			}
		});
	};

	// Clear all active filters
	const clearAllFilters = () => {
		searchQueryStore.set('');
		selectedPriorityStore.set('all');
		showCompletedStore.set(true);
		selectedTagsStore.set([]);
	};

	return {
		// Derived readable values
		searchQuery,
		selectedPriority,
		showCompleted,
		selectedTags,
		
		// Setter functions
		setSearchQuery,
		setSelectedPriority,
		setShowCompleted,
		
		// Derived values
		allTags,
		hasActiveFilters,
		filteredItemTree,
		totalItems,
		totalFilteredItems,
		
		// Methods
		toggleTag,
		clearAllFilters
	};
}

```

## `src/lib/types/index.ts`
```
export type Priority = 'low' | 'mid' | 'high';
export type SingleCategory<T = string> = T;

export interface Item {
	id: string;
	slug: string;
	name: string;
	text: string;
	isCompleted: boolean;
	priority: Priority;
	tags: string[];
	categories: SingleCategory<string>[];
	createdAt: string;
	updatedAt: string;
	isEditing?: boolean;
}

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
	error?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
	id: string;
	type: NotificationType;
	message: string;
	duration?: number;
	timestamp: number;
}

export interface ItemTree {
	[categorySlug: string]: Item[];
}

export interface CreateItemPayload {
	name: string;
	text: string;
	priority: Priority;
	tags?: string[];
	categories: SingleCategory<string>[];
}

export type UpdateItemPayload = Partial<Omit<CreateItemPayload, 'categories'>> & {
	isCompleted?: boolean;
	categories?: SingleCategory<string>[];
};

// Updated IconName type with correct Lucide icon names
export type IconName = 
	| 'Pencil'      // For edit (was Edit3)
	| 'Trash'       // For delete (was Trash2)
	| 'Plus'
	| 'Save'
	| 'X'
	| 'Loader'
	| 'Loader2'
	| 'CheckCircle'
	| 'AlertCircle'
	| 'AlertTriangle'
	| 'Info'
	| 'ClipboardList'
	| 'HelpCircle'
	| string; // Allow any string for flexibility

```

## `src/lib/api/itemApi.ts`
```
import { get, post, patch, del } from './apiClient';
import type { Item, Priority } from '$lib/types';

export interface CreateItemPayload {
	name: string;
	text: string;
	priority: Priority;
	tags?: string[];
	categories: string[];
}

export interface UpdateItemPayload extends Partial<Omit<CreateItemPayload, 'categories'>> {
	isCompleted?: boolean;
	categories?: string[];
}

export interface ItemTree {
	[categorySlug: string]: Item[];
}

export async function getItemTree(): Promise<ItemTree> {
	return get<ItemTree>('/items/tree');
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
	return post<Item, CreateItemPayload>('/items', payload);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item> {
	return get<Item>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

export async function updateItem(
	categorySlug: string,
	itemSlug: string,
	payload: UpdateItemPayload
): Promise<Item> {
	return patch<Item, UpdateItemPayload>(
		`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`,
		payload
	);
}

export async function deleteItem(categorySlug: string, itemSlug: string): Promise<{ deleted: boolean }> {
	return del<{ deleted: boolean }>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

```

## `src/lib/api/apiClient.ts`
```
const API_URL_BASE = 'http://localhost:3000/api';

type Result<T, E = string> = 
	| { success: true; data: T }
	| { success: false; error: E };

const success = <T>(data: T): Result<T> => ({ success: true, data });
const failure = <E>(error: E): Result<never, E> => ({ success: false, error });

export interface ApiErrorData {
	message: string;
	statusCode: number;
	details?: any;
}

export const createApiError = (message: string, statusCode: number = 500, details?: any): ApiErrorData => ({
	message,
	statusCode,
	...(details && { details })
});

export const isApiError = (error: any): error is ApiErrorData => {
	return error && typeof error.message === 'string' && typeof error.statusCode === 'number';
};

const request = async <T>(method: string, endpoint: string, body?: any): Promise<Result<T, ApiErrorData>> => {
	try {
		const response = await fetch(`${API_URL_BASE}${endpoint}`, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : undefined
		});

		if (!response.ok) {
			let message = `Request failed (${response.status})`;
			try {
				const errorData = await response.json();
				message = errorData.message || message;
			} catch {
				// Ignore JSON parse errors
			}
			return failure(createApiError(message, response.status));
		}

		const data = await response.json();
		return success(data.data ?? data);
	} catch (error: any) {
		return failure(createApiError(error.message || 'Network request failed', 503));
	}
};

const unwrapResult = async <T>(resultPromise: Promise<Result<T, ApiErrorData>>): Promise<T> => {
	const result = await resultPromise;
	if (!result.success) {
		const error = new Error(result.error.message);
		(error as any).statusCode = result.error.statusCode;
		(error as any).details = result.error.details;
		throw error;
	}
	return result.data;
};

export const get = <T>(endpoint: string) => unwrapResult(request<T>('GET', endpoint));
export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) => 
	unwrapResult(request<TResponse>('POST', endpoint, data));
export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) => 
	unwrapResult(request<TResponse>('PATCH', endpoint, data));
export const del = <TResponse = { deleted: boolean }>(endpoint: string) => 
	unwrapResult(request<TResponse>('DELETE', endpoint));

export const api = { get, post, patch, delete: del };

```

## `src/app.css`
```
@import "tailwindcss";

@layer base {
	* {
		box-sizing: border-box;
	}

	html, body {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	body {
		background-color: rgb(23 23 23); /* neutral-900 */
		color: rgb(245 245 245); /* neutral-100 */
		font-family: 'Inter', system-ui, sans-serif;
		min-height: 100vh;
	}
}

@layer utilities {
	.scrollbar-thin::-webkit-scrollbar {
		width: 4px;
		height: 4px;
	}

	.scrollbar-thin::-webkit-scrollbar-track {
		background-color: rgb(38 38 38); /* neutral-800 */
	}

	.scrollbar-thin::-webkit-scrollbar-thumb {
		background-color: rgb(82 82 82); /* neutral-600 */
		border-radius: 0.25rem;
	}

	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background-color: rgb(115 115 115); /* neutral-500 */
	}
}

```

## `src/app.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Svelte Todo App - Manage Your Tasks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover" class="font-sans">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

## `src/routes/+layout.svelte`
```
<script lang="ts">
  import '../app.css';
  import Notifications from '$lib/components/common/Notifications.svelte';
  
  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen text-neutral-100">
  <header class="border-b border-neutral-800 bg-neutral-900">
    <div class="container px-4 py-4 mx-auto">
      <h1 class="text-xl font-semibold text-neutral-100">Items</h1>
    </div>
  </header>
  <main class="flex-1 w-full">
    {@render children()}
  </main>
  <Notifications />
</div>
```

## `src/routes/+page.svelte`
```
<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import ItemForm from '$lib/components/items/ItemForm.svelte';
	import ItemItem from '$lib/components/items/ItemItem.svelte';
	import Modal from '$lib/components/common/Modal.svelte';
	import ConfirmDeleteModal from '$lib/components/common/ConfirmDeleteModal.svelte';
	import FilterBar from '$lib/components/layout/FilterBar.svelte';
	import AppSidebar from '$lib/components/layout/AppSidebar.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import { useItemStore } from '$lib/stores/itemStore';
	import { useItemFilters } from '$lib/composables/useItemFilters';
	import type { Item } from '$lib/types';
	import { slugify } from '$lib/utils/slugify';

	const itemStore = useItemStore();

	// Reactive state using runes
	let itemTree = $state<Record<string, Item[]>>({});
	let isLoading = $state(false);
	let error = $state<string | null>(null);

	// Modal state
	let showFormModal = $state(false);
	let editingItem = $state<Item | null>(null);
	let isSubmittingForm = $state(false);
	let prefilledCategory = $state('');

	// Delete state
	let showDeleteConfirm = $state(false);
	let itemToDelete = $state<Item | null>(null);
	let isDeleting = $state(false);

	// Use the filtering composable with proper reactive state
	const {
		searchQuery,
		selectedPriority,
		showCompleted,
		selectedTags,
		allTags,
		hasActiveFilters,
		filteredItemTree,
		totalItems,
		totalFilteredItems,
		toggleTag,
		clearAllFilters,
		setSearchQuery,
		setSelectedPriority,
		setShowCompleted
	} = useItemFilters(() => itemTree);

	// Convert store values to reactive values for display
	let searchQueryValue = $state('');
	let selectedPriorityValue = $state<'all' | 'low' | 'mid' | 'high'>('all');
	let showCompletedValue = $state(true);
	let selectedTagsValue = $state<string[]>([]);
	let allTagsValue = $state<string[]>([]);
	let hasActiveFiltersValue = $state(false);
	let filteredItemTreeValue = $state<Record<string, Item[]>>({});
	let totalItemsValue = $state(0);
	let totalFilteredItemsValue = $state(0);

	// Subscribe to store changes and update reactive values
	$effect(() => {
		const unsubscribes = [
			searchQuery.subscribe((value) => (searchQueryValue = value)),
			selectedPriority.subscribe((value) => (selectedPriorityValue = value)),
			showCompleted.subscribe((value) => (showCompletedValue = value)),
			selectedTags.subscribe((value) => (selectedTagsValue = value)),
			allTags.subscribe((value) => (allTagsValue = value)),
			hasActiveFilters.subscribe((value) => (hasActiveFiltersValue = value)),
			filteredItemTree.subscribe((value) => (filteredItemTreeValue = value)),
			totalItems.subscribe((value) => (totalItemsValue = value)),
			totalFilteredItems.subscribe((value) => (totalFilteredItemsValue = value))
		];

		return () => unsubscribes.forEach((unsub) => unsub());
	});

	// Computed values using $derived
	const deleteConfirmationMessage = $derived(() => {
		const itemName = itemToDelete?.name || 'this item';
		return `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;
	});

	// Methods
	const retryFetch = async () => {
		await fetchItemTree();
	};

	const openAddModal = (categoryName?: string) => {
		editingItem = null;
		prefilledCategory = categoryName || '';
		showFormModal = true;
	};

	const openEditModal = (item: Item) => {
		console.log('Opening edit modal for item:', item);
		editingItem = { ...item };
		prefilledCategory = '';
		showFormModal = true;
	};

	const handleFormSubmit = async (formData: any) => {
		console.log('handleFormSubmit called with:', formData);
		console.log('editingItem:', editingItem);
		
		isSubmittingForm = true;
		try {
			if (editingItem?.id) {
				console.log('Updating existing item');
				const originalCategorySlug = slugify(editingItem.categories[0]);
				const result = await itemStore.updateItem(originalCategorySlug, editingItem.slug, formData);
				console.log('Update result:', result);
			} else {
				console.log('Adding new item');
				const result = await itemStore.addItem(formData);
				console.log('Add result:', result);
			}
			
			console.log('Closing modal and refreshing data');
			showFormModal = false;
			editingItem = null;
			prefilledCategory = '';
			
			// Refresh data
			await fetchItemTree();
		} catch (error) {
			console.error('Error in handleFormSubmit:', error);
		} finally {
			isSubmittingForm = false;
		}
	};

	const handleToggleComplete = async (item: Item) => {
		await itemStore.toggleItemCompletion(item);
		await fetchItemTree();
	};

	const confirmDelete = (item: Item) => {
		itemToDelete = item;
		showDeleteConfirm = true;
	};

	const executeDelete = async () => {
		if (!itemToDelete) return;
		isDeleting = true;
		try {
			const categorySlug = slugify(itemToDelete.categories[0]);
			await itemStore.deleteItem(categorySlug, itemToDelete.slug);
			showDeleteConfirm = false;
			itemToDelete = null;
			// Refresh data
			await fetchItemTree();
		} finally {
			isDeleting = false;
		}
	};

	// Initialize data
	const fetchItemTree = async () => {
		isLoading = true;
		error = null;
		try {
			const data = await itemStore.fetchItemTree();
			console.log('Fetched data in component:', data);
			itemTree = data;
		} catch (err) {
			console.error('Error in component:', err);
			error = err instanceof Error ? err.message : 'Failed to fetch items';
			itemTree = {}; // Reset to empty object on error
		} finally {
			isLoading = false;
		}
	};

	onMount(async () => {
		await fetchItemTree();
	});
</script>

<!-- Rest of the template remains the same -->
<div class="min-h-screen bg-neutral-900 text-neutral-100">
	<div class="flex">
		<!-- Sidebar -->
		<AppSidebar
			searchQuery={searchQueryValue}
			onSearchQueryChange={setSearchQuery}
			availableTags={allTagsValue}
			selectedTags={selectedTagsValue}
			onToggleTag={toggleTag}
		/>

		<!-- Main Content -->
		<div class="flex-1 p-6">
			<!-- Header -->
			<div class="flex items-center justify-between mb-6">
				<div>
					<h1 class="text-3xl font-bold text-neutral-100">Items</h1>
					<p class="mt-1 text-neutral-400">
						{#if hasActiveFiltersValue}
							Showing {totalFilteredItemsValue} of {totalItemsValue} items
						{:else}
							{totalItemsValue} items total
						{/if}
					</p>
				</div>
				<Button onclick={() => openAddModal()} variant="primary">
					Add Item
				</Button>
			</div>

			<!-- Filters -->
			<FilterBar
				showPriorityFilter={true}
				selectedPriority={selectedPriorityValue}
				onPriorityChange={setSelectedPriority}
				showStatusFilter={true}
				showCompleted={showCompletedValue}
				onShowCompletedChange={setShowCompleted}
			/>

			{#if hasActiveFiltersValue}
				<div class="mb-4">
					<Button onclick={clearAllFilters} variant="text" size="sm">
						Clear all filters
					</Button>
				</div>
			{/if}

			<!-- Loading State -->
			{#if isLoading}
				<div class="flex items-center justify-center py-12">
					<div class="text-neutral-400">Loading items...</div>
				</div>
			{:else if error}
				<!-- Error State -->
				<div class="p-4 mb-6 border rounded bg-red-900/20 border-red-700/50">
					<h3 class="mb-2 font-medium text-red-300">Error loading items</h3>
					<p class="mb-3 text-sm text-red-400">{error}</p>
					<Button onclick={retryFetch} variant="danger" size="sm">
						Retry
					</Button>
				</div>
			{:else}
				<!-- Items Content -->
				{#if Object.keys(filteredItemTreeValue).length === 0}
					<div class="py-12 text-center">
						<div class="mb-4 text-neutral-500">
							{#if hasActiveFiltersValue}
								No items match your current filters.
							{:else}
								No items found. Create your first item to get started.
							{/if}
						</div>
						{#if !hasActiveFiltersValue}
							<Button onclick={() => openAddModal()} variant="primary">
								Add Your First Item
							</Button>
						{/if}
					</div>
				{:else}
					<!-- Categories and Items -->
					{#each Object.entries(filteredItemTreeValue) as [categoryName, items]}
						{#if Array.isArray(items) && items.length > 0}
							<div class="mb-8">
								<div class="flex items-center mb-4 justify-left">
									<h2 class="text-xl font-semibold capitalize text-neutral-200">
										{categoryName.replace(/-/g, ' ')}
									</h2>
									<Button 
										variant="text" 
										size="sm" 
										onclick={() => openAddModal(categoryName)} 
										icon="Plus" 
										iconOnly
										class="ml-2 text-blue-400 hover:text-blue-300"
									/>
								</div>
								<div class="space-y-3">
									{#each items as item (item.id)}
										<ItemItem
											{item}
											onToggleComplete={handleToggleComplete}
											onEdit={openEditModal}
											onDelete={confirmDelete}
										/>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				{/if}
			{/if}
		</div>
	</div>
</div>

<!-- Add/Edit Modal -->
<Modal bind:isOpen={showFormModal} title={editingItem ? 'Edit Item' : 'New Item'}>
	<ItemForm
		item={editingItem}
		isLoading={isSubmittingForm}
		prefilledCategory={prefilledCategory}
		onSubmit={handleFormSubmit}
		onCancel={() => {
			console.log('Modal cancel clicked');
			showFormModal = false;
		}}
	/>
</Modal>

<!-- Delete Confirmation -->
<ConfirmDeleteModal
	bind:isOpen={showDeleteConfirm}
	title="Delete Item"
	message={deleteConfirmationMessage}
	confirmText="Delete"
	isLoading={isDeleting}
	onConfirm={executeDelete}
	onCancel={() => (showDeleteConfirm = false)}
/>

```

