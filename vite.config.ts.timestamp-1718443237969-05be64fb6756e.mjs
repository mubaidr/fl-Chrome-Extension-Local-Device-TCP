// vite.config.ts
import { dirname, relative } from "node:path";
import { URL, fileURLToPath } from "node:url";
import { crx } from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.23/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import vue from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.2.13_@types+node@20.14.2_sass@1.77.4_terser@5.31.1__vue@3.4.27_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@10.10.0_vue@3.4.27_typescript@5.4.5___rollup@4.17.2/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/unplugin-icons@0.19.0_@vue+compiler-sfc@3.4.27_vue-template-compiler@2.7.14/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/unplugin-icons@0.19.0_@vue+compiler-sfc@3.4.27_vue-template-compiler@2.7.14/node_modules/unplugin-icons/dist/vite.js";
import Components from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.24.5_rollup@4.17.2_vue@3.4.27_typescript@5.4.5_/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/vite@5.2.13_@types+node@20.14.2_sass@1.77.4_terser@5.31.1/node_modules/vite/dist/node/index.js";
import Pages from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/vite-plugin-pages@0.32.2_@vue+compiler-sfc@3.4.27_vite@5.2.13_@types+node@20.14.2_sass@1.77.4_pw5gmihrkmziygq43h2ltyoawu/node_modules/vite-plugin-pages/dist/index.js";

// define.config.ts
import fs from "node:fs";
import { spawnSync } from "node:child_process";

// package.json
var package_default = {
  name: "vite-vue3-chrome-extension-v3",
  displayName: "Vite Vue 3 Chrome Extension",
  type: "module",
  version: "0.0.1",
  private: true,
  description: "A Vue 3 + Vite project for building Chrome extensions",
  repository: {
    type: "git",
    url: "https://github.com/mubaidr/vite-vue3-chrome-extension-v3"
  },
  scripts: {
    build: "npm run build:chrome && npm run build:firefox",
    "build:chrome": "vite build",
    "build:firefox": "vite build -c vite.firefox.config.js",
    dev: 'concurrently "npm run dev:chrome" "npm run dev:firefox"',
    "dev:chrome": "vite",
    "dev:firefox": "vite build --mode development --watch -c vite.firefox.config.js",
    "dev:server": "tsx server/index.ts",
    format: "prettier --write .",
    lint: "eslint . --fix",
    "lint:manifest": "web-ext lint --pretty",
    preview: "vite preview",
    typecheck: "vue-tsc --noEmit"
  },
  dependencies: {
    marked: "^12.0.2",
    pinia: "^2.1.7",
    vue: "^3.4.27",
    "vue-router": "^4.3.3",
    "webextension-polyfill": "^0.12.0"
  },
  devDependencies: {
    "@antfu/eslint-config": "^2.21.0",
    "@crxjs/vite-plugin": "^2.0.0-beta.23",
    "@iconify-json/mdi": "^1.1.66",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.13",
    "@types/chrome": "^0.0.268",
    "@types/eslint": "~8.56.10",
    "@types/node": "^20.14.2",
    "@types/webextension-polyfill": "~0.10.7",
    "@vitejs/plugin-vue": "^5.0.5",
    "@vue/compiler-sfc": "^3.4.27",
    "@vueuse/core": "^10.10.0",
    autoprefixer: "^10.4.19",
    "chrome-types": "^0.1.287",
    concurrently: "^8.2.2",
    "cross-env": "^7.0.3",
    daisyui: "^4.12.2",
    eslint: "^9.4.0",
    globals: "^15.4.0",
    postcss: "^8.4.38",
    prettier: "^3.3.1",
    "prettier-plugin-tailwindcss": "^0.6.2",
    sass: "^1.77.4",
    tailwindcss: "^3.4.4",
    terser: "^5.31.1",
    tsx: "^4.15.1",
    typescript: "^5.4.5",
    "unplugin-auto-import": "^0.17.6",
    "unplugin-icons": "^0.19.0",
    "unplugin-vue-components": "^0.27.0",
    "unplugin-vue-router": "^0.9.1",
    vite: "^5.2.13",
    "vite-plugin-pages": "^0.32.2",
    "vite-plugin-vue-devtools": "^7.2.1",
    "vue-tsc": "^2.0.21",
    "web-ext": "^8.0.0",
    "webext-bridge": "^6.0.1"
  },
  pnpm: {
    overrides: {},
    peerDependencyRules: {
      allowAny: [],
      allowedDeprecatedVersions: {
        "sourcemap-codec": "1.4.8"
      },
      allowedVersions: {},
      ignoreMissing: []
    }
  },
  overrides: {
    "@crxjs/vite-plugin": "$@crxjs/vite-plugin"
  }
};

