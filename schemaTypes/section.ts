import {defineArrayMember, defineField, defineType} from 'sanity'

/** A content section: optional heading followed by paragraphs. */
export const section = defineType({
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {title: 'heading', paragraphs: 'paragraphs'},
    prepare({title, paragraphs}) {
      return {
        title: title || '(no heading)',
        subtitle: paragraphs?.[0]?.slice(0, 80),
      }
    },
  },
})
