<script setup lang="ts">
import { profile } from '~/data/content';

const title = `${profile.name} — ${profile.role}`;

const route = useRoute();
const { siteUrl } = useRuntimeConfig().public;
const url = computed(() => `${siteUrl}${route.path === '/' ? '' : route.path}`);

useHead({
    htmlAttrs: { lang: 'en' },
    link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'canonical', href: url },
    ],
});

// Site-wide defaults; pages override title/description (and their og: variants).
useSeoMeta({
    title,
    description: profile.tagline,
    ogTitle: title,
    ogDescription: profile.tagline,
    ogType: 'website',
    ogUrl: url,
    ogSiteName: profile.name,
    ogLocale: 'en_US',
    ogImage: `${siteUrl}/profile.jpg`,
    ogImageWidth: 1360,
    ogImageHeight: 1360,
    ogImageAlt: profile.name,
    twitterCard: 'summary',
});
</script>

<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
