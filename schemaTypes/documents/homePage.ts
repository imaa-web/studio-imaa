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
    titleField(),
    excerptField,
    defineField({
      name: 'heroText',
      title: 'Texto da Seção Hero',
      type: 'blockContent',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
  ],
})
