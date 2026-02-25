import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Schema reutilizável para conteúdo rico (Portable Text)
 * Usado em páginas, espetáculos, artistas, etc.
 * Inclui: texto formatado, imagens, linhas divisórias
 */
export const baseBlockContentMembers = [
  defineArrayMember({
    type: 'block',
    styles: [
      {title: 'Normal', value: 'normal'},
      {title: 'H1', value: 'h1'},
      {title: 'H2', value: 'h2'},
      {title: 'H3', value: 'h3'},
      {title: 'H4', value: 'h4'},
      {title: 'H5', value: 'h5'},
      {title: 'H6', value: 'h6'},
      {title: 'Quote', value: 'blockquote'},
    ],
    marks: {
      decorators: [
        {title: 'Strong', value: 'strong'},
        {title: 'Emphasis', value: 'em'},
        {title: 'Code', value: 'code'},
        {title: 'Underline', value: 'underline'},
        {title: 'Strike', value: 'strike-through'},
      ],
      annotations: [
        defineArrayMember({
          title: 'URL',
          name: 'link',
          type: 'object',
          fields: [
            defineField({
              title: 'URL',
              name: 'href',
              type: 'string',
              validation: (Rule) =>
                Rule.required().custom((value: string | undefined) => {
                  if (!value) return true
                  const isAllowed = /^(https:\/\/|mailto:|tel:)/.test(value)
                  return isAllowed ? true : 'A URL deve começar com https://, mailto: ou tel:'
                }),
            }),
            defineField({
              title: 'Abre em nova aba',
              name: 'blank',
              type: 'boolean',
              initialValue: true,
            }),
          ],
        }),
      ],
    },
  }),
  defineArrayMember({
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Texto Alternativo',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'caption',
        title: 'Legenda',
        type: 'string',
      }),
    ],
  }),
  defineArrayMember({type: 'horizontalRule'}),
  defineArrayMember({type: 'downloadableFile'}),
  defineArrayMember({type: 'videoFile'}),
  defineArrayMember({type: 'youtubeEmbed'}),
]

/**
 * Schema Padrão (Usado em Pages, etc)
 */
export default defineType({
  name: 'blockContent',
  title: 'Conteúdo',
  type: 'array',
  of: baseBlockContentMembers, // Usamos a constante exportada aqui
})
