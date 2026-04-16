import {ptBRLocale} from '@sanity/locale-pt-br'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {webhooksTrigger} from 'sanity-plugin-webhooks-trigger'
import {structureTool} from 'sanity/structure'
import {SANITY_DATASET, SANITY_PROJECT_ID, SANITY_WEBHOOK_SALT} from './environments'
import {schemaTypes} from './schemaTypes'
import {deskStructure, singletonTypes} from './structure/desk-structure'

export default defineConfig({
  name: 'default',
  title: 'studio-imaa',

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    media(),
    ptBRLocale(),
    webhooksTrigger({
      title: 'Atualizar Site',
      text: 'Atualizar site público após alterações',
      encryptionSalt: SANITY_WEBHOOK_SALT,
      githubEventType: 'deploy-production',
    }),
  ],

  schema: {
    types: schemaTypes,
    // Impede a criação de novos através do botão "Novo Documento"
    templates: (prev) => prev.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    // Refinamento das ações para o Singleton
    actions: (prev, context) => {
      if (singletonTypes.has(context.schemaType)) {
        // Para as configurações, permitimos apenas o essencial
        const allowedActions = new Set(['publish', 'discardChanges', 'restore'])
        return prev.filter((action) => allowedActions.has(action.action ?? ''))
      }
      return prev
    },
  },
})
