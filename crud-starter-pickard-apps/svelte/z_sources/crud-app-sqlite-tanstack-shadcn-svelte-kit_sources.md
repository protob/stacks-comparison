# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** wto, 18 lis 2025, 19:33:02 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit

---

## `tsconfig.json`
```
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowImportingTsExtensions": true,
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
	// Path aliases are handled by https://svelte.dev/docs/kit/configuration#alias
	// except $lib which is handled by https://svelte.dev/docs/kit/configuration#files
	//
	// To make changes to top-level options such as include and exclude, we recommend extending
	// the generated config; see https://svelte.dev/docs/kit/configuration#typescript
}

```

## `package.json`
```
{
	"name": "shadcn-simple-svelte-kit",
	"private": true,
	"version": "0.0.1",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"
	},
	"devDependencies": {
		"@internationalized/date": "^3.8.1",
		"@lucide/svelte": "^0.544.0",
		"@sveltejs/adapter-auto": "^7.0.0",
		"@sveltejs/kit": "^2.47.1",
		"@sveltejs/vite-plugin-svelte": "^6.2.1",
		"@tailwindcss/forms": "^0.5.10",
		"@tailwindcss/typography": "^0.5.19",
		"@tailwindcss/vite": "^4.1.14",
		"bits-ui": "^2.11.0",
		"clsx": "^2.1.1",
		"svelte": "^5.41.0",
		"svelte-check": "^4.3.3",
		"tailwind-merge": "^3.3.1",
		"tailwind-variants": "^3.1.1",
		"tailwindcss": "^4.1.14",
		"tw-animate-css": "^1.4.0",
		"typescript": "^5.9.3",
		"vite": "^7.1.10"
	},
	"dependencies": {
		"@tanstack/svelte-form": "^1.25.0",
		"@tanstack/svelte-query": "^6.0.8",
		"@tanstack/zod-form-adapter": "^0.42.1",
		"ofetch": "^1.5.1",
		"svelte-sonner": "^1.0.6",
		"zod": "^4.1.12"
	}
}

```

## `README.md`
```
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

```

## `.svelte-kit/tsconfig.json`
```
{
	"compilerOptions": {
		"paths": {
			"lib": [
				"../src/lib"
			],
			"lib/*": [
				"../src/lib/*"
			],
			"$lib": [
				"../src/lib"
			],
			"$lib/*": [
				"../src/lib/*"
			],
			"$app/types": [
				"./types/index.d.ts"
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
 * ```sh
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const LSCOLORS: string;
	export const SESSION_MANAGER: string;
	export const WINDOWID: string;
	export const USER_ZDOTDIR: string;
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
	export const KITTY_PID: string;
	export const NO_AT_BRIDGE: string;
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
	export const KITTY_PUBLIC_KEY: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const TERMINAL: string;
	export const GJS_DEBUG_TOPICS: string;
	export const ZSH_TMUX_CONFIG: string;
	export const GRIM_DEFAULT_DIR: string;
	export const VSCODE_INJECTION: string;
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
	export const GIT_ASKPASS: string;
	export const INVOCATION_ID: string;
	export const DCONF_PROFILE: string;
	export const MANAGERPID: string;
	export const CHROME_DESKTOP: string;
	export const QT_QPA_PLATFORM: string;
	export const NIX_USER_PROFILE_DIR: string;
	export const INFOPATH: string;
	export const npm_lifecycle_script: string;
	export const GJS_DEBUG_OUTPUT: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const GNOME_SETUP_DISPLAY: string;
	export const TERMINFO: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_name: string;
	export const GTK_PATH: string;
	export const ZDOTDIR: string;
	export const USER: string;
	export const TMUX_PANE: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
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
	export const FC_FONTATIONS: string;
	export const LD_LIBRARY_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const ZSH_TMUX_TERM: string;
	export const NIX_XDG_DESKTOP_PORTAL_DIR: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const X11_BASE_RULES_XML: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const JOURNAL_STREAM: string;
	export const XCURSOR_THEME: string;
	export const XDG_DATA_DIRS: string;
	export const GDK_BACKEND: string;
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
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		LSCOLORS: string;
		SESSION_MANAGER: string;
		WINDOWID: string;
		USER_ZDOTDIR: string;
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
		KITTY_PID: string;
		NO_AT_BRIDGE: string;
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
		KITTY_PUBLIC_KEY: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		TERMINAL: string;
		GJS_DEBUG_TOPICS: string;
		ZSH_TMUX_CONFIG: string;
		GRIM_DEFAULT_DIR: string;
		VSCODE_INJECTION: string;
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
		GIT_ASKPASS: string;
		INVOCATION_ID: string;
		DCONF_PROFILE: string;
		MANAGERPID: string;
		CHROME_DESKTOP: string;
		QT_QPA_PLATFORM: string;
		NIX_USER_PROFILE_DIR: string;
		INFOPATH: string;
		npm_lifecycle_script: string;
		GJS_DEBUG_OUTPUT: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		GNOME_SETUP_DISPLAY: string;
		TERMINFO: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		npm_package_name: string;
		GTK_PATH: string;
		ZDOTDIR: string;
		USER: string;
		TMUX_PANE: string;
		VSCODE_GIT_IPC_HANDLE: string;
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
		FC_FONTATIONS: string;
		LD_LIBRARY_PATH: string;
		XDG_RUNTIME_DIR: string;
		ZSH_TMUX_TERM: string;
		NIX_XDG_DESKTOP_PORTAL_DIR: string;
		npm_package_json: string;
		LC_TIME: string;
		X11_BASE_RULES_XML: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		JOURNAL_STREAM: string;
		XCURSOR_THEME: string;
		XDG_DATA_DIRS: string;
		GDK_BACKEND: string;
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


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/about" | "/items" | "/items/[categorySlug]" | "/items/[categorySlug]/[itemSlug]";
		RouteParams(): {
			"/items/[categorySlug]": { categorySlug: string };
			"/items/[categorySlug]/[itemSlug]": { categorySlug: string; itemSlug: string }
		};
		LayoutParams(): {
			"/": { categorySlug?: string; itemSlug?: string };
			"/about": Record<string, never>;
			"/items": { categorySlug?: string; itemSlug?: string };
			"/items/[categorySlug]": { categorySlug: string; itemSlug?: string };
			"/items/[categorySlug]/[itemSlug]": { categorySlug: string; itemSlug: string }
		};
		Pathname(): "/" | "/about" | "/about/" | "/items" | "/items/" | `/items/${string}` & {} | `/items/${string}/` & {} | `/items/${string}/${string}` & {} | `/items/${string}/${string}/` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}
```

## `.svelte-kit/types/src/routes/items/[categorySlug]/[itemSlug]/proxy+page.ts`
```
// @ts-nocheck
// /src/routes/items/[categorySlug]/[itemSlug]/+page.ts
import type { PageLoad } from './$types';

export const load = async ({ params }: Parameters<PageLoad>[0]) => {
  const { categorySlug, itemSlug } = params;

  return {
    categorySlug,
    itemSlug
  };
};
```

## `.svelte-kit/types/src/routes/items/[categorySlug]/[itemSlug]/$types.d.ts`
```
import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = { categorySlug: string; itemSlug: string };
type RouteId = '/items/[categorySlug]/[itemSlug]';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<import('../../../$types.js').LayoutData>;

