import {MdContentPaste, MdSearch} from 'react-icons/md'
import {defineField, type FieldGroupDefinition} from 'sanity'

/**
 * Grupos padrão para documentos do tipo "página"
 */
export const baseGroups: FieldGroupDefinition[] = [
  {name: 'content', title: 'Conteúdo', icon: MdContentPaste, default: true},
  {name: 'seo', title: 'SEO / Metadados', icon: MdSearch},
]

/**
 * Campo de título padrão
 */
export const titleField = (title: string = 'Título') =>
  defineField({
    name: 'title',
    title,
    type: 'string',
    group: 'content',
    validation: (Rule) => Rule.required(),
  })

/**
 * Campo de slug padrão baseado no título
 */
export const slugField = (source: string = 'title') =>
  defineField({
    name: 'slug',
    title: 'Slug (URL)',
    type: 'slug',
    group: 'content',
    options: {
      source,
      maxLength: 96,
    },
    validation: (Rule) => Rule.required(),
    hidden: ({document}) => !(document as Record<string, unknown>)?.[source],
  })

/**
 * Campo de imagem destacada (usa o objeto customizado featuredImage)
 */
export const featuredImageField = defineField({
  name: 'featuredImage',
  title: 'Imagem Destacada',
  type: 'featuredImage',
  group: 'content',
  description: 'Imagem principal que aparece no topo',
})

/**
 * Campo de conteúdo Portable Text
 */
export const contentField = defineField({
  name: 'content',
  title: 'Corpo do Conteúdo',
  type: 'blockContent',
  group: 'content',
})

/**
 * Campo de galeria
 */
export const galleryField = defineField({
  name: 'gallery',
  title: 'Galeria de Imagens',
  type: 'gallery',
  group: 'content',
})

/**
 * Campo de resumo para SEO e listas
 */
export const excerptField = defineField({
  name: 'excerpt',
  title: 'Resumo / Sinopse',
  type: 'text',
  group: 'seo',
  rows: 3,
  description: 'Usado para SEO e listagens automáticas.',
  validation: (Rule) =>
    Rule.max(160).warning('O ideal é manter abaixo de 160 caracteres para melhor SEO.'),
})

/**
 * Base completa para páginas (campos comuns)
 * Nota: usa titleField() e slugField() com os valores padrão.
 * Para personalizar título ou fonte do slug, componha os campos individualmente.
 */
export const basePageFields = [
  titleField(),
  slugField(),
  featuredImageField,
  contentField,
  galleryField,
  excerptField,
]
