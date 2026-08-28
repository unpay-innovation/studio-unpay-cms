import {defineArrayMember, defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons/Search'

/** SEO overrides shared by all content types. Every field is optional —
 *  the website falls back to the title and excerpt/summary. */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in Google and the browser tab. Keep under 60 characters. Leave empty to use the normal title.',
      validation: (rule) => rule.max(70).warning('Keep under 60–70 characters for Google.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'The snippet under the title in Google. Aim for 140–160 characters. Leave empty to use the excerpt/summary.',
      validation: (rule) => rule.max(170).warning('Keep under 160 characters for Google.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Focus keywords',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      description: 'A few phrases this page should rank for.',
    }),
  ],
})

export const seoField = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'seo',
})
