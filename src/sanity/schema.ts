import { defineType, defineField } from "sanity";

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'category', type: 'string', title: 'Category' }),
    defineField({ name: 'datePublished', type: 'date', title: 'Date Published' }),
    defineField({ name: 'featuredImage', type: 'image', title: 'Featured Image', options: { hotspot: true } }),
    defineField({ name: 'content', type: 'text', title: 'Content Summary' })
  ]
});

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({ name: 'headline', type: 'string', title: 'Headline' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'headline' } }),
    defineField({ name: 'datePublished', type: 'date', title: 'Date Published' }),
  ]
});

export const schemaTypes = [articleType, newsType];
