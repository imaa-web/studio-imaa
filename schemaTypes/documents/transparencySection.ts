import {LuFileText} from 'react-icons/lu'
import {MdFolderSpecial, MdPictureAsPdf} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {baseGroups, excerptField, heroField, slugField, titleField} from '../fields/shared'

const statusMap = {
  in_progress: 'Em execução',
  completed: 'Concluído',
  in_analysis: 'Em análise',
  pending: 'Pendente',
}

export default defineType({
  name: 'transparencySection',
  title: 'Seção de Transparência',
  type: 'document',
  icon: LuFileText,
  // Definição dos grupos
  groups: [
    ...baseGroups,
    {
      name: 'projects',
      title: 'Projetos',
      icon: MdFolderSpecial,
    },
    {
      name: 'documents',
      title: 'Documentos',
      icon: MdPictureAsPdf,
    },
  ],
  fields: [
    titleField(),
    slugField(),
    defineField({
      name: 'partner',
      title: 'Parceiro Institucional',
      type: 'string',
      description: 'Ex: "Governo Federal (FUNARTE / MinC)"',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      description:
        'Define a ordem de exibição no portal. Ex: 1 = Federal, 2 = Estadual, 3 = Municipal, 4 = Legislativo.',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.integer().positive(),
      group: 'content',
    }),
    heroField(),
    defineField({
      name: 'description',
      title: 'Texto de introdução',
      type: 'blockContent',
      description: 'Texto exibido no topo da página, antes dos projetos e documentos.',
      group: 'content',
    }),

    // Projetos - grupo projects
    defineField({
      name: 'projects',
      title: 'Projetos',
      type: 'array',
      group: 'projects',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'project',
          title: 'Projeto',
          fields: [
            defineField({
              name: 'title',
              title: 'Nome do Projeto',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'origin',
              title: 'Origem / Instrumento Legal',
              type: 'string',
              description: 'Ex: "Emenda Parlamentar nº 14080015 – FUNARTE"',
            }),
            defineField({
              name: 'value',
              title: 'Valor (R$)',
              type: 'string',
              description: 'Ex: "R$ 200.000,00"',
            }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  {title: 'Em execução', value: 'in_progress'},
                  {title: 'Concluído', value: 'completed'},
                  {title: 'Em análise', value: 'in_analysis'},
                  {title: 'Pendente', value: 'pending'},
                ],
                layout: 'radio',
              },
              initialValue: 'in_progress',
            }),
            defineField({
              name: 'documents',
              title: 'Documentos do Projeto',
              type: 'array',
              of: [defineArrayMember({type: 'downloadableFile'})],
            }),
          ],
          preview: {
            select: {title: 'title', status: 'status'},
            prepare({title, status}) {
              return {
                title,
                subtitle: statusMap[status as keyof typeof statusMap],
                media: LuFileText,
              }
            },
          },
        }),
      ],
    }),

    // Documentos - grupo documents
    defineField({
      name: 'documents',
      title: 'Documentos Avulsos',
      description: 'Documentos que não estão vinculados a um projeto específico',
      type: 'array',
      group: 'documents',
      of: [defineArrayMember({type: 'downloadableFile'})],
    }),

    //SEO
    excerptField(),
  ],
  preview: {
    select: {title: 'title', subtitle: 'partner'},
  },
  orderings: [{title: 'Ordem', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