export type EntryGenerator = () => Promise<Array<RouteParams>> | Array<RouteParams>;
export type PageServerData = null;
export type PageLoad<OutputData extends OutputDataShape<PageParentData> = OutputDataShape<PageParentData>> = Kit.Load<RouteParams, PageServerData, PageParentData, OutputData, RouteId>;
export type PageLoadEvent = Parameters<PageLoad>[0];
export type PageData = Expand<Omit<PageParentData, keyof Kit.LoadProperties<Awaited<ReturnType<typeof import('./proxy+page.js').load>>>> & OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('./proxy+page.js').load>>>>>>;
export type PageProps = { params: RouteParams; data: PageData }
```

## `.svelte-kit/types/src/routes/about/$types.d.ts`
```
import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/about';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<import('../$types.js').LayoutData>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { params: RouteParams; data: PageData }
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
type LayoutRouteId = RouteId | "/" | "/about" | "/items/[categorySlug]/[itemSlug]" | null
type LayoutParams = RouteParams & { categorySlug?: string; itemSlug?: string }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageData = Expand<PageParentData>;
export type PageProps = { params: RouteParams; data: PageData }
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }
```

## `.svelte-kit/types/route_meta_data.json`
```
{
	"/": [],
	"/about": [],
	"/items/[categorySlug]/[itemSlug]": [
		"src/routes/items/[categorySlug]/[itemSlug]/+page.ts"
	]
}
```

## `.svelte-kit/generated/server/internal.js`
```

import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '$app/paths/internal/server';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	async: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	csrf_trusted_origins: [],
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	service_worker_options: undefined,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body data-sveltekit-preload-data=\"hover\">\n\t\t<div style=\"display: contents\">" + body + "</div>\n\t</body>\n</html>\n",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "3f269c"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let handleValidationError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		handleValidationError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation };

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

## `.svelte-kit/generated/client/nodes/4.js`
```
import * as universal from "../../../../src/routes/items/[categorySlug]/[itemSlug]/+page.ts";
export { universal };
export { default as component } from "../../../../src/routes/items/[categorySlug]/[itemSlug]/+page.svelte";
```

## `.svelte-kit/generated/client/nodes/1.js`
```
export { default as component } from "../../../../node_modules/@sveltejs/kit/src/runtime/components/svelte-5/error.svelte";
```

## `.svelte-kit/generated/client/nodes/3.js`
```
export { default as component } from "../../../../src/routes/about/+page.svelte";
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
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/items/[categorySlug]/[itemSlug]": [4]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

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
							<Pyramid_0 bind:this={components[0]} data={data_0} {form} params={page.params}>
								<!-- svelte-ignore binding_property_non_reactive -->
										<Pyramid_1 bind:this={components[1]} data={data_1} {form} params={page.params} />
							</Pyramid_0>

{:else}
	{@const Pyramid_0 = constructors[0]}
	<!-- svelte-ignore binding_property_non_reactive -->
	<Pyramid_0 bind:this={components[0]} data={data_0} {form} params={page.params} />

{/if}

{#if mounted}
	<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px">
		{#if navigated}
			{title}
		{/if}
	</div>
{/if}
```

## `.svelte-kit/generated/client-optimized/nodes/2.js`
```
export { default as component } from "../../../../src/routes/+page.svelte";
```

## `.svelte-kit/generated/client-optimized/nodes/0.js`
```
export { default as component } from "../../../../src/routes/+layout.svelte";
```

## `.svelte-kit/generated/client-optimized/nodes/4.js`
```
import * as universal from "../../../../src/routes/items/[categorySlug]/[itemSlug]/+page.ts";
export { universal };
export { default as component } from "../../../../src/routes/items/[categorySlug]/[itemSlug]/+page.svelte";
```

## `.svelte-kit/generated/client-optimized/nodes/1.js`
```
export { default as component } from "../../../../node_modules/@sveltejs/kit/src/runtime/components/svelte-5/error.svelte";
```

## `.svelte-kit/generated/client-optimized/nodes/3.js`
```
export { default as component } from "../../../../src/routes/about/+page.svelte";
```

## `.svelte-kit/generated/client-optimized/matchers.js`
```
export const matchers = {};
```

## `.svelte-kit/generated/client-optimized/app.js`
```
export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/about": [3],
		"/items/[categorySlug]/[itemSlug]": [4]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';
```

## `svelte.config.js`
```
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      lib: path.resolve('src/lib')
    }
  }
};

export default config;

```

## `vite.config.ts`
```
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});

```

## `src/app.d.ts`
```
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

```

## `src/lib/components/items/items/ItemItem.svelte`
```
<script lang="ts">
   import { Badge } from '$lib/components/ui/badge';
   import { Button } from '$lib/components/ui/button';
   import { Checkbox } from '$lib/components/ui/checkbox';
   import { useUpdateItem, useDeleteItem } from '$lib/api/itemsQuery';
   import { formatDate } from '$lib/utils/helpers';
   import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension
   import type { Item } from '$lib/types';
   import { Pencil, Trash2 } from '@lucide/svelte';
 
   let { item } = $props<{ item: Item }>();
 
   const { mutate: updateItem } = useUpdateItem();
   const { mutate: deleteItem } = useDeleteItem();
 
   function toggleComplete() {
     updateItem({
       id: item.id,
       payload: { isCompleted: !item.isCompleted },
     });
   }
 
   function handleDelete() {
     if (confirm('Are you sure you want to delete this item?')) {
       deleteItem(item.id);
     }
   }
 </script>
 
<div class="flex items-start gap-4 p-4 border rounded-lg bg-card opacity-60" class:opacity-100={!item.isCompleted}>
    <div class="mt-1">
      <Checkbox
        checked={item.isCompleted}
        onchange={toggleComplete}
      />
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between">
          <h3 
            class="text-lg font-semibold"
            class:line-through={item.isCompleted}
            class:text-muted-foreground={item.isCompleted}
          >
            {item.name}
          </h3>
           <Badge class="tag-priority-{item.priority}" variant="outline">
             {item.priority}
           </Badge>
      </div>
      <p class="mb-3 text-muted-foreground">{item.text}</p>

      <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
          <div class="flex gap-2">
              <Button size="sm" variant="ghost" onclick={() => uiStore.openForm(item)}>
                  <Pencil class="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onclick={handleDelete}>
                  <Trash2 class="w-4 h-4" />
              </Button>
          </div>
      </div>

      <div class="flex gap-2 mt-3">
        {#each item.tags as tag (tag)}
          <Badge variant="secondary">{tag}</Badge>
        {/each}
      </div>
    </div>
</div>
```

