import {ptBRLocale} from '@sanity/locale-pt-br'
import {visionTool} from '@sanity/vision'
import {MdContactPage, MdHome, MdSettings} from 'react-icons/md'
import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const singletonTypes = new Set(['siteSettings', 'homePage', 'contactPage'])

export default defineConfig({
  name: 'default',
  title: 'studio-imaa',

  projectId: 'ofh08t2n',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            // Configurações do Site (Singleton)
            S.listItem()
              .title('Configurações do Site')
              .id('siteSettings')
              .icon(MdSettings)
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Configurações Gerais'),
              ),
            //Página Inicial
            S.listItem()
              .title('Página Inicial')
              .id('homePage')
              .icon(MdHome)
              .child(
                S.document().schemaType('homePage').documentId('homePage').title('Página Inicial'),
              ),
            //Página de Contato
            S.listItem()
              .title('Página de Contato')
              .id('contactPage')
              .icon(MdContactPage)
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
                  .title('Página de Contato'),
              ),

            S.divider(),

            // Lista automática dos outros documentos
            ...S.documentTypeListItems().filter(
              (item) =>
                !['siteSettings', 'homePage', 'contactPage', 'menuItem', 'media.tag'].includes(
                  item.getId() ?? '',
                ),
            ),
          ]),
    }),
    visionTool(),
    media(),
    ptBRLocale(),
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
