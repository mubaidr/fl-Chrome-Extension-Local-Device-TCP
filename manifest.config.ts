import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json' assert { type: 'json' }
// import type { type } from 'node:os'
// import type { action, permissions } from 'webextension-polyfill'

const { version, name, description, displayName } = packageJson
// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, '')
  // split into version parts
  .split(/[.-]/)

export default defineManifest(async (env) => ({
  name: env.mode === 'staging' ? `[INTERNAL] ${name}` : displayName || name,
  description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  manifest_version: 3,
  minimum_chrome_version: '116',
  // key: '',
  action: {
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      all_frames: true,
      js: ['src/content-script/index.ts'],
      matches: [
        'http://localhost/*',
        'http://127.0.0.1/*',
        'https://*.bookingfor.com/*',
      ],
      run_at: 'document_end',
    },
  ],
  offline_enabled: false,
  host_permissions: ['*://*/*'],
  permissions: ['storage', 'background'],
  web_accessible_resources: [
    {
      matches: ['*://*/*'],
      resources: ['src/content-script/index.ts'],
    },
  ],
  icons: {
    16: 'src/assets/logo.png',
    24: 'src/assets/logo.png',
    32: 'src/assets/logo.png',
    128: 'src/assets/logo.png',
  },
}))