## `src/lib/components/items/items/ItemForm.svelte`
```
<script lang="ts">
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Badge } from '$lib/components/ui/badge';
  import { useAddItem, useUpdateItem } from '$lib/api/itemsQuery'; // Import update hook
  import { itemFormSchema } from '$lib/schemas/itemSchema';
  import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension

  let { onClose } = $props<{ onClose: () => void }>();

  const { mutate: addItem } = useAddItem();
  const { mutate: updateItem } = useUpdateItem();

  let currentTag = $state('');
  
  // Initialize form data based on uiStore.editingItem
  let formData = $state({
    name: uiStore.editingItem?.name || '',
    text: uiStore.editingItem?.text || '',
    priority: (uiStore.editingItem?.priority || 'mid') as 'low' | 'mid' | 'high',
    tags: uiStore.editingItem?.tags ? [...uiStore.editingItem.tags] : [] as string[],
    categories: [uiStore.preselectedCategory || (uiStore.editingItem?.categories?.[0] ? String(uiStore.editingItem.categories[0]) : 'general')] as [string],
  });

  let errors = $state<Record<string, string>>({});

  function validateForm() {
    errors = {};
    const result = itemFormSchema.safeParse(formData);
    
    if (!result.success) {
      result.error.issues.forEach((error: any) => {
        errors[error.path[0] as string] = error.message;
      });
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    const payload = {
      ...formData,
      categories: [formData.categories[0]] as [string] // Ensure tuple type for API
    };

    const onSuccess = () => {
      if (onClose) onClose();
    };

    if (uiStore.editingItem) {
      updateItem({
        id: uiStore.editingItem.id,
        payload: payload
      }, { onSuccess });
    } else {
      addItem(payload, { onSuccess });
    }
  }

  function addTag() {
    const newTag = currentTag.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      formData.tags = [...formData.tags, newTag];
    }
    currentTag = '';
  }

  function removeTag(tagToRemove: string) {
    formData.tags = formData.tags.filter(tag => tag !== tagToRemove);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  }
</script>

<Dialog open={true} onOpenChange={(open) => !open && onClose()}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{uiStore.editingItem ? 'Edit Task' : 'Add New Task'}</DialogTitle>
    </DialogHeader>
    
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
      <!-- Name Field -->
      <div>
        <Label for="name">Task Name</Label>
        <Input
          id="name"
          bind:value={formData.name}
          placeholder="e.g., Finalize project report"
        />
        {#if errors.name}
          <p class="mt-1 text-sm text-destructive">{errors.name}</p>
        {/if}
      </div>

      <!-- Description Field -->
      <div>
        <Label for="text">Description</Label>
        <Input
          id="text"
          bind:value={formData.text}
          placeholder="Add more details about task..."
        />
        {#if errors.text}
          <p class="mt-1 text-sm text-destructive">{errors.text}</p>
        {/if}
      </div>

      <!-- Category Field -->
      <div>
        <Label for="category">Category</Label>
        <Input
          id="category"
          bind:value={formData.categories[0]}
          placeholder="e.g., Work"
        />
        {#if errors.categories}
          <p class="mt-1 text-sm text-destructive">{errors.categories}</p>
        {/if}
      </div>

      <!-- Priority Field -->
      <div>
        <Label>Priority</Label>
        <RadioGroup
          bind:value={formData.priority}
          class="flex items-center gap-4 mt-2"
        >
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-low" value="low" />
            <Label for="p-low">Low</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-mid" value="mid" />
            <Label for="p-mid">Mid</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-high" value="high" />
            <Label for="p-high">High</Label>
          </div>
        </RadioGroup>
      </div>

      <!-- Tags Field -->
      <div>
        <Label>Tags</Label>
        <div class="flex items-center gap-2 mt-2">
          <Input
            bind:value={currentTag}
            onkeydown={handleKeydown}
            placeholder="Add a tag..."
          />
          <Button type="button" variant="outline" onclick={addTag}>Add</Button>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          {#each formData.tags as tag (tag)}
            <Badge
              variant="secondary"
              class="cursor-pointer"
              onclick={() => removeTag(tag)}
            >
              {tag} ×
            </Badge>
          {/each}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
        <Button type="submit">{uiStore.editingItem ? 'Update' : 'Create'} Task</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>
```

## `src/lib/components/items/ItemItem.svelte`
```
<script lang="ts">
   import { Badge } from '$lib/components/ui/badge';
   import { Button } from '$lib/components/ui/button';
   import { Checkbox } from '$lib/components/ui/checkbox';
   import { useUpdateItem, useDeleteItem } from '$lib/api/itemsQuery';
   import { formatDate } from '$lib/utils/helpers';
   import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension
   import type { Item } from '$lib/types';
   import { Pencil, Trash2 } from '@lucide/svelte';
 
   let { item } = $props<{ item: Item }>();
 
   const { mutate: updateItem } = useUpdateItem();
   const { mutate: deleteItem } = useDeleteItem();
 
   function toggleComplete() {
     updateItem({
       id: item.id,
       payload: { isCompleted: !item.isCompleted },
     });
   }
 
   function handleDelete() {
     if (confirm('Are you sure you want to delete this item?')) {
       deleteItem(item.id);
     }
   }
 </script>
 
<div class="flex items-start gap-4 p-4 border rounded-lg bg-card opacity-60" class:opacity-100={!item.isCompleted}>
    <div class="mt-1">
      <Checkbox
        checked={item.isCompleted}
        onchange={toggleComplete}
      />
    </div>
    <div class="flex-1">
      <div class="flex items-center justify-between">
          <h3 
            class="text-lg font-semibold"
            class:line-through={item.isCompleted}
            class:text-muted-foreground={item.isCompleted}
          >
            {item.name}
          </h3>
           <Badge class="tag-priority-{item.priority}" variant="outline">
             {item.priority}
           </Badge>
      </div>
      <p class="mb-3 text-muted-foreground">{item.text}</p>

      <div class="flex items-center justify-between">
          <p class="text-xs text-muted-foreground">{formatDate(item.createdAt)}</p>
          <div class="flex gap-2">
              <Button size="sm" variant="ghost" onclick={() => uiStore.openForm(item)}>
                  <Pencil class="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onclick={handleDelete}>
                  <Trash2 class="w-4 h-4" />
              </Button>
          </div>
      </div>

      <div class="flex gap-2 mt-3">
        {#each item.tags as tag (tag)}
          <Badge variant="secondary">{tag}</Badge>
        {/each}
      </div>
    </div>
</div>
```

## `src/lib/components/items/ItemForm.svelte`
```
<script lang="ts">
  import { Dialog, DialogContent, DialogHeader, DialogTitle } from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Badge } from '$lib/components/ui/badge';
  import { useAddItem, useUpdateItem } from '$lib/api/itemsQuery'; // Import update hook
  import { itemFormSchema } from '$lib/schemas/itemSchema';
  import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension

  let { onClose } = $props<{ onClose: () => void }>();

  const { mutate: addItem } = useAddItem();
  const { mutate: updateItem } = useUpdateItem();

  let currentTag = $state('');
  
  // Initialize form data based on uiStore.editingItem
  let formData = $state({
    name: uiStore.editingItem?.name || '',
    text: uiStore.editingItem?.text || '',
    priority: (uiStore.editingItem?.priority || 'mid') as 'low' | 'mid' | 'high',
    tags: uiStore.editingItem?.tags ? [...uiStore.editingItem.tags] : [] as string[],
    categories: [uiStore.preselectedCategory || (uiStore.editingItem?.categories?.[0] ? String(uiStore.editingItem.categories[0]) : 'general')] as [string],
  });

  let errors = $state<Record<string, string>>({});

  function validateForm() {
    errors = {};
    const result = itemFormSchema.safeParse(formData);
    
    if (!result.success) {
      result.error.errors.forEach((error) => {
        errors[error.path[0] as string] = error.message;
      });
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    const payload = {
      ...formData,
      categories: [formData.categories[0]] as [string] // Ensure tuple type for API
    };

    const onSuccess = () => {
      if (onClose) onClose();
    };

    if (uiStore.editingItem) {
      updateItem({
        id: uiStore.editingItem.id,
        payload: payload
      }, { onSuccess });
    } else {
      addItem(payload, { onSuccess });
    }
  }

  function addTag() {
    const newTag = currentTag.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      formData.tags = [...formData.tags, newTag];
    }
    currentTag = '';
  }

  function removeTag(tagToRemove: string) {
    formData.tags = formData.tags.filter(tag => tag !== tagToRemove);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    }
  }
</script>

<Dialog open={true} onOpenChange={(open) => !open && onClose()}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{uiStore.editingItem ? 'Edit Task' : 'Add New Task'}</DialogTitle>
    </DialogHeader>
    
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
      <!-- Name Field -->
      <div>
        <Label for="name">Task Name</Label>
        <Input
          id="name"
          bind:value={formData.name}
          placeholder="e.g., Finalize project report"
        />
        {#if errors.name}
          <p class="mt-1 text-sm text-destructive">{errors.name}</p>
        {/if}
      </div>

      <!-- Description Field -->
      <div>
        <Label for="text">Description</Label>
        <Input
          id="text"
          bind:value={formData.text}
          placeholder="Add more details about task..."
        />
        {#if errors.text}
          <p class="mt-1 text-sm text-destructive">{errors.text}</p>
        {/if}
      </div>

      <!-- Category Field -->
      <div>
        <Label for="category">Category</Label>
        <Input
          id="category"
          bind:value={formData.categories[0]}
          placeholder="e.g., Work"
        />
        {#if errors.categories}
          <p class="mt-1 text-sm text-destructive">{errors.categories}</p>
        {/if}
      </div>

      <!-- Priority Field -->
      <div>
        <Label>Priority</Label>
        <RadioGroup
          bind:value={formData.priority}
          class="flex items-center gap-4 mt-2"
        >
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-low" value="low" />
            <Label for="p-low">Low</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-mid" value="mid" />
            <Label for="p-mid">Mid</Label>
          </div>
          <div class="flex items-center space-x-2">
            <RadioGroupItem id="p-high" value="high" />
            <Label for="p-high">High</Label>
          </div>
        </RadioGroup>
      </div>

      <!-- Tags Field -->
      <div>
        <Label>Tags</Label>
        <div class="flex items-center gap-2 mt-2">
          <Input
            bind:value={currentTag}
            onkeydown={handleKeydown}
            placeholder="Add a tag..."
          />
          <Button type="button" variant="outline" onclick={addTag}>Add</Button>
        </div>
        <div class="flex flex-wrap gap-2 mt-2">
          {#each formData.tags as tag (tag)}
            <Badge
              variant="secondary"
              class="cursor-pointer"
              onclick={() => removeTag(tag)}
            >
              {tag} ×
            </Badge>
          {/each}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onclick={onClose}>Cancel</Button>
        <Button type="submit">{uiStore.editingItem ? 'Update' : 'Create'} Task</Button>
      </div>
    </form>
  </DialogContent>
</Dialog>
```

