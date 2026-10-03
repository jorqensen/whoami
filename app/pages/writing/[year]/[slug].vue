<script setup lang="ts">
import { profile } from '~/data/content';

const route = useRoute();

const { data: post } = await useAsyncData(`post-${route.path}`, () =>
    queryCollection('posts').path(route.path).first()
);

const { data: surround } = await useAsyncData(`post-${route.path}-surround`, () =>
    queryCollectionItemSurroundings('posts', route.path, { fields: ['description'] })
        .where('draft', '=', false)
        .order('date', 'DESC')
);

// The template still needs `v-if="post"` to narrow the type.
if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true });
}

const title = `${post.value.draft ? '[Draft] ' : ''}${post.value.title} — ${profile.name}`;

useSeoMeta({
    title,
    description: post.value.description,
    ogTitle: title,
    ogDescription: post.value.description,
    ogType: 'article',
    articlePublishedTime: post.value.date,
    articleAuthor: [profile.name],
    articleTag: post.value.tags,
    robots: post.value.draft ? 'noindex, nofollow' : undefined
});

// Same format as UBlogPost uses on the listing.
const date = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(post.value.date));
const readingTime = Math.max(1, Math.round((post.value.rawbody ?? '').trim().split(/\s+/).length / 200));
</script>

<template>
    <UContainer
        v-if="post"
        class="max-w-5xl pt-16"
    >
        <UPage>
            <UPageHeader
                :title="post.title"
                :description="post.description"
                :ui="{ root: 'pt-12' }"
            >
                <template #headline>
                    <UBreadcrumb
                        :items="[
                            { label: 'Writing', to: '/writing', icon: 'i-ph-arrow-left' },
                            { label: `${date} · ${readingTime} min read` }
                        ]"
                    />
                </template>
            </UPageHeader>
            <UPageBody>
                <UAlert
                    v-if="post.draft"
                    color="warning"
                    variant="subtle"
                    icon="i-ph-warning-duotone"
                    title="Draft"
                    description="This post is not published. It isn't listed in Writing and may change or be removed."
                />
                <ContentRenderer :value="post" />
                <USeparator v-if="surround?.some(Boolean)" />
                <UContentSurround :surround="surround" />
            </UPageBody>

            <template
                v-if="post.body?.toc?.links?.length"
                #right
            >
                <UContentToc :links="post.body.toc.links" />
            </template>
        </UPage>
    </UContainer>
</template>
