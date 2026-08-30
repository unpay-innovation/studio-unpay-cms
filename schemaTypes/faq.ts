import {defineArrayMember, defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {richBlock} from './blocks'

/** Pages a FAQ can appear on. Values are stable ids used by the website. */
export const FAQ_PAGES = [
  {title: 'Homepage', value: 'home'},
  {title: 'Pricing', value: 'pricing'},
  {title: 'Contact', value: 'contact'},
  {title: 'Platform', value: 'platform'},
  {title: 'About', value: 'about'},
  {title: 'Careers', value: 'careers'},
  {title: 'Products (listing)', value: 'products'},
  {title: 'Solutions (listing)', value: 'solutions'},
  {title: 'Blog (listing)', value: 'blog'},
  {title: 'Press (listing)', value: 'press'},
  {title: 'Case studies (listing)', value: 'case-studies'},
  {title: 'Help Center (listing)', value: 'help-center'},
  {title: 'Privacy', value: 'privacy'},
  {title: 'Terms', value: 'terms'},
  {title: 'Solution: FinTechs & Neo-banks', value: 'solution:fintechs-neobanks'},
  {title: 'Solution: NBFCs & Lending Platforms', value: 'solution:nbfc-lending'},
  {title: 'Solution: Marketplaces & E-commerce', value: 'solution:marketplaces-ecommerce'},
  {title: 'Solution: SaaS & Platforms', value: 'solution:saas-platforms'},
  {title: 'Solution: Logistics & Mobility', value: 'solution:logistics'},
  {title: 'Solution: Real Estate & PropTech', value: 'solution:real-estate'},
  {title: 'Solution: EdTech & Education', value: 'solution:education'},
  {title: 'Solution: HealthTech & Insurance', value: 'solution:healthcare'},
  {title: 'Solution: Government & PSUs', value: 'solution:government'},
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
    }),
    defineField({
      name: 'documents',
      title: 'Show on specific articles',
      description:
        'Pick individual blog posts, press releases, case studies or help articles. Use this for questions that belong to one piece of content rather than a whole page.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [
            {type: 'post'},
            {type: 'pressRelease'},
            {type: 'caseStudy'},
            {type: 'helpArticle'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      const pages = (doc?.pages as string[] | undefined) ?? []
      const docs = (doc?.documents as unknown[] | undefined) ?? []
      return pages.length + docs.length > 0
        ? true
        : 'Pick at least one page or article — otherwise this FAQ never appears anywhere.'
    }),
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'question', pages: 'pages', documents: 'documents'},
    prepare({title, pages, documents}) {
      const onPages = (pages || []) as string[]
      const onDocs = ((documents || []) as unknown[]).length
      const where = [...onPages, onDocs ? `${onDocs} article${onDocs > 1 ? 's' : ''}` : '']
        .filter(Boolean)
        .join(', ')
      return {title, subtitle: where || 'Not placed anywhere yet'}
    },
  },
})
