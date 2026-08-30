import {defineArrayMember, defineField, defineType} from 'sanity'
import {richBlock} from './blocks'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {seoField} from './seo'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      placeholder: 'e.g. Why every growing business needs a unified payment stack',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      placeholder: 'One or two sentences shown on the blog listing and in Google results…',
      description: 'Short summary shown in blog listings and search results.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
      description: 'Filled automatically with the logged-in user. Change if publishing for someone else.',
      initialValue: (_params, context) => context.currentUser?.name ?? '',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      placeholder: 'e.g. Product Team',
      description: 'Author role or team.',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
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
    select: {title: 'title', subtitle: 'category.title', media: 'heroImage'},
  },
})
