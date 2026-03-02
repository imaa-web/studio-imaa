import {MdArrowDropDownCircle, MdLink} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Item de Menu',
  type: 'object',
  icon: MdLink,
  fields: [
    defineField({
      name: 'pageReference',
      title: 'Página de Destino',
      description: 'Selecione para link direto. Deixe vazio para criar um Dropdown.',
      type: 'reference',
      to: [{type: 'page'}, {type: 'homePage'}, {type: 'contactPage'}],
    }),
    defineField({
      name: 'label',
      title: 'Rótulo (Texto que aparece)',
      type: 'string',
      description: 'Obrigatório se não houver página selecionada.',
      // VALIDAÇÃO CONDICIONAL:
      validation: (Rule) =>
        Rule.custom((value: string | undefined, context) => {
          const parent = context.parent as any
          const hasPage = parent?.pageReference?._ref !== undefined

          // Se não tem página e o label está vazio, gera erro
          if (!hasPage && !value) {
            return 'Como você não selecionou uma página, é obrigatório dar um nome para este item do menu.'
          }
          return true
        }),
    }),
    defineField({
      name: 'submenu',
      title: 'Sub-itens (Dropdown)',
      type: 'array',
      of: [{type: 'menuItem'}],
      hidden: ({path}) => {
        // Hide the submenu field if we are already inside a submenu (depth ≥ 2 occurrences of 'submenu' in the path)
        return path.filter((segment) => segment === 'submenu').length >= 2
      },
      validation: (Rule) =>
        Rule.custom((value: any[] | undefined) => {
          if (!value || value.length === 0) return true
          const hasDeepNesting = value.some(
            (item) => Array.isArray(item?.submenu) && item.submenu.length > 0,
          )
          if (hasDeepNesting) {
            return 'Submenus não podem ter submenus aninhados (máximo: 1 nível).'
          }
          return true
        }),
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value: any) => {
      const hasPageReference = value?.pageReference?._ref !== undefined
      const hasSubmenu = Array.isArray(value?.submenu) && value.submenu.length > 0

      if (!hasPageReference && !hasSubmenu) {
        return 'O item deve ter uma Página de Destino OU um Submenu.'
      }
      if (hasPageReference && hasSubmenu) {
        return 'Conflito: Um item não pode ter link e submenu ao mesmo tempo.'
      }
      return true
    }),
  preview: {
    select: {
      customLabel: 'label',
      pageTitle: 'pageReference.title',
      submenu: 'submenu',
    },
    prepare({customLabel, pageTitle, submenu}) {
      const hasSubmenu = submenu?.length > 0
      // O preview prioriza o label customizado, se não existir usa o título da página
      const displayTitle = customLabel || pageTitle || '⚠️ Sem nome configurado'

      return {
        title: displayTitle,
        subtitle: hasSubmenu
          ? `Dropdown (${submenu.length} itens)`
          : `Link: ${pageTitle || customLabel || 'Página sem título'}`,
        media: hasSubmenu ? MdArrowDropDownCircle : MdLink,
      }
    },
  },
})
