# Silverlake CMS Integration Guide

This project is built with a CMS-ready architecture. Currently, it loads content from local JSON databases located in `src/content/`. 

To transition to a headless CMS (Sanity or Contentful) so that new articles and news announcements can be published without code modifications, follow the steps below.

---

## Option A: Sanity CMS Integration

### 1. Set Up Sanity
Run the following command in a new directory to initialize your Sanity Studio:
```bash
npm create sanity@latest
```
Follow the prompts to create a new project and dataset (e.g., `production`).

### 2. Define Schema Types
In your Sanity Studio schemas folder, define the following schemas:

#### `post.js` (Insights/Articles)
```javascript
export default {
  name: 'post',
  title: 'Insights',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    { name: 'author', title: 'Author', type: 'string', validation: Rule => Rule.required() },
    { name: 'category', title: 'Category', type: 'string', validation: Rule => Rule.required() },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } },
    { name: 'datePublished', title: 'Date Published', type: 'datetime', validation: Rule => Rule.required() },
    { name: 'readingTime', title: 'Reading Time', type: 'string', description: 'e.g., \"5 min read\"' },
    { name: 'summary', title: 'Summary / Excerpt', type: 'text', validation: Rule => Rule.required() },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }, // Rich Text
    { name: 'isFeatured', title: 'Is Featured Article?', type: 'boolean' }
  ]
}
```

#### `news.js` (News Announcements)
```javascript
export default {
  name: 'news',
  title: 'News Announcement',
  type: 'document',
  fields: [
    { name: 'headline', title: 'Headline', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'headline' }, validation: Rule => Rule.required() },
    { name: 'datePublished', title: 'Date Published', type: 'datetime', validation: Rule => Rule.required() },
    { name: 'summary', title: 'Summary', type: 'text', validation: Rule => Rule.required() },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
    { name: 'category', title: 'Category', type: 'string', options: { list: ['Announcement', 'Award', 'Press Release', 'Event'] } }
  ]
}
```

### 3. Connect Next.js to Sanity
1. Install the client SDK in `silverlake-website`:
   ```bash
   npm install @sanity/client next-sanity
   ```
2. Create `src/lib/sanity.ts` to configure the client:
   ```typescript
   import { createClient } from "next-sanity";

   export const client = createClient({
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
     apiVersion: "2026-06-23",
     useCdn: true,
   });
   ```
3. Update `src/lib/cms.ts` to fetch from Sanity instead of local JSON. For example, to fetch articles:
   ```typescript
   import { client } from "./sanity";
   import { Article } from "./types";

   export async function getArticles(options: GetArticlesOptions = {}) {
     const { search, category, tag } = options;
     
     // Construct GROQ query
     let query = `*[_type == "post"`;
     if (category && category !== "All") query += ` && category == $category`;
     if (tag) query += ` && $tag in tags`;
     if (search) query += ` && (title match $search || summary match $search)`;
     query += `] | order(datePublished desc)`;

     const params = { category, tag, search: `*${search}*` };
     const rawArticles = await client.fetch(query, params);
     
     // Apply pagination locally or in GROQ, then return matching PaginatedArticles structure
   }
   ```

---

## Option B: Contentful Integration

### 1. Configure Contentful Content Models
In your Contentful Space, create two Content Types matching these fields:

1. **Insight (Article):**
   - `title` (Short text)
   - `slug` (Short text)
   - `author` (Short text)
   - `category` (Short text)
   - `tags` (List of short texts)
   - `featuredImage` (Media attachment)
   - `datePublished` (Date/Time)
   - `readingTime` (Short text)
   - `summary` (Long text)
   - `content` (Rich Text)
   - `isFeatured` (Boolean)

2. **News Announcement:**
   - `headline` (Short text)
   - `slug` (Short text)
   - `datePublished` (Date/Time)
   - `summary` (Long text)
   - `content` (Rich Text)
   - `category` (Short text - dropdown)

### 2. Connect Next.js to Contentful
1. Install Contentful delivery SDK:
   ```bash
   npm install contentful
   ```
2. Configure Contentful Client in `src/lib/contentful.ts`:
   ```typescript
   import { createClient } from "contentful";

   export const contentfulClient = createClient({
     space: process.env.CONTENTFUL_SPACE_ID!,
     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
   });
   ```
3. Update `src/lib/cms.ts` to query Contentful:
   ```typescript
   import { contentfulClient } from "./contentful";

   export async function getArticles(options: GetArticlesOptions = {}) {
     const entries = await contentfulClient.getEntries({
       content_type: "insight",
       order: "-fields.datePublished",
       // Add query parameters for search/filtering
     });
     
     // Map entries.items to the Article interface structure
   }
   ```
