import {MdMenu, MdPhone, MdSearch, MdSettings, MdShare} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  icon: MdSettings,
  // Organiza o formulário em abas
  groups: [
    {name: 'seo', title: 'SEO & Geral', icon: MdSearch},
    {name: 'navigation', title: 'Navegação', icon: MdMenu},
    {name: 'social', title: 'Redes Sociais', icon: MdShare},
    {name: 'contact', title: 'Contato', icon: MdPhone},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Site',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição (SEO)',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Descrição padrão para os motores de busca.',
      validation: (Rule) =>
        Rule.max(160).warning('O ideal é manter abaixo de 160 caracteres para melhor SEO.'),
    }),
    defineField({
      name: 'logo',
      title: 'Logo Principal',
      type: 'image',
      group: 'seo',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto Alternativo',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as {asset?: {_ref?: string; _type?: 'reference'}}
              if (parent?.asset?._ref && !value?.trim()) {
                return 'O texto alternativo é obrigatório quando um logotipo é enviado.'
              }
              return true
            }),
        }),
      ],
    }),
    defineField({
      name: 'mainMenu',
      title: 'Menu Principal (Topo)',
      type: 'menu',
      group: 'navigation',
    }),
    defineField({
      name: 'footerMenu',
      title: 'Menu do Rodapé',
      type: 'menu',
      group: 'navigation',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Nossas Redes Sociais',
      type: 'array',
      group: 'social',
      of: [{type: 'socialLink'}],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Informações de Contato',
      type: 'contactInfo',
      group: 'contact',
    }),
  ],
})
