import {MdContactPage, MdMail, MdPhone} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactInfo',
  title: 'Informações de Contato',
  type: 'object',
  icon: MdContactPage,
  fields: [
    defineField({
      name: 'address',
      title: 'Endereço',
      type: 'object',
      fields: [
        defineField({name: 'street', title: 'Rua/Av e Número', type: 'string'}),
        defineField({name: 'complement', title: 'Complemento', type: 'string'}),
        defineField({name: 'neighborhood', title: 'Bairro', type: 'string'}),
        defineField({name: 'cityState', title: 'Cidade / UF', type: 'string'}),
        defineField({
          name: 'zipCode',
          title: 'CEP',
          type: 'string',
          validation: (Rule) =>
            Rule.regex(/^\d{5}-\d{3}$/).error('CEP inválido. Use o formato 00000-000'),
        }),
      ],
    }),
    defineField({
      name: 'phones',
      title: 'Telefones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          icon: MdPhone,
          fields: [
            defineField({
              name: 'label',
              title: 'Rótulo (ex: Comercial, WhatsApp, Residencial)',
              type: 'string',
            }),
            defineField({
              name: 'number',
              title: 'Número',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isWhatsApp',
              title: 'É WhatsApp?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {select: {title: 'number', subtitle: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'emails',
      title: 'E-mails',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          icon: MdMail,
          fields: [
            defineField({name: 'label', title: 'Rótulo', type: 'string'}),
            defineField({
              name: 'address',
              title: 'E-mail',
              type: 'string',
              validation: (Rule) => Rule.required().email(),
            }),
          ],
          preview: {select: {title: 'address', subtitle: 'label'}},
        }),
      ],
    }),
  ],
})
