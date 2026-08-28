import {defineArrayMember, defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'
import {richBlock} from './blocks'
import {seoField} from './seo'

export const helpArticle = defineType({
  name: 'helpArticle',
  title: 'Knowledge Base Article',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      placeholder: 'e.g. Which KYC documents do I need?',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 2,
      placeholder: 'One or two sentences shown in the Help Center listing…',
      description: 'One or two sentences shown in the Help Center listing.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        richBlock,
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
        defineArrayMember({type: 'contentTable'}),
        defineArrayMember({type: 'callout'}),
        defineArrayMember({type: 'code', title: 'Code Block', options: {withFilename: true}}),
        defineArrayMember({type: 'ctaButton'}),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers appear first within the category.',
      initialValue: 0,
    }),
    seoField,
  ],
  orderings: [
    {
      title: 'Category, then order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'category.title'},
  },
})
