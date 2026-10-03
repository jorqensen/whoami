import { defineCollection, defineContentConfig } from '@nuxt/content';
import * as v from 'valibot';

export default defineContentConfig({
    collections: {
        posts: defineCollection({
            type: 'page',
            source: { include: 'posts/**/*.md', prefix: '/writing' },
            schema: v.object({
                date: v.pipe(v.string(), v.isoDate()),
                tags: v.optional(v.array(v.string()), []),
                draft: v.optional(v.boolean(), false),
                rawbody: v.string()
            })
        })
    }
});
