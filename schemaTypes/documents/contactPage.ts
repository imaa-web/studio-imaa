import {MdAssignment, MdContactPage, MdMailOutline, MdSearch} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Página de Contato',
  type: 'document',
  icon: MdContactPage,
  groups: [
    {name: 'hero', title: 'Hero & SEO', icon: MdSearch},
    {name: 'contact', title: 'Formulário de Contato', icon: MdMailOutline},
    {name: 'enrollment', title: 'Pré-inscrição', icon: MdAssignment},
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'heading',
      title: 'Título da Página',
      type: 'string',
      group: 'hero',
      initialValue: 'Entre em Contato',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Subtítulo',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descrição (SEO)',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: 'Usada nos metadados da página. Ideal: até 160 caracteres.',
      validation: (Rule) => [
        Rule.required().error('A descrição para SEO é obrigatória.'),
        Rule.max(160).warning('Recomendado até 160 caracteres para melhor SEO.'),
      ],
    }),

    // ── Formulário de Contato ─────────────────────────────────────────────────
    defineField({
      name: 'contactTabLabel',
      title: 'Rótulo da aba',
      type: 'string',
      group: 'contact',
      initialValue: 'Fale Conosco',
      description: 'Texto exibido no botão da aba.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactFormHeading',
      title: 'Título interno',
      type: 'string',
      group: 'contact',
      initialValue: 'Envie sua mensagem',
      description: 'Título exibido dentro do card do formulário.',
    }),
    defineField({
      name: 'contactFormDescription',
      title: 'Descrição',
      type: 'text',
      rows: 2,
      group: 'contact',
      description: 'Texto de apoio exibido abaixo do título interno.',
    }),

    // ── Formulário de Pré-inscrição ───────────────────────────────────────────
    defineField({
      name: 'enrollmentActive',
      title: 'Pré-inscrições abertas?',
      type: 'boolean',
      group: 'enrollment',
      initialValue: false,
      description:
        'Quando desativado, o formulário de pré-inscrição não aparece no site. As configurações são preservadas.',
    }),
    defineField({
      name: 'enrollmentTabLabel',
      title: 'Rótulo da aba',
      type: 'string',
      group: 'enrollment',
      initialValue: 'Pré-inscrição nas Oficinas',
      description: 'Texto exibido no botão da aba.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'enrollmentFormHeading',
      title: 'Título interno',
      type: 'string',
      group: 'enrollment',
      initialValue: 'Pré-inscrição nas Oficinas de Música',
      description: 'Título exibido dentro do card do formulário.',
    }),
    defineField({
      name: 'enrollmentFormDescription',
      title: 'Aviso / Descrição',
      type: 'text',
      rows: 3,
      group: 'enrollment',
      description:
        'Texto exibido em destaque acima dos campos (ex: informações sobre vagas, gratuidade, faixa etária).',
    }),
    defineField({
      name: 'enrollmentFormFields',
      title: 'Campos do Formulário de Pré-inscrição',
      type: 'array',
      group: 'enrollment',
      of: [{type: 'formField'}],
      validation: (Rule) =>
        Rule.required().min(1).error('Adicione pelo menos um campo ao formulário'),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Página de Contato',
        media: MdContactPage,
      }
    },
  },
})
