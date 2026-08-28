import {defineArrayMember, defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {richBlock} from './blocks'

/** Pages a FAQ can appear on. Values are stable ids used by the website. */
export const FAQ_PAGES = [
  {title: 'Pricing page', value: 'pricing'},
  {title: 'Contact page', value: 'contact'},
  {title: 'Product: Flash Checkout', value: 'product:flash-checkout'},
  {title: 'Product: UPI Collect', value: 'product:upi-collect'},
  {title: 'Product: Payouts', value: 'product:payouts'},
  {title: 'Product: Connected Banking', value: 'product:connected-banking'},
  {title: 'Product: Escrow Banking', value: 'product:escrow-banking'},
  {title: 'Product: Embedded Finance', value: 'product:embedded-finance'},
  {title: 'Product: Lending OS', value: 'product:lending-os'},
  {title: 'Product: Loan Origination System', value: 'product:loan-origination-system'},
  {title: 'Product: Loan Management System', value: 'product:loan-management-system'},
  {title: 'Product: Reconciliation OS', value: 'product:reconciliation-os'},
  {title: 'Product: Risk & Fraud OS', value: 'product:risk-fraud-os'},
  {title: 'Product: Accounting OS', value: 'product:accounting-os'},
  {title: 'Product: KYC & Verification', value: 'product:kyc-verification'},
  {title: 'Product: DocSig', value: 'product:docsig'},
  {title: 'Product: HRM & Payroll OS', value: 'product:hrm-payroll-os'},
]

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      type: 'string',
      placeholder: 'e.g. Are there any setup or onboarding fees?',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      type: 'array',
      of: [richBlock],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'pages',
      title: 'Show on pages',
      description: 'Pick every page this question should appear on.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {list: FAQ_PAGES},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'question', pages: 'pages'},
    prepare({title, pages}) {
      return {title, subtitle: (pages || []).join(', ')}
    },
  },
})
