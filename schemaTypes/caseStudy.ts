import {defineArrayMember, defineField, defineType} from 'sanity'
import {richBlock} from './blocks'
import {seoField} from './seo'
import {CaseIcon} from '@sanity/icons/Case'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'company',
      type: 'string',
      placeholder: 'e.g. Mercury Finance',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'company'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'monogram',
      type: 'string',
      description: 'Short initials shown as the logo tile, e.g. MF.',
      validation: (rule) => rule.required().max(3),
    }),
    defineField({
      name: 'industry',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'person',
      type: 'object',
      fields: [
        defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
        defineField({name: 'role', type: 'string', validation: (rule) => rule.required()}),
      ],
    }),
    defineField({
      name: 'quote',
      type: 'text',
      rows: 3,
      placeholder: 'A short customer quote, e.g. “Integration took us 2 days.”',
    }),
    defineField({
      name: 'challenge',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'The build (solution)',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'products',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'UnPay products used, e.g. Flash Checkout, Payouts.',
    }),
    defineField({
      name: 'results',
      title: 'Key Results',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'result',
          fields: [
            defineField({name: 'value', type: 'string', title: 'Value (e.g. 2 days, 94.5%)'}),
            defineField({name: 'label', type: 'string', title: 'Label (e.g. integration time)'}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
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
      name: 'story',
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
  preview: {
    select: {title: 'company', subtitle: 'industry', media: 'heroImage'},
  },
})
