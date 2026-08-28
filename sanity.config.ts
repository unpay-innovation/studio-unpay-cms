import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {table} from '@sanity/table'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'unpay-cms',

  projectId: 'pcg0dmpc',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), table(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
