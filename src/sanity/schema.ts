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

export const subscriberType = defineType({
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    defineField({ 
      name: 'email', 
      type: 'string', 
      title: 'Email Address',
      validation: (Rule) => Rule.required().email()
    }),
    defineField({ 
      name: 'subscribedAt', 
      type: 'datetime', 
      title: 'Subscribed At',
      initialValue: () => new Date().toISOString()
    }),
  ]
});

export const aiInteractionType = defineType({
  name: 'aiInteraction',
  title: 'AI Interaction',
  type: 'document',
  fields: [
    defineField({ name: 'moduleId', type: 'string', title: 'Module ID' }),
    defineField({ name: 'inputs', type: 'text', title: 'User Inputs (JSON)' }),
    defineField({ name: 'prompt', type: 'text', title: 'System Prompt' }),
    defineField({ name: 'response', type: 'text', title: 'AI Response' }),
    defineField({ name: 'feedbackScore', type: 'number', title: 'Feedback Score', description: '1 for Good, -1 for Bad, 0 for Unrated', initialValue: 0 }),
    defineField({ name: 'createdAt', type: 'datetime', title: 'Created At', initialValue: () => new Date().toISOString() }),
  ]
});

export const schemaTypes = [articleType, newsType, subscriberType, aiInteractionType];