## `src/lib/components/layout/FilterBar.svelte`
```
<script lang="ts">
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Label } from '$lib/components/ui/label';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';

  let { 
    priority = $bindable('all'),
    showCompleted = $bindable(true),
    hasActiveFilters = false,
    allTags = [],
    selectedTags = $bindable([]),
    search = $bindable('')
  } = $props();

  const dispatch = createEventDispatcher();

  function handleClear() {
    dispatch('clear');
  }
</script>

<div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <Label class="block mb-2">Priority</Label>
      <RadioGroup bind:value={priority} class="flex items-center gap-4">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-all" value="all" />
          <Label for="r-all">All</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-low" value="low" />
          <Label for="r-low">Low</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-mid" value="mid" />
          <Label for="r-mid">Mid</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-high" value="high" />
          <Label for="r-high">High</Label>
        </div>
      </RadioGroup>
    </div>

    <div>
      <Label class="block mb-2">Status</Label>
      <div class="flex items-center gap-2">
        <Checkbox
          id="show-completed"
          bind:checked={showCompleted}
        />
        <Label for="show-completed">Show Completed</Label>
      </div>
    </div>
  </div>

  {#if hasActiveFilters}
    <Button
      variant="ghost"
      size="sm"
      onclick={handleClear}
      class="mt-4"
    >
      Clear Filters
    </Button>
  {/if}
</div>
```

## `src/lib/components/layout/MainLayout.svelte`
```
<!-- src/lib/components/layout/MainLayout.svelte -->
<script lang="ts">
  import AppSidebar from '$lib/components/layout/AppSidebar.svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';

  export let currentPath: string;
  export let onNavigate: (path: string) => void;
</script>

<div class="flex min-h-screen bg-background text-foreground">
  <AppSidebar on:navigate={(e) => onNavigate(e.detail)} />
  <div class="flex-1 max-w-5xl mx-auto p-fluid-6">
    <TopBar currentPath={currentPath} on:navigate={(e) => onNavigate(e.detail)} />
    <slot />
  </div>
</div>
```

## `src/lib/components/layout/layout/FilterBar.svelte`
```
<script lang="ts">
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Label } from '$lib/components/ui/label';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Button } from '$lib/components/ui/button';
  import { createEventDispatcher } from 'svelte';

  let { 
    priority = $bindable('all'),
    showCompleted = $bindable(true),
    hasActiveFilters = false,
    allTags = [],
    selectedTags = $bindable([]),
    search = $bindable('')
  } = $props();

  const dispatch = createEventDispatcher();

  function handleClear() {
    dispatch('clear');
  }
</script>

<div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
      <Label class="block mb-2">Priority</Label>
      <RadioGroup bind:value={priority} class="flex items-center gap-4">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-all" value="all" />
          <Label for="r-all">All</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-low" value="low" />
          <Label for="r-low">Low</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-mid" value="mid" />
          <Label for="r-mid">Mid</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="r-high" value="high" />
          <Label for="r-high">High</Label>
        </div>
      </RadioGroup>
    </div>

    <div>
      <Label class="block mb-2">Status</Label>
      <div class="flex items-center gap-2">
        <Checkbox
          id="show-completed"
          bind:checked={showCompleted}
        />
        <Label for="show-completed">Show Completed</Label>
      </div>
    </div>
  </div>

  {#if hasActiveFilters}
    <Button
      variant="ghost"
      size="sm"
      onclick={handleClear}
      class="mt-4"
    >
      Clear Filters
    </Button>
  {/if}
</div>
```

## `src/lib/components/layout/layout/MainLayout.svelte`
```
<!-- src/lib/components/layout/MainLayout.svelte -->
<script lang="ts">
  import AppSidebar from './AppSidebar.svelte';
  import TopBar from './TopBar.svelte';
</script>

<div class="flex min-h-screen bg-background text-foreground">
  <AppSidebar />
  <div class="flex-1 max-w-5xl mx-auto p-fluid-6">
    <TopBar />
    <slot />
  </div>
</div>
```

## `src/lib/components/layout/layout/AppSidebar.svelte`
```
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension
  import { Sun, Moon } from '@lucide/svelte';

  let searchQuery = $state('');
  let allTags = ['project', 'personal', 'work'];
  let selectedTags = $state<string[]>([]);

  function toggleTag(tag: string) {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      selectedTags.splice(index, 1);
    } else {
      selectedTags.push(tag);
    }
  }
</script>

<aside class="flex flex-col p-4 border-r bg-surface border-border">
  <div class="p-2 mb-4">
    <h2 class="text-xl font-bold">TodoApp</h2>
  </div>

  <div class="flex-1 space-y-4">
    <!-- Search -->
    <div class="px-2">
      <Input bind:value={searchQuery} placeholder="Search tasks..." />
    </div>

    <Separator />

    <!-- Tags Section -->
    <div class="px-2">
      <h3 class="mb-2 text-sm font-semibold text-text-muted">Tags</h3>
      <div class="flex flex-wrap gap-2">
        {#each allTags as tag (tag)}
          <Button
            onclick={() => toggleTag(tag)}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            size="sm"
            class="rounded-full"
          >
            {tag}
          </Button>
        {/each}
      </div>
    </div>

    <!-- Add New Item Button -->
    <div class="px-2 mt-4">
      <Button class="w-full" onclick={() => uiStore.openForm()}>
        + Add Item
      </Button>
    </div>
  </div>

  <!-- Footer / Theme Toggle -->
  <div class="mt-auto">
    <Button variant="ghost" onclick={() => uiStore.toggleTheme()} class="justify-start w-full">
      {#if uiStore.theme !== 'dark'}
        <Sun class="w-4 h-4" />
      {:else}
        <Moon class="w-4 h-4" />
      {/if}
    </Button>
  </div>
</aside>
```

## `src/lib/components/layout/layout/TopBar.svelte`
```
<script lang="ts">
  import { page } from '$app/stores';

  // Use SvelteKit's page store to get current path
  $: currentPath = $page.url.pathname;
</script>

<header class="flex justify-end items-center pb-4 mb-4 border-b border-border">
  <nav class="flex items-center gap-4">
    <a 
      href="/"
      class={currentPath === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      Home
    </a>
    <a 
      href="/about"
      class={currentPath.startsWith('/about') ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      About
    </a>
  </nav>
</header>
```