// define.config.ts
var changelog = fs.readFileSync("./CHANGELOG.md", "utf-8");
var gitCommit = spawnSync("git", ["rev-parse", "--short", "HEAD"]).stdout.toString().trim();
var jsn = (value) => JSON.stringify(value);
var defineViteConfig = {
  __VERSION__: jsn(package_default.version),
  __DISPLAY_NAME__: jsn(package_default.displayName),
  __CHANGELOG__: jsn(changelog),
  __GIT_COMMIT__: jsn(gitCommit),
  __GITHUB_URL__: jsn(package_default.repository.url)
};

// manifest.config.ts
import { defineManifest } from "file:///projects/fl-Chrome-Extension-Local-Device-TCP/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.23/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var { version, name, description, displayName } = package_default;
var [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = defineManifest(async (env) => ({
  name: env.mode === "staging" ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  // key: '',
  action: {
    default_popup: "src/popup/index.html"
  },
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      all_frames: false,
      js: ["src/content-script/index.ts"],
      matches: ["*://*/*"],
      run_at: "document_end"
    }
  ],
  offline_enabled: false,
  host_permissions: [],
  permissions: ["storage", "tabs", "background"],
  web_accessible_resources: [
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/index.ts"]
    },
    {
      matches: ["*://*/*"],
      resources: ["src/content-script/iframe/index.html"]
    }
  ],
  icons: {
    16: "src/assets/logo.png",
    24: "src/assets/logo.png",
    32: "src/assets/logo.png",
    128: "src/assets/logo.png"
  }
}));

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///projects/fl-Chrome-Extension-Local-Device-TCP/vite.config.ts";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      "~": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)),
      src: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  plugins: [
    // legacy({
    //   targets: ['defaults'],
    // }),
    crx({
      manifest: manifest_config_default,
      browser: "chrome"
    }),
    vue(),
    Pages({
      dirs: [
        {
          dir: "src/pages",
          baseRoute: ""
        },
        {
          dir: "src/setup/pages",
          baseRoute: "setup"
        },
        {
          dir: "src/popup/pages",
          baseRoute: "popup"
        },
        {
          dir: "src/content-script/iframe/pages",
          baseRoute: "iframe"
        }
      ]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "vue/macros", "@vueuse/core"],
      dts: "src/types/auto-imports.d.ts",
      dirs: ["src/composables/", "src/stores/", "src/utils/"]
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ["src/components"],
      // generate `components.d.ts` for ts support with Volar
      dts: "src/types/components.d.ts",
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: "i",
          enabledCollections: ["mdi"]
        })
      ]
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: "vue3",
      scale: 1.5
    }),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        iframe: "src/content-script/iframe/index.html",
        popup: "src/popup/index.html",
        setup: "src/setup/index.html"
      }
    },
    minify: "terser",
    terserOptions: {},
    outDir: "dist/chrome"
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: false
    }
  },
  optimizeDeps: {
    include: ["vue", "@vueuse/core"],
    exclude: ["vue-demi"]
  },
  assetsInclude: ["src/assets/*/**"],
  define: defineViteConfig
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiZGVmaW5lLmNvbmZpZy50cyIsICJwYWNrYWdlLmpzb24iLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Byb2plY3RzL2ZsLUNocm9tZS1FeHRlbnNpb24tTG9jYWwtRGV2aWNlLVRDUFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Byb2plY3RzL2ZsLUNocm9tZS1FeHRlbnNpb24tTG9jYWwtRGV2aWNlLVRDUC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcHJvamVjdHMvZmwtQ2hyb21lLUV4dGVuc2lvbi1Mb2NhbC1EZXZpY2UtVENQL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGlybmFtZSwgcmVsYXRpdmUgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgeyBVUkwsIGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcbmltcG9ydCB7IGRlZmluZVZpdGVDb25maWcgYXMgZGVmaW5lIH0gZnJvbSAnLi9kZWZpbmUuY29uZmlnJ1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QuY29uZmlnJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICd+JzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgc3JjOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIC8vIGxlZ2FjeSh7XG4gICAgLy8gICB0YXJnZXRzOiBbJ2RlZmF1bHRzJ10sXG4gICAgLy8gfSksXG5cbiAgICBjcngoe1xuICAgICAgbWFuaWZlc3QsXG4gICAgICBicm93c2VyOiAnY2hyb21lJyxcbiAgICB9KSxcblxuICAgIHZ1ZSgpLFxuXG4gICAgUGFnZXMoe1xuICAgICAgZGlyczogW1xuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnc3JjL3BhZ2VzJyxcbiAgICAgICAgICBiYXNlUm91dGU6ICcnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZGlyOiAnc3JjL3NldHVwL3BhZ2VzJyxcbiAgICAgICAgICBiYXNlUm91dGU6ICdzZXR1cCcsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkaXI6ICdzcmMvcG9wdXAvcGFnZXMnLFxuICAgICAgICAgIGJhc2VSb3V0ZTogJ3BvcHVwJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRpcjogJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvcGFnZXMnLFxuICAgICAgICAgIGJhc2VSb3V0ZTogJ2lmcmFtZScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0pLFxuXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3Z1ZS9tYWNyb3MnLCAnQHZ1ZXVzZS9jb3JlJ10sXG4gICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuICAgICAgZGlyczogWydzcmMvY29tcG9zYWJsZXMvJywgJ3NyYy9zdG9yZXMvJywgJ3NyYy91dGlscy8nXSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xuICAgIENvbXBvbmVudHMoe1xuICAgICAgZGlyczogWydzcmMvY29tcG9uZW50cyddLFxuICAgICAgLy8gZ2VuZXJhdGUgYGNvbXBvbmVudHMuZC50c2AgZm9yIHRzIHN1cHBvcnQgd2l0aCBWb2xhclxuICAgICAgZHRzOiAnc3JjL3R5cGVzL2NvbXBvbmVudHMuZC50cycsXG4gICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgLy8gYXV0byBpbXBvcnQgaWNvbnNcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgcHJlZml4OiAnaScsXG4gICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbJ21kaSddLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4taWNvbnNcbiAgICBJY29ucyh7XG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcbiAgICAgIGNvbXBpbGVyOiAndnVlMycsXG4gICAgICBzY2FsZTogMS41LFxuICAgIH0pLFxuXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcbiAgICB7XG4gICAgICBuYW1lOiAnYXNzZXRzLXJld3JpdGUnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCwgeyBwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcbiAgICAgICAgICAvXCJcXC9hc3NldHNcXC8vZyxcbiAgICAgICAgICBgXCIke3JlbGF0aXZlKGRpcm5hbWUocGF0aCksICcvYXNzZXRzJyl9L2BcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGlmcmFtZTogJ3NyYy9jb250ZW50LXNjcmlwdC9pZnJhbWUvaW5kZXguaHRtbCcsXG4gICAgICAgIHBvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxuICAgICAgICBzZXR1cDogJ3NyYy9zZXR1cC9pbmRleC5odG1sJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHRlcnNlck9wdGlvbnM6IHt9LFxuICAgIG91dERpcjogJ2Rpc3QvY2hyb21lJyxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogODg4OCxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIGhtcjoge1xuICAgICAgcG9ydDogODg4OSxcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsndnVlJywgJ0B2dWV1c2UvY29yZSddLFxuICAgIGV4Y2x1ZGU6IFsndnVlLWRlbWknXSxcbiAgfSxcbiAgYXNzZXRzSW5jbHVkZTogWydzcmMvYXNzZXRzLyovKionXSxcbiAgZGVmaW5lLFxufSlcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Byb2plY3RzL2ZsLUNocm9tZS1FeHRlbnNpb24tTG9jYWwtRGV2aWNlLVRDUFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Byb2plY3RzL2ZsLUNocm9tZS1FeHRlbnNpb24tTG9jYWwtRGV2aWNlLVRDUC9kZWZpbmUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9wcm9qZWN0cy9mbC1DaHJvbWUtRXh0ZW5zaW9uLUxvY2FsLURldmljZS1UQ1AvZGVmaW5lLmNvbmZpZy50c1wiO2ltcG9ydCBmcyBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHsgc3Bhd25TeW5jIH0gZnJvbSAnbm9kZTpjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHBhY2thZ2VKc29uIGZyb20gJy4vcGFja2FnZS5qc29uJ1xuXG4vLyBSZWFkIENIQU5HRUxPRy5tZCBmaWxlIGludG8gYSBzdHJpbmcuXG5jb25zdCBjaGFuZ2Vsb2cgPSBmcy5yZWFkRmlsZVN5bmMoJy4vQ0hBTkdFTE9HLm1kJywgJ3V0Zi04JylcblxuLy8gR2V0IHRoZSBjdXJyZW50IGdpdCBjb21taXQgaGFzaC5cbmNvbnN0IGdpdENvbW1pdCA9IHNwYXduU3luYygnZ2l0JywgWydyZXYtcGFyc2UnLCAnLS1zaG9ydCcsICdIRUFEJ10pXG4gIC5zdGRvdXQudG9TdHJpbmcoKVxuICAudHJpbSgpXG5cbmNvbnN0IGpzbiA9ICh2YWx1ZTogc3RyaW5nKSA9PiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcblxuLy8gRG9uJ3QgZm9yZ2V0IHRvIGFkZCB5b3VyIGFkZGVkIHZhcmlhYmxlcyB0byB2aXRlLWVudi5kLnRzIGFsc28hXG5cbi8vIFRoZXNlIHZhcmlhYmxlcyBhcmUgYXZhaWxhYmxlIGluIHlvdXIgVnVlIGNvbXBvbmVudHMgYW5kIHdpbGwgYmUgcmVwbGFjZWQgYnkgdGhlaXIgdmFsdWVzIGF0IGJ1aWxkIHRpbWUuXG4vLyBUaGVzZSB3aWxsIGJlIGNvbXBpbGVkIGludG8geW91ciBhcHAuIERvbid0IHN0b3JlIHNlY3JldHMgaGVyZSFcblxuZXhwb3J0IGNvbnN0IGRlZmluZVZpdGVDb25maWcgPSB7XG4gIF9fVkVSU0lPTl9fOiBqc24ocGFja2FnZUpzb24udmVyc2lvbiksXG4gIF9fRElTUExBWV9OQU1FX186IGpzbihwYWNrYWdlSnNvbi5kaXNwbGF5TmFtZSksXG4gIF9fQ0hBTkdFTE9HX186IGpzbihjaGFuZ2Vsb2cpLFxuICBfX0dJVF9DT01NSVRfXzoganNuKGdpdENvbW1pdCksXG4gIF9fR0lUSFVCX1VSTF9fOiBqc24ocGFja2FnZUpzb24ucmVwb3NpdG9yeS51cmwpLFxufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwidml0ZS12dWUzLWNocm9tZS1leHRlbnNpb24tdjNcIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIlZpdGUgVnVlIDMgQ2hyb21lIEV4dGVuc2lvblwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIFZ1ZSAzICsgVml0ZSBwcm9qZWN0IGZvciBidWlsZGluZyBDaHJvbWUgZXh0ZW5zaW9uc1wiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL211YmFpZHIvdml0ZS12dWUzLWNocm9tZS1leHRlbnNpb24tdjNcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJucG0gcnVuIGJ1aWxkOmNocm9tZSAmJiBucG0gcnVuIGJ1aWxkOmZpcmVmb3hcIixcbiAgICBcImJ1aWxkOmNocm9tZVwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImJ1aWxkOmZpcmVmb3hcIjogXCJ2aXRlIGJ1aWxkIC1jIHZpdGUuZmlyZWZveC5jb25maWcuanNcIixcbiAgICBcImRldlwiOiBcImNvbmN1cnJlbnRseSBcXFwibnBtIHJ1biBkZXY6Y2hyb21lXFxcIiBcXFwibnBtIHJ1biBkZXY6ZmlyZWZveFxcXCJcIixcbiAgICBcImRldjpjaHJvbWVcIjogXCJ2aXRlXCIsXG4gICAgXCJkZXY6ZmlyZWZveFwiOiBcInZpdGUgYnVpbGQgLS1tb2RlIGRldmVsb3BtZW50IC0td2F0Y2ggLWMgdml0ZS5maXJlZm94LmNvbmZpZy5qc1wiLFxuICAgIFwiZGV2OnNlcnZlclwiOiBcInRzeCBzZXJ2ZXIvaW5kZXgudHNcIixcbiAgICBcImZvcm1hdFwiOiBcInByZXR0aWVyIC0td3JpdGUgLlwiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuIC0tZml4XCIsXG4gICAgXCJsaW50Om1hbmlmZXN0XCI6IFwid2ViLWV4dCBsaW50IC0tcHJldHR5XCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJ0eXBlY2hlY2tcIjogXCJ2dWUtdHNjIC0tbm9FbWl0XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibWFya2VkXCI6IFwiXjEyLjAuMlwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjQuMjdcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4zLjNcIixcbiAgICBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEyLjBcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYW50ZnUvZXNsaW50LWNvbmZpZ1wiOiBcIl4yLjIxLjBcIixcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4yLjAuMC1iZXRhLjIzXCIsXG4gICAgXCJAaWNvbmlmeS1qc29uL21kaVwiOiBcIl4xLjEuNjZcIixcbiAgICBcIkB0YWlsd2luZGNzcy9mb3Jtc1wiOiBcIl4wLjUuN1wiLFxuICAgIFwiQHRhaWx3aW5kY3NzL3R5cG9ncmFwaHlcIjogXCJeMC41LjEzXCIsXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNjhcIixcbiAgICBcIkB0eXBlcy9lc2xpbnRcIjogXCJ+OC41Ni4xMFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTQuMlwiLFxuICAgIFwiQHR5cGVzL3dlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIn4wLjEwLjdcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNVwiLFxuICAgIFwiQHZ1ZS9jb21waWxlci1zZmNcIjogXCJeMy40LjI3XCIsXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTAuMTAuMFwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTlcIixcbiAgICBcImNocm9tZS10eXBlc1wiOiBcIl4wLjEuMjg3XCIsXG4gICAgXCJjb25jdXJyZW50bHlcIjogXCJeOC4yLjJcIixcbiAgICBcImNyb3NzLWVudlwiOiBcIl43LjAuM1wiLFxuICAgIFwiZGFpc3l1aVwiOiBcIl40LjEyLjJcIixcbiAgICBcImVzbGludFwiOiBcIl45LjQuMFwiLFxuICAgIFwiZ2xvYmFsc1wiOiBcIl4xNS40LjBcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjM4XCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjMuMVwiLFxuICAgIFwicHJldHRpZXItcGx1Z2luLXRhaWx3aW5kY3NzXCI6IFwiXjAuNi4yXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNzcuNFwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjRcIixcbiAgICBcInRlcnNlclwiOiBcIl41LjMxLjFcIixcbiAgICBcInRzeFwiOiBcIl40LjE1LjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS40LjVcIixcbiAgICBcInVucGx1Z2luLWF1dG8taW1wb3J0XCI6IFwiXjAuMTcuNlwiLFxuICAgIFwidW5wbHVnaW4taWNvbnNcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI3LjBcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1yb3V0ZXJcIjogXCJeMC45LjFcIixcbiAgICBcInZpdGVcIjogXCJeNS4yLjEzXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1wYWdlc1wiOiBcIl4wLjMyLjJcIixcbiAgICBcInZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29sc1wiOiBcIl43LjIuMVwiLFxuICAgIFwidnVlLXRzY1wiOiBcIl4yLjAuMjFcIixcbiAgICBcIndlYi1leHRcIjogXCJeOC4wLjBcIixcbiAgICBcIndlYmV4dC1icmlkZ2VcIjogXCJeNi4wLjFcIlxuICB9LFxuICBcInBucG1cIjoge1xuICAgIFwib3ZlcnJpZGVzXCI6IHt9LFxuICAgIFwicGVlckRlcGVuZGVuY3lSdWxlc1wiOiB7XG4gICAgICBcImFsbG93QW55XCI6IFtdLFxuICAgICAgXCJhbGxvd2VkRGVwcmVjYXRlZFZlcnNpb25zXCI6IHtcbiAgICAgICAgXCJzb3VyY2VtYXAtY29kZWNcIjogXCIxLjQuOFwiXG4gICAgICB9LFxuICAgICAgXCJhbGxvd2VkVmVyc2lvbnNcIjoge30sXG4gICAgICBcImlnbm9yZU1pc3NpbmdcIjogW11cbiAgICB9XG4gIH0sXG4gIFwib3ZlcnJpZGVzXCI6IHtcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIiRAY3J4anMvdml0ZS1wbHVnaW5cIlxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9wcm9qZWN0cy9mbC1DaHJvbWUtRXh0ZW5zaW9uLUxvY2FsLURldmljZS1UQ1BcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9wcm9qZWN0cy9mbC1DaHJvbWUtRXh0ZW5zaW9uLUxvY2FsLURldmljZS1UQ1AvbWFuaWZlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9wcm9qZWN0cy9mbC1DaHJvbWUtRXh0ZW5zaW9uLUxvY2FsLURldmljZS1UQ1AvbWFuaWZlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lTWFuaWZlc3QgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nIGFzc2VydCB7IHR5cGU6ICdqc29uJyB9XG5cbmNvbnN0IHsgdmVyc2lvbiwgbmFtZSwgZGVzY3JpcHRpb24sIGRpc3BsYXlOYW1lIH0gPSBwYWNrYWdlSnNvblxuLy8gQ29udmVydCBmcm9tIFNlbXZlciAoZXhhbXBsZTogMC4xLjAtYmV0YTYpXG5jb25zdCBbbWFqb3IsIG1pbm9yLCBwYXRjaCwgbGFiZWwgPSAnMCddID0gdmVyc2lvblxuICAvLyBjYW4gb25seSBjb250YWluIGRpZ2l0cywgZG90cywgb3IgZGFzaFxuICAucmVwbGFjZSgvW15cXGQuLV0rL2csICcnKVxuICAvLyBzcGxpdCBpbnRvIHZlcnNpb24gcGFydHNcbiAgLnNwbGl0KC9bLi1dLylcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgKGVudikgPT4gKHtcbiAgbmFtZTogZW52Lm1vZGUgPT09ICdzdGFnaW5nJyA/IGBbSU5URVJOQUxdICR7bmFtZX1gIDogZGlzcGxheU5hbWUgfHwgbmFtZSxcbiAgZGVzY3JpcHRpb24sXG4gIC8vIHVwIHRvIGZvdXIgbnVtYmVycyBzZXBhcmF0ZWQgYnkgZG90c1xuICB2ZXJzaW9uOiBgJHttYWpvcn0uJHttaW5vcn0uJHtwYXRjaH0uJHtsYWJlbH1gLFxuICAvLyBzZW12ZXIgaXMgT0sgaW4gXCJ2ZXJzaW9uX25hbWVcIlxuICB2ZXJzaW9uX25hbWU6IHZlcnNpb24sXG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIC8vIGtleTogJycsXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6ICdzcmMvcG9wdXAvaW5kZXguaHRtbCcsXG4gIH0sXG4gIGJhY2tncm91bmQ6IHtcbiAgICBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LnRzJyxcbiAgICB0eXBlOiAnbW9kdWxlJyxcbiAgfSxcbiAgY29udGVudF9zY3JpcHRzOiBbXG4gICAge1xuICAgICAgYWxsX2ZyYW1lczogZmFsc2UsXG4gICAgICBqczogWydzcmMvY29udGVudC1zY3JpcHQvaW5kZXgudHMnXSxcbiAgICAgIG1hdGNoZXM6IFsnKjovLyovKiddLFxuICAgICAgcnVuX2F0OiAnZG9jdW1lbnRfZW5kJyxcbiAgICB9LFxuICBdLFxuICBvZmZsaW5lX2VuYWJsZWQ6IGZhbHNlLFxuICBob3N0X3Blcm1pc3Npb25zOiBbXSxcbiAgcGVybWlzc2lvbnM6IFsnc3RvcmFnZScsICd0YWJzJywgJ2JhY2tncm91bmQnXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogWycqOi8vKi8qJ10sXG4gICAgICByZXNvdXJjZXM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0L2luZGV4LnRzJ10sXG4gICAgfSxcbiAgICB7XG4gICAgICBtYXRjaGVzOiBbJyo6Ly8qLyonXSxcbiAgICAgIHJlc291cmNlczogWydzcmMvY29udGVudC1zY3JpcHQvaWZyYW1lL2luZGV4Lmh0bWwnXSxcbiAgICB9LFxuICBdLFxuICBpY29uczoge1xuICAgIDE2OiAnc3JjL2Fzc2V0cy9sb2dvLnBuZycsXG4gICAgMjQ6ICdzcmMvYXNzZXRzL2xvZ28ucG5nJyxcbiAgICAzMjogJ3NyYy9hc3NldHMvbG9nby5wbmcnLFxuICAgIDEyODogJ3NyYy9hc3NldHMvbG9nby5wbmcnLFxuICB9LFxufSkpXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRULFNBQVMsU0FBUyxnQkFBZ0I7QUFDOVYsU0FBUyxLQUFLLHFCQUFxQjtBQUNuQyxTQUFTLFdBQVc7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7OztBQ1Q4UyxPQUFPLFFBQVE7QUFDL1UsU0FBUyxpQkFBaUI7OztBQ0QxQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtB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
