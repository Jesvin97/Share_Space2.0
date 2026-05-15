// Blog Post schema
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Spaces', value: 'Spaces' },
          { title: 'Production', value: 'Production' },
          { title: 'Tips & Tricks', value: 'Tips' },
          { title: 'Behind the Scenes', value: 'BTS' },
          { title: 'AEO', value: 'AEO' },
          { title: 'GEO', value: 'GEO' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'summary',
      title: 'Summary / TL;DR',
      type: 'text',
      description: 'Short description shown on the blog card.',
      validation: Rule => Rule.max(300),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  orderings: [
    { title: 'Published Date, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', subtitle: 'category' },
  },
};
