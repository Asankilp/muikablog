/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare global {
	interface ImportMetaEnv {
		readonly PUBLIC_GOOGLE_ANALYTICS_ID?: string;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}

export {};