## `src/lib/components/layout/AppSidebar.svelte`
```
<!-- src/lib/components/layout/AppSidebar.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';
  import { uiStore } from '$lib/stores/uiStore.svelte';
  import { Sun, Moon } from '@lucide/svelte';

  let searchQuery = $state('');
  let allTags = ['project', 'personal', 'work'];
  let selectedTags = $state<string[]>([]);

  function toggleTag(tag: string) {
    const index = selectedTags.indexOf(tag);
    if (index !== -1) {
      selectedTags.splice(index, 1);
      selectedTags = [...selectedTags];
    } else {
      selectedTags = [...selectedTags, tag];
    }
  }
</script>

<aside class="flex flex-col p-4 border-r bg-surface border-border">
  <div class="p-2 mb-4">
    <h2 class="text-xl font-bold">Todo App</h2>
  </div>

  <div class="flex-1 space-y-4">
    <!-- Search -->
    <div class="px-2">
      <Input bind:value={searchQuery} placeholder="Search tasks..." />
    </div>

    <Separator />

    <!-- Tags Section -->
    <div class="px-2">
      <h3 class="mb-2 text-sm font-semibold text-text-muted">Tags</h3>
      <div class="flex flex-wrap gap-2">
        {#each allTags as tag}
          <Button
            onclick={() => toggleTag(tag)}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            size="sm"
            class="rounded-full"
          >
            {tag}
          </Button>
        {/each}
      </div>
    </div>

    <!-- Add New Item Button -->
    <div class="px-2 mt-4">
      <Button class="w-full" onclick={() => uiStore.openForm()}>
        Add Item
      </Button>
    </div>
  </div>

  <!-- Footer Theme Toggle -->
  <div class="mt-auto">
    <Button
      variant="ghost"
      onclick={() => uiStore.toggleTheme()}
      class="justify-start w-full"
    >
      {#if uiStore.theme !== 'dark'}
        <Sun class="w-4 h-4" />
      {:else}
        <Moon class="w-4 h-4" />
      {/if}
    </Button>
  </div>
</aside>
```

## `src/lib/components/layout/TopBar.svelte`
```
<script lang="ts">
  // Received from +layout.svelte via $page store
  let { currentPath = '/' } = $props();
</script>

<header class="flex items-center justify-end pb-4 mb-4 border-b border-border">
  <nav class="flex items-center gap-4">
    <a 
      href="/"
      class={currentPath === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      Home
    </a>
    <a 
      href="/about"
      class={currentPath.startsWith('/about') ? 'text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}
    >
      About
    </a>
  </nav>
</header>
```

## `src/lib/components/ui/button/button.svelte`
```
<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
				destructive:
					"bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
				outline:
					"bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
				secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{disabled}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}

```

## `src/lib/components/ui/button/index.ts`
```
import Root, {
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	buttonVariants,
} from "./button.svelte";

export {
	Root,
	type ButtonProps as Props,
	//
	Root as Button,
	buttonVariants,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
};

```

## `src/lib/components/ui/checkbox/index.ts`
```
import Root from "./checkbox.svelte";
export {
	Root,
	//
	Root as Checkbox,
};

```

## `src/lib/components/ui/checkbox/checkbox.svelte`
```
<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from "bits-ui";
	import CheckIcon from "@lucide/svelte/icons/check";
	import MinusIcon from "@lucide/svelte/icons/minus";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
	bind:ref
	data-slot="checkbox"
	class={cn(
		"border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-xs peer flex size-4 shrink-0 items-center justify-center rounded-[4px] border outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<div data-slot="checkbox-indicator" class="text-current transition-none">
			{#if checked}
				<CheckIcon class="size-3.5" />
			{:else if indeterminate}
				<MinusIcon class="size-3.5" />
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>

```

## `src/lib/components/ui/label/label.svelte`
```
<script lang="ts">
	import { Label as LabelPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: LabelPrimitive.RootProps = $props();
</script>

<LabelPrimitive.Root
	bind:ref
	data-slot="label"
	class={cn(
		"flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
		className
	)}
	{...restProps}
/>

```

## `src/lib/components/ui/label/index.ts`
```
import Root from "./label.svelte";

export {
	Root,
	//
	Root as Label,
};

```

## `src/lib/components/ui/input/input.svelte`
```
<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, "type"> &
			({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		"data-slot": dataSlot = "input",
		...restProps
	}: Props = $props();
</script>

{#if type === "file"}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			"selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50",
			"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
			"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot={dataSlot}
		class={cn(
			"border-input bg-background selection:bg-primary dark:bg-input/30 selection:text-primary-foreground ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
			"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
			"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
			className
		)}
		{type}
		bind:value
		{...restProps}
	/>
{/if}

```

## `src/lib/components/ui/input/index.ts`
```
import Root from "./input.svelte";

export {
	Root,
	//
	Root as Input,
};

```

## `src/lib/components/ui/dialog/dialog-footer.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-footer"
	class={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/dialog/dialog-close.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: DialogPrimitive.CloseProps = $props();
</script>

<DialogPrimitive.Close bind:ref data-slot="dialog-close" {...restProps} />

```

## `src/lib/components/ui/dialog/dialog-trigger.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: DialogPrimitive.TriggerProps = $props();
</script>

<DialogPrimitive.Trigger bind:ref data-slot="dialog-trigger" {...restProps} />

```

## `src/lib/components/ui/dialog/dialog-content.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import XIcon from "@lucide/svelte/icons/x";
	import type { Snippet } from "svelte";
	import * as Dialog from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = true,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: DialogPrimitive.PortalProps;
		children: Snippet;
		showCloseButton?: boolean;
	} = $props();
</script>

<Dialog.Portal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(
			"bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
			className
		)}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close
				class="ring-offset-background focus:ring-ring rounded-xs focus:outline-hidden absolute end-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
			>
				<XIcon />
				<span class="sr-only">Close</span>
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
</Dialog.Portal>

```

## `src/lib/components/ui/dialog/dialog-description.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.DescriptionProps = $props();
</script>

<DialogPrimitive.Description
	bind:ref
	data-slot="dialog-description"
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/dialog/dialog-overlay.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
	bind:ref
	data-slot="dialog-overlay"
	class={cn(
		"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
		className
	)}
	{...restProps}
/>

```

## `src/lib/components/ui/dialog/dialog-title.svelte`
```
<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.TitleProps = $props();
</script>

