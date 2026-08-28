import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'pcg0dmpc',
    dataset: 'production'
  },
  studioHost: 'unpay-cms',
  deployment: {
    appId: 'cop2may9uyuy81k7hy9d7wjb',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
