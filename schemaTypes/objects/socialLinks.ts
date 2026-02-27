import {MdShare} from 'react-icons/md'
import {SiBluesky, SiFacebook, SiInstagram, SiX, SiYoutube} from 'react-icons/si'
import {defineField, defineType} from 'sanity'

const titleMap = {
  instagram: {title: 'Instagram', icon: SiInstagram},
  facebook: {title: 'Facebook', icon: SiFacebook},
  youtube: {title: 'YouTube', icon: SiYoutube},
  twitter: {title: 'X / Twitter', icon: SiX},
  bluesky: {title: 'Bluesky', icon: SiBluesky},
} as const

export default defineType({
  name: 'socialLink',
  title: 'Rede Social',
  type: 'object',
  icon: MdShare,
  fields: [
    defineField({
      name: 'platform',
      title: 'Plataforma',
      type: 'string',
      options: {
        list: (Object.keys(titleMap) as Array<keyof typeof titleMap>).map((value) => ({
          title: titleMap[value].title,
          value,
        })),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL do Perfil',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Rótulo (Opcional)',
      description: 'Texto de acessibilidade (ex: "Siga-nos no Instagram")',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      platform: 'platform',
      url: 'url',
    },
    prepare({platform, url}: {platform?: string; url?: string}) {
      const displayPlatform = platform
        ? titleMap[platform as keyof typeof titleMap]?.title ||
          platform.charAt(0).toUpperCase() + platform.slice(1)
        : 'Rede Social'
      return {
        title: displayPlatform,
        subtitle: url,
        media: titleMap[platform as keyof typeof titleMap]?.icon || MdShare,
      }
    },
  },
})