<DialogPrimitive.Title
	bind:ref
	data-slot="dialog-title"
	class={cn("text-lg font-semibold leading-none", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/dialog/dialog-header.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="dialog-header"
	class={cn("flex flex-col gap-2 text-center sm:text-left", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/dialog/index.ts`
```
import { Dialog as DialogPrimitive } from "bits-ui";

import Title from "./dialog-title.svelte";
import Footer from "./dialog-footer.svelte";
import Header from "./dialog-header.svelte";
import Overlay from "./dialog-overlay.svelte";
import Content from "./dialog-content.svelte";
import Description from "./dialog-description.svelte";
import Trigger from "./dialog-trigger.svelte";
import Close from "./dialog-close.svelte";

const Root = DialogPrimitive.Root;
const Portal = DialogPrimitive.Portal;

export {
	Root,
	Title,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	Close,
	//
	Root as Dialog,
	Title as DialogTitle,
	Portal as DialogPortal,
	Footer as DialogFooter,
	Header as DialogHeader,
	Trigger as DialogTrigger,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Description as DialogDescription,
	Close as DialogClose,
};

```

## `src/lib/components/ui/radio-group/radio-group.svelte`
```
<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: RadioGroupPrimitive.RootProps = $props();
</script>

<RadioGroupPrimitive.Root
	bind:ref
	bind:value
	data-slot="radio-group"
	class={cn("grid gap-3", className)}
	{...restProps}
/>

```

## `src/lib/components/ui/radio-group/radio-group-item.svelte`
```
<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from "bits-ui";
	import CircleIcon from "@lucide/svelte/icons/circle";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChildrenOrChild<RadioGroupPrimitive.ItemProps> = $props();
</script>

<RadioGroupPrimitive.Item
	bind:ref
	data-slot="radio-group-item"
	class={cn(
		"border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 shadow-xs aspect-square size-4 shrink-0 rounded-full border outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked })}
		<div data-slot="radio-group-indicator" class="relative flex items-center justify-center">
			{#if checked}
				<CircleIcon
					class="fill-primary absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2"
				/>
			{/if}
		</div>
	{/snippet}
</RadioGroupPrimitive.Item>

```

## `src/lib/components/ui/radio-group/index.ts`
```
import Root from "./radio-group.svelte";
import Item from "./radio-group-item.svelte";

export {
	Root,
	Item,
	//
	Root as RadioGroup,
	Item as RadioGroupItem,
};

```

## `src/lib/components/ui/separator/separator.svelte`
```
<script lang="ts">
	import { Separator as SeparatorPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		"data-slot": dataSlot = "separator",
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	data-slot={dataSlot}
	class={cn(
		"bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
		className
	)}
	{...restProps}
/>

```

## `src/lib/components/ui/separator/index.ts`
```
import Root from "./separator.svelte";

export {
	Root,
	//
	Root as Separator,
};

```

## `src/lib/components/ui/card/card-description.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
	bind:this={ref}
	data-slot="card-description"
	class={cn("text-muted-foreground text-sm", className)}
	{...restProps}
>
	{@render children?.()}
</p>

```

## `src/lib/components/ui/card/card.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		"bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-action.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-action"
	class={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-content.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div bind:this={ref} data-slot="card-content" class={cn("px-6", className)} {...restProps}>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-header.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-header"
	class={cn(
		"@container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-title.svelte`
```
<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-title"
	class={cn("font-semibold leading-none", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/card-footer.svelte`
```
<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-footer"
	class={cn("[.border-t]:pt-6 flex items-center px-6", className)}
	{...restProps}
>
	{@render children?.()}
</div>

```

## `src/lib/components/ui/card/index.ts`
```
import Root from "./card.svelte";
import Content from "./card-content.svelte";
import Description from "./card-description.svelte";
import Footer from "./card-footer.svelte";
import Header from "./card-header.svelte";
import Title from "./card-title.svelte";
import Action from "./card-action.svelte";

export {
	Root,
	Content,
	Description,
	Footer,
	Header,
	Title,
	Action,
	//
	Root as Card,
	Content as CardContent,
	Description as CardDescription,
	Footer as CardFooter,
	Header as CardHeader,
	Title as CardTitle,
	Action as CardAction,
};

```

## `src/lib/components/ui/badge/badge.svelte`
```
<script lang="ts" module>
	import { type VariantProps, tv } from "tailwind-variants";

	export const badgeVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
				secondary:
					"bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
				destructive:
					"bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70 border-transparent text-white",
				outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = "default",
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
	} = $props();
</script>

<svelte:element
	this={href ? "a" : "span"}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>

```

## `src/lib/components/ui/badge/index.ts`
```
export { default as Badge } from "./badge.svelte";
export { badgeVariants, type BadgeVariant } from "./badge.svelte";

```

## `src/lib/utils/themeUpdater.svelte.ts`
```
// src/lib/utils/themeUpdater.svelte.ts
import { onMount } from 'svelte';
import { uiStore, type Theme } from '$lib/stores/uiStore.svelte';

export function useThemeUpdater() {
  onMount(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // react to uiStore.theme via rune effect
    $effect(() => {
      const theme = uiStore.theme as Theme;
      const html = document.documentElement;

      if (theme === 'system') {
        const isDark = media.matches;
        if (isDark) html.classList.add('dark');
        else html.classList.remove('dark');
      } else if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    });

    const mediaListener = () => {
      if (uiStore.theme === 'system') {
        const html = document.documentElement;
        if (media.matches) html.classList.add('dark');
        else html.classList.remove('dark');
      }
    };

    media.addEventListener('change', mediaListener);
    return () => media.removeEventListener('change', mediaListener);
  });
}
```

## `src/lib/utils/useItemFilters.ts`
```
// src/lib/utils/useItemFilters.ts
import type { ItemTree, Item, Priority } from '$lib/types';

export interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function filterItemTree(itemTree: ItemTree, filters: FilterOptions) {
  const filtered: Record<string, Item[]> = {};

  Object.entries(itemTree).forEach(([categoryName, items]) => {
    const filteredItems = items.filter((item) => {
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.text.toLowerCase().includes(query) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      if (
        filters.selectedPriority !== 'all' &&
        item.priority !== filters.selectedPriority
      ) {
        return false;
      }

      if (!filters.showCompleted && item.isCompleted) {
        return false;
      }

      if (filters.selectedTags.length > 0) {
        const hasMatchingTag = filters.selectedTags.some((selectedTag) =>
          item.tags?.includes(selectedTag),
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });

    if (filteredItems.length > 0) {
      filtered[categoryName] = filteredItems;
    }
  });

  return filtered;
}

export function getAllTags(itemTree: ItemTree): string[] {
  const tags = new Set<string>();
  Object.values(itemTree).forEach((items) => {
    items.forEach((item) => {
      item.tags?.forEach((tag) => tags.add(tag));
    });
  });
  return Array.from(tags).sort();
}

export function useItemFilters(itemTree: ItemTree, filters: FilterOptions) {
  const filteredItemTree = filterItemTree(itemTree, filters);
  const allTags = getAllTags(itemTree);
  
  const hasActiveFilters = !!(
    filters.searchQuery.trim() ||
    filters.selectedPriority !== 'all' ||
    !filters.showCompleted ||
    filters.selectedTags.length > 0
  );

  return {
    filteredItemTree,
    allTags,
    hasActiveFilters
  };
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

## `src/lib/stores/uiStore.svelte.ts`
```
// src/lib/stores/uiStore.ts
import { toast } from 'svelte-sonner';
import type { NotificationType, Item } from '$lib/types';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

class UiStore {
  // State
  theme = $state<Theme>('system');
  isFormOpen = $state(false);
  preselectedCategory = $state<string | null>(null);
  editingItem = $state<Item | null>(null);

  // Actions
  openForm(item?: Item, categorySlug?: string) {
    this.editingItem = item ?? null;
    if (categorySlug) {
      this.preselectedCategory = categorySlug;
    } else if (item?.categorySlug) {
      this.preselectedCategory = item.categorySlug;
    }
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.preselectedCategory = null;
    this.editingItem = null;
  }

  toggleTheme() {
    if (this.theme === 'light') this.theme = 'dark';
    else if (this.theme === 'dark') this.theme = 'system';
    else this.theme = 'light';
  }

  showNotification(type: NotificationType, message: string) {
    if (!browser) return; // Skip toast during SSR
    
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'info':
      default:
        toast.info(message);
        break;
    }
  }
}

export const uiStore = new UiStore();
```

## `src/lib/utils.ts`
```
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

```

## `src/lib/schemas/itemSchema.ts`
```
import { z } from 'zod';
import type { SingleCategory } from '$lib/types';

export const itemFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters'),
  text: z.string()
    .min(1, 'Description is required'),
  priority: z.enum(['low', 'mid', 'high']),
  tags: z.array(z.string()).optional(),
  categories: z.tuple([z.string().min(1, 'Category is required')]) as z.ZodType<SingleCategory<string>>,
});

export type ItemFormData = z.infer<typeof itemFormSchema>;
```

## `src/lib/types/index.ts`
```
// src/lib/types/index.ts
export type Priority = 'low' | 'mid' | 'high';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export type SingleCategory<T = number> = [T];

export interface Item {
  id: number;
  name: string;
  text: string;
  priority: Priority;
  isCompleted: boolean;
  slug: string;
  tags?: string[];
  categories: SingleCategory<number>;
  categorySlug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemTree {
  [categorySlug: string]: Item[];
}

export interface CreateItemPayload {
  name: string;
  text: string;
  priority: Priority;
  tags?: string[];
  // In Vue this is SingleCategory<string>; keep same payload shape.
  categories: SingleCategory<string>;
}

export interface UpdateItemPayload extends Partial<CreateItemPayload> {
  isCompleted?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorData {
  message: string;
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

export type Result<T, E> =
  | { success: true; data: T }
  | { success: false; error: E };
```

## `src/lib/pages/AboutPage.svelte`
```
<!-- src/lib/pages/AboutPage.svelte -->
<script lang="ts">
  import MainLayout from '$lib/components/layout/layout/MainLayout.svelte';
</script>

<MainLayout>
  <div class="space-y-6">
    <header>
      <h1 class="font-bold text-size-3xl">About This Application</h1>
    </header>

    <div class="p-6 border rounded-lg bg-surface border-border">
      <p class="mb-4 text-text-secondary">
        This is a modern, responsive Svelte 5 frontend for managing items.
      </p>

      <h2 class="mb-3 font-semibold text-size-xl">Core Technologies Used:</h2>

      <ul class="space-y-2 list-disc list-inside text-text-secondary">
        <li>
          <span class="font-medium text-text-primary">Svelte 5:</span>
          For building a reactive and performant user interface with Runes.
        </li>
        <li>
          <span class="font-medium text-text-primary">TanStack Query (Svelte Query):</span>
          Manages all server state.
        </li>
        <li>
          <span class="font-medium text-text-primary">shadcn-svelte:</span>
          UI Component library.
        </li>
        <li>
          <span class="font-medium text-text-primary">Tailwind CSS v4:</span>
          Styling.
        </li>
      </ul>
</div>
  </MainLayout>

```

## `src/lib/pages/ItemPage.svelte`
```
<script lang="ts">
  import MainLayout from 'lib/components/layout/MainLayout.svelte';
  import { useItemTree } from 'lib/api/itemsQuery';
  import { useItemFilters } from 'lib/utils/useItemFilters';
  import FilterBar from 'lib/components/layout/FilterBar.svelte';
  import ItemItem from 'lib/components/items/ItemItem.svelte';
  import ItemForm from 'lib/components/items/ItemForm.svelte';
  import { uiStore } from 'lib/stores/uiStore.svelte'; // FIX: Added .svelte extension
  import { Button } from 'lib/components/ui/button';
  import { Plus } from '@lucide/svelte'; // Import icon directly

  const itemTreeQuery = useItemTree();

  let filters = $state({
    searchQuery: '',
    selectedPriority: 'all' as const,
    showCompleted: true,
    selectedTags: [] as string[],
  });

  // Use derived for reactive calculations in Svelte 5
  let filterResults = $derived(useItemFilters(itemTreeQuery.data || {}, filters));
  let filteredItemTree = $derived(filterResults.filteredItemTree);
  let allTags = $derived(filterResults.allTags);
  let hasActiveFilters = $derived(filterResults.hasActiveFilters);

  function clearFilters() {
    filters = {
      searchQuery: '',
      selectedPriority: 'all',
      showCompleted: true,
      selectedTags: [],
    };
}
</script>

<MainLayout>
  <header class="mb-6">
    <h1 class="mb-2 font-bold text-size-3xl">Items</h1>
  </header>

  <!-- Bind props using Svelte 5 syntax -->
  <FilterBar
    bind:search={filters.searchQuery}
    bind:priority={filters.selectedPriority}
    bind:showCompleted={filters.showCompleted}
    bind:selectedTags={filters.selectedTags}
    {allTags}
    {hasActiveFilters}
    on:clear={clearFilters}
  />

  {#if itemTreeQuery.isLoading}
    <div>Loading...</div>
  {:else if itemTreeQuery.error}
    <div>Error: {itemTreeQuery.error.message}</div>
  {:else}
    <div class="mt-6 space-y-8">
      {#each Object.entries(filteredItemTree) as [category, items]}
        <section>
          <div class="flex items-center gap-2 mb-4">
            <h2 class="font-semibold capitalize text-size-xl">{category}</h2>
            <span class="text-sm text-text-muted">({items.length})</span>
            <Button 
              variant="ghost" 
              size="icon-sm" 
              onclick={() => uiStore.openForm(undefined, category)}
            >
              <Plus class="w-4 h-4" />
            </Button>
          </div>
          <div class="grid gap-4">
            {#each items as item (item.id)}
              <ItemItem {item} />
            {/each}
          </div>
        </section>
      {/each}
      {#if Object.keys(filteredItemTree).length === 0 && !itemTreeQuery.isLoading}
        <div class="py-10 text-center text-text-muted">
          <p>No items found.</p>
          {#if hasActiveFilters}
            <p>Try adjusting your filters.</p>
{/if}
  </div>
      {/if}
    </div>
  {/if}
  </MainLayout>

  <!-- Access store property directly -->
  {#if uiStore.isFormOpen}
    <ItemForm onClose={() => uiStore.closeForm()} />
  {/if}

```

## `src/lib/pages/ItemDetailPage.svelte`
```
<script lang="ts">
  import { useItemDetail } from '$lib/api/itemsQuery';
  import { formatDate } from '$lib/utils/helpers';
  import type { Item } from '$lib/types';

  export let categorySlug: string;
  export let itemSlug: string;

  const { data: item, isLoading, error } = useItemDetail(() => categorySlug, () => itemSlug);
</script>

<div class="container mx-auto p-fluid-6">
  <a href="/" class="mb-4 inline-block text-primary hover:underline">
    ← Back
  </a>

  {#if isLoading}
    <div>Loading...</div>
  {:else if error}
    <div>Error: {error.message}</div>
  {:else if item}
    <div class="bg-surface rounded-card p-card">
      <h1 class="mb-4 font-bold text-size-2xl">{item.name}</h1>
      <p class="mb-4 text-text-secondary">{item.text}</p>
      <div class="flex gap-2 mb-4">
        <span class="tag-priority-{item.priority}">{item.priority}</span>
        {#if item.isCompleted}
          <span class="tag-sm bg-success-light">Completed</span>
        {/if}
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {formatDate(item.createdAt)}</p>
        <p>Updated: {formatDate(item.updatedAt)}</p>
      </div>
    </div>
  {/if}
</div>
```

## `src/lib/index.ts`
```
// place files you want to import through the `$lib` alias in this folder.

```

## `src/lib/api/itemApi.ts`
```
// src/lib/api/itemApi.ts
import { get, post, patch, del } from '$lib/api/apiClient';
import type {
  Item,
  ItemTree,
  CreateItemPayload,
  UpdateItemPayload,
} from '$lib/types';

export const getItemTree = () => get<ItemTree>('/items/tree');

export const getItemBySlug = (categorySlug: string, itemSlug: string) =>
  get<Item>(`/items/${categorySlug}/${itemSlug}`);

export const createItem = (payload: CreateItemPayload) =>
  post<Item, CreateItemPayload>('/items', payload);

export const updateItem = (id: number, payload: UpdateItemPayload) =>
  patch<Item, UpdateItemPayload>(`/items/${id}`, payload);

export const deleteItem = (id: number) =>
  del<{ deleted: boolean }>(`/items/${id}`);
```

## `src/lib/api/apiClient.ts`
```
// src/lib/api/apiClient.ts
import { ofetch } from 'ofetch';
import type { ApiErrorData, Result } from '$lib/types';

const API_URL_BASE = 'http://localhost:3000/api';

export const apiClient = ofetch.create({
  baseURL: API_URL_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  async onResponseError({ response }) {
    console.error('API Error:', response.status, response._data);
  },
});

const success = <T>(data: T): Result<T, ApiErrorData> => ({
  success: true,
  data,
});

const failure = (error: ApiErrorData): Result<any, ApiErrorData> => ({
  success: false,
  error,
});

const createApiError = (message: string, statusCode: number): ApiErrorData => ({
  message,
  statusCode,
});

const request = async <T>(
  method: string,
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
): Promise<Result<T, ApiErrorData>> => {
  try {
    const response = await apiClient.raw(endpoint, {
      method,
      body: body ? body : undefined,
    });

    const data = response._data;
    return success(data.data ?? data) as Result<T, ApiErrorData>;
  } catch (error: any) {
    const statusCode = error.response?.status || 503;
    const message = error.data?.message || error.message || 'Network request failed';
    return failure(createApiError(message, statusCode));
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

export const get = <T>(endpoint: string) =>
  unwrapResult(request<T>('GET', endpoint));

export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('POST', endpoint, data));

export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('PATCH', endpoint, data));

export const del = <TResponse = { deleted: boolean }>(endpoint: string) =>
  unwrapResult(request<TResponse>('DELETE', endpoint));

export const api = { get, post, patch, delete: del };
```

## `src/lib/api/itemsQuery.ts`
```
// src/lib/api/itemsQuery.ts
import {
  QueryClient,
  createQuery,
  createMutation,
  useQueryClient,
} from '@tanstack/svelte-query';
import {
  getItemTree,
  getItemBySlug,
  createItem,
  updateItem,
  deleteItem,
} from '$lib/api/itemApi';
import type { CreateItemPayload, UpdateItemPayload } from '$lib/types';
import { uiStore } from '$lib/stores/uiStore.svelte'; // FIX: Added .svelte extension

// shared query keys (same structure as Vue)
export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (categorySlug: string, itemSlug: string) =>
    [...itemKeys.all, 'detail', categorySlug, itemSlug] as const,
};

// root-level query client creator (used in App.svelte)
export function createAppQueryClient() {
  return new QueryClient();
}

// hooks-equivalent functions for components

export function useItemTree() {
  return createQuery(() => ({
    queryKey: itemKeys.tree(),
    queryFn: getItemTree,
    staleTime: 5 * 60 * 1000,
  }));
}

export function useItemDetail(categorySlug: () => string, itemSlug: () => string) {
  return createQuery(() => ({
    queryKey: itemKeys.detail(categorySlug(), itemSlug()),
    queryFn: () => getItemBySlug(categorySlug(), itemSlug()),
    enabled: Boolean(categorySlug() && itemSlug()),
  }));
}

export function useAddItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (payload: CreateItemPayload) => createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item created successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to create item');
    },
  }));
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (args: { id: number; payload: UpdateItemPayload }) =>
      updateItem(args.id, args.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item updated successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to update item');
    },
  }));
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      uiStore.showNotification('success', 'Item deleted successfully');
    },
    onError: (error: any) => {
      uiStore.showNotification('error', error.message ?? 'Failed to delete item');
    },
  }));
}
```

## `src/app.css`
```
@import "tailwindcss";

@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## `src/app.html`
```
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>

```

## `src/routes/items/[categorySlug]/[itemSlug]/+page.ts`
```
// /src/routes/items/[categorySlug]/[itemSlug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { categorySlug, itemSlug } = params;

  return {
    categorySlug,
    itemSlug
  };
};
```

## `src/routes/items/[categorySlug]/[itemSlug]/+page.svelte`
```
<!-- /src/routes/items/[categorySlug]/[itemSlug]/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import { useItemDetail } from '$lib/api/itemsQuery';
  import { formatDate } from '$lib/utils/helpers';

  let { data }: { data: PageData } = $props();

  const { data: item, isLoading, error } = useItemDetail(() => data.categorySlug, () => data.itemSlug);
</script>

<div class="container mx-auto p-fluid-6">
  <a href="/" class="mb-4 inline-block text-primary hover:underline">
    ← Back
  </a>

  {#if isLoading}
    <div>Loading...</div>
  {:else if error}
    <div>Error: {error.message}</div>
  {:else if item}
    <div class="bg-surface rounded-card p-card">
      <h1 class="mb-4 font-bold text-size-2xl">{item.name}</h1>
      <p class="mb-4 text-text-secondary">{item.text}</p>
      <div class="flex gap-2 mb-4">
        <span class="tag-priority-{item.priority}">{item.priority}</span>
        {#if item.isCompleted}
          <span class="tag-sm bg-success-light">Completed</span>
        {/if}
      </div>
      <div class="text-size-sm text-text-muted">
        <p>Created: {formatDate(item.createdAt)}</p>
        <p>Updated: {formatDate(item.updatedAt)}</p>
      </div>
    </div>
  {/if}
</div>
```

## `src/routes/about/+page.svelte`
```
<!-- /src/routes/about/+page.svelte -->
<script lang="ts">
</script>

<div class="space-y-6">
  <header>
    <h1 class="font-bold text-size-3xl">About This Application</h1>
  </header>

  <div class="p-6 border rounded-lg bg-surface border-border">
    <p class="mb-4 text-text-secondary">
      This is a modern, responsive Svelte 5 frontend for managing items.
    </p>

    <h2 class="mb-3 font-semibold text-size-xl">Core Technologies Used:</h2>

    <ul class="space-y-2 list-disc list-inside text-text-secondary">
      <li>
        <span class="font-medium text-text-primary">Svelte 5:</span>
        For building a reactive and performant user interface with Runes.
      </li>
      <li>
        <span class="font-medium text-text-primary">TanStack Query (Svelte Query):</span>
        Manages all server state.
      </li>
      <li>
        <span class="font-medium text-text-primary">shadcn-svelte:</span>
        UI Component library.
      </li>
      <li>
        <span class="font-medium text-text-primary">Tailwind CSS v4:</span>
        Styling.
      </li>
    </ul>
  </div>
</div>
```

## `src/routes/+layout.svelte`
```
<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg'; // Changed import to $lib
  import { browser } from '$app/environment';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  import { Toaster } from 'svelte-sonner';
  import { useThemeUpdater } from '$lib/utils/themeUpdater.svelte.js';
  import AppSidebar from '$lib/components/layout/AppSidebar.svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import { page } from '$app/stores';

  let { children } = $props();

  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser, // Only fetch on client
        staleTime: 60 * 1000,
      },
    },
  });

  // Initialize theme
  useThemeUpdater();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>shadcn-simple-svelte-kit</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
  <div class="flex min-h-screen bg-background text-foreground">
    <!-- Sidebar handles its own internal state -->
    <AppSidebar />
    
    <div class="flex-1 max-w-5xl mx-auto p-fluid-6">
      <!-- Pass current path from $page store -->
      <TopBar currentPath={$page.url.pathname} />
      
      <!-- Correct Svelte 5 Render Syntax -->
      {@render children()}
    </div>
  </div>
  
  <Toaster position="top-right" richColors />
</QueryClientProvider>
```

## `src/routes/+page.svelte`
```
<!-- /src/routes/+page.svelte -->
<script lang="ts">
  import ItemPage from 'lib/pages/ItemPage.svelte';
</script>

<ItemPage />
```

## `components.json`
```
{
	"$schema": "https://shadcn-svelte.com/schema.json",
	"tailwind": {
		"css": "src/app.css",
		"baseColor": "neutral"
	},
	"aliases": {
		"components": "$lib/components",
		"utils": "$lib/utils",
		"ui": "$lib/components/ui",
		"hooks": "$lib/hooks",
		"lib": "$lib"
	},
	"typescript": true,
	"registry": "https://shadcn-svelte.com/registry"
}

```

