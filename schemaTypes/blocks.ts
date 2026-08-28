import {defineArrayMember, defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {ThListIcon} from '@sanity/icons/ThList'
import {LinkIcon} from '@sanity/icons/Link'

export const TEXT_COLORS = [
  {title: 'Default', value: 'default'},
  {title: 'Brand accent', value: 'accent'},
  {title: 'Red', value: 'red'},
  {title: 'Orange', value: 'orange'},
  {title: 'Green', value: 'green'},
  {title: 'Blue', value: 'blue'},
  {title: 'Purple', value: 'purple'},
  {title: 'Gray', value: 'gray'},
]

export const HIGHLIGHT_COLORS = [
  {title: 'Yellow', value: 'yellow'},
  {title: 'Green', value: 'green'},
  {title: 'Blue', value: 'blue'},
  {title: 'Pink', value: 'pink'},
]

/** Rich text paragraph block: headings (sizes), colors, lists, links, etc. */
export const richBlock = defineArrayMember({
  type: 'block',
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'Large (lead)', value: 'lead'},
    {title: 'Heading 2', value: 'h2'},
    {title: 'Heading 3', value: 'h3'},
    {title: 'Heading 4', value: 'h4'},
    {title: 'Quote', value: 'blockquote'},
  ],
  lists: [
    {title: 'Bullet list', value: 'bullet'},
    {title: 'Numbered list', value: 'number'},
  ],
  marks: {
    decorators: [
      {title: 'Bold', value: 'strong'},
      {title: 'Italic', value: 'em'},
      {title: 'Underline', value: 'underline'},
      {title: 'Strikethrough', value: 'strike-through'},
      {title: 'Inline code', value: 'code'},
    ],
    annotations: [
      {
        name: 'link',
        title: 'Link',
        type: 'object',
        icon: LinkIcon,
        fields: [
          defineField({
            name: 'href',
            title: 'URL',
            type: 'url',
            validation: (rule) =>
              rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
          }),
          defineField({
            name: 'openInNewTab',
            type: 'boolean',
            initialValue: false,
          }),
        ],
      },
      {
        name: 'textColor',
        title: 'Text color',
        type: 'object',
        fields: [
          defineField({
            name: 'value',
            title: 'Color',
            type: 'string',
            options: {list: TEXT_COLORS},
            initialValue: 'accent',
          }),
        ],
      },
      {
        name: 'highlight',
        title: 'Highlight',
        type: 'object',
        fields: [
          defineField({
            name: 'value',
            title: 'Color',
            type: 'string',
            options: {list: HIGHLIGHT_COLORS},
            initialValue: 'yellow',
          }),
        ],
      },
    ],
  },
})

/** Table with an optional caption. */
export const contentTable = defineType({
  name: 'contentTable',
  title: 'Table',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'table',
      type: 'table',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'firstRowIsHeader',
      title: 'First row is a header row',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'caption'},
    prepare({title}) {
      return {title: title || 'Table'}
    },
  },
})

/** Colored box for notes, tips and warnings. */
export const callout = defineType({
  name: 'callout',
  title: 'Callout Box',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'tone',
      type: 'string',
      options: {
        list: [
          {title: '💡 Info (blue)', value: 'info'},
          {title: '✅ Success (green)', value: 'success'},
          {title: '⚠️ Warning (orange)', value: 'warning'},
          {title: '🚨 Important (red)', value: 'danger'},
          {title: 'Neutral (gray)', value: 'neutral'},
        ],
        layout: 'radio',
      },
      initialValue: 'info',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'body'},
    prepare({title, subtitle}) {
      return {title: title || 'Callout', subtitle}
    },
  },
})

/** Button linking anywhere. */
export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
    }),
    defineField({
      name: 'variant',
      type: 'string',
      options: {
        list: [
          {title: 'Solid (dark)', value: 'solid'},
          {title: 'Outline', value: 'outline'},
        ],
        layout: 'radio',
      },
      initialValue: 'solid',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'url'},
  },
})
