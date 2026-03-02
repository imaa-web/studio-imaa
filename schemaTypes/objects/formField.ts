import {MdCheckBox, MdInput, MdList, MdRadioButtonChecked, MdTextFields} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'formField',
  title: 'Campo do Formulário',
  type: 'object',
  fields: [
    defineField({
      name: 'fieldType',
      title: 'Tipo de Campo',
      type: 'string',
      options: {
        list: [
          {title: 'Texto (Input)', value: 'input'},
          {title: 'Área de Texto', value: 'textarea'},
          {title: 'Seleção (Select)', value: 'select'},
          {title: 'Caixa de Seleção (Checkbox)', value: 'checkbox'},
          {title: 'Múltipla Escolha (Radio)', value: 'radio'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Rótulo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      hidden: ({parent}) => parent?.fieldType === 'checkbox' || parent?.fieldType === 'radio',
    }),
    defineField({
      name: 'inputType',
      title: 'Tipo de Input',
      type: 'string',
      options: {
        list: [
          {title: 'Texto', value: 'text'},
          {title: 'E-mail', value: 'email'},
          {title: 'Telefone', value: 'tel'},
          {title: 'Número', value: 'number'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'text',
      hidden: ({parent}) => parent?.fieldType !== 'input',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {fieldType?: string}
          if (parent?.fieldType === 'input' && !value) {
            return 'Selecione um tipo de input'
          }
          return true
        }),
    }),
    defineField({
      name: 'required',
      title: 'Obrigatório?',
      type: 'boolean',
      initialValue: false,
      description:
        'Para campos de texto, select e radio: exige que o campo seja preenchido. Para checkbox: exige que esteja marcado (use apenas para confirmações como "Li e aceito os termos"). Se o checkbox for uma pergunta de sim/não, deixe desmarcado.',
    }),
    defineField({
      name: 'width',
      title: 'Largura',
      type: 'string',
      options: {
        list: [
          {title: 'Metade da linha', value: 'half'},
          {title: 'Linha completa', value: 'full'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'full',
      hidden: ({parent}) => parent?.fieldType === 'checkbox',
    }),
    defineField({
      name: 'options',
      title: 'Opções',
      type: 'array',
      hidden: ({parent}) => parent?.fieldType !== 'select' && parent?.fieldType !== 'radio',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {fieldType?: string}
          if ((parent?.fieldType === 'select' || parent?.fieldType === 'radio') && !value?.length) {
            return 'Adicione pelo menos uma opção para este tipo de campo'
          }
          return true
        }),
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Rótulo',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {select: {title: 'label'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {
      label: 'label',
      fieldType: 'fieldType',
      required: 'required',
    },
    prepare({
      label,
      fieldType,
      required,
    }: {
      label?: string
      fieldType?: string
      required?: boolean
    }) {
      const typeLabels: Record<string, string> = {
        input: 'Input',
        textarea: 'Textarea',
        select: 'Select',
        checkbox: 'Checkbox',
        radio: 'Radio',
      }
      const icons: Record<string, typeof MdInput> = {
        input: MdInput,
        textarea: MdTextFields,
        select: MdList,
        checkbox: MdCheckBox,
        radio: MdRadioButtonChecked,
      }
      return {
        title: label ?? 'Campo sem rótulo',
        subtitle: `${typeLabels[fieldType ?? ''] ?? 'Tipo não definido'}${required ? ' · Obrigatório' : ''}`,
        media: icons[fieldType ?? ''] ?? MdInput,
      }
    },
  },
})
