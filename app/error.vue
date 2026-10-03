<script setup lang="ts">
import type { NuxtError } from '#app';
import { profile } from '~/data/content';

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error.statusCode === 404);
const heading = computed(() => (isNotFound.value ? 'Page not found' : 'Something went wrong'));
const message = computed(() =>
    isNotFound.value
        ? 'The page you\'re looking for doesn\'t exist or has moved.'
        : 'An unexpected error occurred. Please try again.'
);

useHead({ htmlAttrs: { lang: 'en' } });
useSeoMeta({ title: `${heading.value} — ${profile.name}`, robots: 'noindex' });

const goHome = () => clearError({ redirect: '/' });
const goWriting = () => clearError({ redirect: '/writing' });
</script>

<template>
    <UApp>
        <NuxtLayout>
            <UContainer class="max-w-5xl pt-16">
                <UPage>
                    <div class="flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
                        <UBadge
                            :label="String(error.statusCode)"
                            color="primary"
                            variant="subtle"
                            class="font-mono"
                        />
                        <h1 class="text-4xl font-bold tracking-tight text-highlighted sm:text-5xl">
                            {{ heading }}
                        </h1>
                        <p class="max-w-prose text-lg text-muted">
                            {{ message }}
                        </p>
                        <div class="flex flex-wrap gap-3">
                            <UButton
                                label="Back home"
                                icon="i-ph-house-duotone"
                                @click="goHome"
                            />
                            <UButton
                                label="Read my writing"
                                icon="i-ph-article-duotone"
                                color="neutral"
                                variant="outline"
                                @click="goWriting"
                            />
                        </div>
                    </div>
                </UPage>
            </UContainer>
        </NuxtLayout>
    </UApp>
</template>
