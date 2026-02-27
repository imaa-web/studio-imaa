import {MdInsertDriveFile} from 'react-icons/md'
import {defineType} from 'sanity'
import {baseGroups, basePageFields} from '../fields/shared'

export default defineType({
  name: 'page',
  title: 'Páginas',
  type: 'document',
  icon: MdInsertDriveFile,
  groups: [...baseGroups],
  fields: [...basePageFields],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'featuredImage',
      blocks: 'pageBuilder',
    },
    prepare({title, slug, media, blocks}) {
      const blockCount = blocks?.length || 0
      const blockLabel = blockCount === 1 ? 'bloco' : 'blocos'
      return {
        title,
        subtitle: slug
          ? `/${slug} · ${blockCount} ${blockLabel}`
          : `(sem URL) · ${blockCount} ${blockLabel}`,
        media: media?.asset ? media : MdInsertDriveFile,
      }
    },
  },
})
