import {defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons/Play'

export const youtube = defineType({
  name: 'youtube',
  title: 'YouTube Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste any YouTube link, e.g. https://www.youtube.com/watch?v=…',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'caption', subtitle: 'url'},
    prepare({title, subtitle}) {
      return {title: title || 'YouTube video', subtitle}
    },
  },
})
