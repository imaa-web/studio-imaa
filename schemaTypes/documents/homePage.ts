import {MdHome} from 'react-icons/md'
import {defineField, defineType} from 'sanity'
import {baseGroups, excerptField, titleField} from '../fields/shared'

export default defineType({
  name: 'homePage',
  title: 'Página Inicial',
  type: 'document',
  icon: MdHome,
  groups: baseGroups,
  fields: [
    titleField('Título da Página (SEO)', 'seo'),
    excerptField(),
    defineField({
      name: 'logo',
      title: 'Logo da Hero',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      description: 'Opcional. Se não preenchido, usa o logo definido nas Configurações do Site.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as {asset?: {_ref?: string}}
              if (parent?.asset?._ref && !value?.trim()) {
                return 'Texto alternativo é obrigatório quando uma imagem é fornecida.'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Texto Descritivo',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Texto exibido abaixo do título na seção hero.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Botão Principal',
      type: 'cta',
      group: 'content',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Botão Secundário',
      type: 'cta',
      group: 'content',
    }),
  ],
})
