import {defineArrayMember, defineField, defineType} from 'sanity'
import {richBlock} from './blocks'
import {seoField} from './seo'
import {BillIcon} from '@sanity/icons/Bill'

export const pressRelease = defineType({
  name: 'pressRelease',
  title: 'Press Release',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      placeholder: 'e.g. UnPay launches Reconciliation OS — month-end close in hours',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      placeholder: 'One or two sentences journalists can quote directly…',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Shown full width under the title. Landscape works best (roughly 16:9). Optional — the page reads fine without one.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'What the picture shows, for screen readers and search.',
          validation: (rule) => rule.required().max(160),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          description: 'Optional line printed under the image (credit, context).',
          validation: (rule) => rule.max(200),
        }),
      ],
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({type: 'section'}),
        defineArrayMember({
          type: 'image',
          name: 'contentImage',
          title: 'Image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Alternative text'}),
            defineField({name: 'caption', type: 'string'}),
          ],
        }),
        defineArrayMember({type: 'youtube'}),
        richBlock,
        defineArrayMember({type: 'contentTable'}),
        defineArrayMember({type: 'callout'}),
        defineArrayMember({type: 'code', title: 'Code Block', options: {withFilename: true}}),
        defineArrayMember({type: 'ctaButton'}),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    seoField,
  ],
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'heroImage'},
  },
})
