import {MdInsertDriveFile} from 'react-icons/md'
import {defineType} from 'sanity'
import {baseGroups, basePageFields} from '../fields/shared'

export default defineType({
  name: 'page',
  title: 'Páginas',
  type: 'document',
  icon: MdInsertDriveFile,
  groups: baseGroups,
  fields: [...basePageFields],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'featuredImage',
    },
    prepare({title, slug, media}) {
      return {
        title,
        subtitle: slug ? `/${slug}` : '(sem URL)',
        media: media?.asset ? media : MdInsertDriveFile,
      }
    },
  },
})
