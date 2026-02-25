import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ofh08t2n',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    /**
     * Generate types for the Sanity schema and queries
     * THE FRONTEND FOLDER MUST BE IN THE SAME DIRECTORY AS THE STUDIO
     */
    path: ['./schemaTypes/**/*.{ts,tsx}', '../trapia-astro/src/lib/queries/**/*.{ts,tsx,astro}'],
    schema: 'schema.json',
    generates: '../trapia-astro/src/lib/sanity.types.ts',
    overloadClientMethods: true,
  },
})
