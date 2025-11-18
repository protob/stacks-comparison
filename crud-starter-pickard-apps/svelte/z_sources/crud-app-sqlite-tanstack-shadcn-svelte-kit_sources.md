# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** wto, 18 lis 2025, 14:53:42 CET
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
		"@lucide/svelte": "^0.553.0",
		"@sveltejs/adapter-auto": "^7.0.0",
		"@sveltejs/kit": "^2.47.1",
		"@sveltejs/vite-plugin-svelte": "^6.2.1",
		"@tailwindcss/forms": "^0.5.10",
		"@tailwindcss/typography": "^0.5.19",
		"@tailwindcss/vite": "^4.1.14",
		"clsx": "^2.1.1",
		"svelte": "^5.41.0",
		"svelte-check": "^4.3.3",
		"tailwind-merge": "^3.3.1",
		"tailwind-variants": "^3.1.1",
		"tailwindcss": "^4.1.14",
		"tw-animate-css": "^1.4.0",
		"typescript": "^5.9.3",
		"vite": "^7.1.10"
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
			"@/*": [
				"../path/to/lib/*"
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
		RouteId(): "/";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>
		};
		Pathname(): "/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}
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
export type PageProps = { params: RouteParams; data: PageData }
export type LayoutServerData = null;
export type LayoutData = Expand<LayoutParentData>;
export type LayoutProps = { params: LayoutParams; data: LayoutData; children: import("svelte").Snippet }
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
	version_hash: "12t8h7g"
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

## `svelte.config.js`
```
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		  alias: {
      "@/*": "./path/to/lib/*",
    },
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
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

## `src/lib/index.ts`
```
// place files you want to import through the `$lib` alias in this folder.

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

## `src/routes/+layout.svelte`
```
<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

```

## `src/routes/+page.svelte`
```
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Button>Shadcn Button</Button>
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>
 

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

