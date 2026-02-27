import {MdAttachFile} from 'react-icons/md'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'downloadableFile',
  title: 'Link para PDF',
  type: 'file',
  icon: MdAttachFile,
  options: {
    accept: '.pdf',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Texto do Link',
      type: 'string',
      description: 'O nome do documento que será clicável. Ex: "Emenda Parlamentar"',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {asset?: {_ref: string; _type: string} | null}
          if (parent?.asset && !value) {
            return 'O texto do link é obrigatório para identificar o arquivo.'
          }
          return true
        }),
    }),
    defineField({
      name: 'label',
      title: 'Rótulo (Opcional)',
      type: 'string',
      description: 'Ex: "Mais informações", "Acesse", "Edital"',
      placeholder: 'Mais informações',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      title: 'title',
      asset: 'asset',
      fileName: 'asset.originalFilename',
    },
    prepare({label, title, asset, fileName}) {
      // Se não houver arquivo, mostramos um aviso no preview
      if (!asset) {
        return {
          title: 'Nenhum arquivo selecionado',
          media: MdAttachFile,
        }
      }

      return {
        title: title
          ? `${label ? `${label} — ` : ''}${title}`
          : label
            ? `${label} — Documento sem título`
            : 'Documento sem título',
        subtitle: fileName || 'Nome do arquivo não disponível',
        media: MdAttachFile,
      }
    },
  },
})
