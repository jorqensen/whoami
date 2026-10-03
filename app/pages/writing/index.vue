<script setup lang="ts">
import { profile } from '~/data/content';

const title = `Writing — ${profile.name}`;
const description = `Posts and notes by ${profile.name}.`;

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description
});

const { data: posts } = await useAsyncData('posts', () =>
    queryCollection('posts')
        .where('draft', '=', false)
        .order('date', 'DESC')
        .select('path', 'title', 'description', 'date', 'tags')
        .all()
);

const route = useRoute();

// The static build only prerenders `/writing` without a query, so `?tag=`/`?page=` are applied
// after mount to keep hydration in sync with the prerendered HTML.
const mounted = ref(false);
onMounted(() => {
    mounted.value = true;
});
const query = computed(() => (mounted.value ? route.query : {}));

const activeTag = computed(() => (typeof query.value.tag === 'string' ? query.value.tag : null));

const tags = computed(() => {
    const counts = new Map<string, number>();
    for (const post of posts.value ?? []) {
        for (const tag of post.tags ?? []) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
});

const filteredPosts = computed(() =>
    activeTag.value ? (posts.value ?? []).filter(post => (post.tags ?? []).includes(activeTag.value!)) : (posts.value ?? [])
);

// Page 1 has a full-width featured card plus an even number of regular cards, so the grid stays balanced.
const firstPageSize = 7;
const pageSize = 8;
const totalPages = computed(() =>
    1 + Math.max(0, Math.ceil((filteredPosts.value.length - firstPageSize) / pageSize))
);

const page = computed({
    get: () => Math.min(totalPages.value, Math.max(1, Number(query.value.page) || 1)),
    set: value => navigateTo({ query: { ...route.query, page: value > 1 ? value : undefined } })
});

const isFeatured = (index: number) => index === 0 && page.value === 1;

const isLatest = (post: { path: string }) => post.path === posts.value?.[0]?.path;

const pagedPosts = computed(() => {
    const start = page.value === 1 ? 0 : firstPageSize + (page.value - 2) * pageSize;
    return filteredPosts.value.slice(start, start + (page.value === 1 ? firstPageSize : pageSize));
});
</script>

<template>
    <UContainer class="max-w-5xl pt-16">
        <UPage>
            <UPageHeader
                title="Writing"
                :ui="{ root: 'pt-12' }"
            />
            <UPageBody>
                <UEmpty
                    v-if="!posts?.length"
                    icon="i-ph-book-duotone"
                    title="No posts yet"
                    description="Nothing has been published here so far. Check back soon."
                    class="py-16"
                    variant="naked"
                />
                <template v-else>
                    <div class="mb-8 flex flex-wrap items-center gap-2">
                        <UButton
                            label="All"
                            size="sm"
                            :color="activeTag ? 'neutral' : 'primary'"
                            :variant="activeTag ? 'outline' : 'solid'"
                            :to="{ path: '/writing' }"
                        />
                        <UButton
                            v-for="[tag, count] in tags"
                            :key="tag"
                            :label="`${tag} (${count})`"
                            size="sm"
                            :color="activeTag === tag ? 'primary' : 'neutral'"
                            :variant="activeTag === tag ? 'solid' : 'outline'"
                            :to="{ path: '/writing', query: { tag } }"
                        />
                    </div>
                    <UBlogPosts class="lg:grid-cols-2">
                        <div
                            v-for="(post, index) in pagedPosts"
                            :key="post.path"
                            class="relative"
                            :class="isFeatured(index) || pagedPosts.length === 1 ? 'col-span-full' : ''"
                        >
                            <UBadge
                                v-if="isLatest(post)"
                                label="Latest"
                                color="primary"
                                variant="solid"
                                class="absolute -top-3 -right-3 z-10 rotate-6 uppercase tracking-widest ring-2 ring-default shadow-md"
                            />
                            <UBlogPost
                                :to="post.path"
                                :title="post.title"
                                :description="post.description"
                                :date="post.date"
                                variant="subtle"
                                class="h-full"
                                :ui="{
                                    root: 'ring-1 ring-default hover:ring-primary transition',
                                    body: isFeatured(index) ? 'sm:p-10' : '',
                                    title: isFeatured(index) ? 'text-3xl font-bold' : 'text-xl font-semibold',
                                    description: isFeatured(index) ? 'text-base' : 'line-clamp-3',
                                    footer: 'px-4 pb-4 sm:px-6 sm:pb-6'
                                }"
                            >
                                <template #footer>
                                    <div class="flex flex-wrap items-center gap-2">
                                        <UBadge
                                            v-for="tag in post.tags"
                                            :key="tag"
                                            :label="tag"
                                            color="neutral"
                                            variant="outline"
                                        />
                                    </div>
                                </template>
                            </UBlogPost>
                        </div>
                    </UBlogPosts>
                    <p
                        v-if="!filteredPosts.length"
                        class="py-16 text-center text-muted"
                    >
                        No posts match this tag.
                    </p>
                    <UPagination
                        v-if="totalPages > 1"
                        v-model:page="page"
                        :items-per-page="1"
                        :total="totalPages"
                        class="mt-10 flex justify-center"
                    />
                </template>
            </UPageBody>
        </UPage>
    </UContainer>
</template>
