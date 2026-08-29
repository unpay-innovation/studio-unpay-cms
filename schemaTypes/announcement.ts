import {defineField, defineType} from 'sanity'

/** Announcements, shown either as the site-wide bar above the navigation
 *  or as the release banner inside the homepage hero — chosen per
 *  document via "Show in". One runs per placement at a time: the most
 *  recently updated enabled document whose schedule window (if set)
 *  includes now. The top bar is dismissible; editing the message shows
 *  it again to everyone. */
export const announcement = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Only shown in the Studio, e.g. "Payouts launch — Sep 2026".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'placement',
      title: 'Show in',
      type: 'string',
      options: {
        list: [
          {title: 'Top bar (all pages, dismissible)', value: 'topbar'},
          {title: 'Hero (homepage banner)', value: 'hero'},
        ],
        layout: 'radio',
      },
      initialValue: 'topbar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: false,
      description: 'Master switch. Off = never shows, regardless of schedule.',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      initialValue: 'NEW',
      description:
        'Short chip before the message (e.g. NEW, LIVE, v2026.09). Leave empty for none.',
      validation: (rule) => rule.max(12),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
      description: 'One short sentence. Keep it under ~80 characters so it fits on mobile.',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link label',
      type: 'string',
      description:
        'Top bar only: text of the link at the end of the message, e.g. "explore Payouts". In the hero the whole banner is the link.',
      hidden: ({document}) => document?.placement === 'hero',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL',
      type: 'string',
      description:
        'Internal path (/products/payouts) or full https:// URL. Required for hero banners, and whenever a link label is set.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as
            | {linkLabel?: string; placement?: string}
            | undefined
          if (doc?.placement === 'hero' && !value) return 'Required for hero banners'
          if (doc?.linkLabel && !value) return 'Required when a link label is set'
          if (value && !/^(https?:\/\/|\/)/.test(value.trim()))
            return 'Must start with / or https://'
          return true
        }),
    }),
    defineField({
      name: 'startAt',
      title: 'Start showing (optional)',
      type: 'datetime',
      description: 'Leave empty to show immediately once enabled.',
    }),
    defineField({
      name: 'endAt',
      title: 'Stop showing (optional)',
      type: 'datetime',
      description: 'Leave empty to show until disabled.',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'message', enabled: 'enabled', placement: 'placement'},
    prepare({title, subtitle, enabled, placement}) {
      return {
        title: `${enabled ? '🟢' : '⚪️'} ${title ?? 'Announcement'}`,
        subtitle: `${placement === 'hero' ? 'Hero · ' : 'Top bar · '}${subtitle ?? ''}`,
      }
    },
  },
})
