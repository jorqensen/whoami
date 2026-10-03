<script setup lang="ts">
import { profile } from '~/data/content';

const { versions } = useNuxtApp();
const { public: { viteVersion } } = useRuntimeConfig();

const stack = [
    { label: 'Nuxt', version: versions.nuxt },
    { label: 'Vue', version: versions.vue },
    { label: 'Vite', version: viteVersion }
];

const nav = [
    { label: 'About', to: '/#about', active: false },
    { label: 'Experience', to: '/#experience', active: false },
    { label: 'OSS', to: '/#code', active: false },
    { label: 'Writing', to: '/writing', active: false },
    { label: 'Uses', to: '/uses', active: false }
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<template>
    <MotionConfig reduced-motion="user">
        <UHeader
            mode="drawer"
            title="Home"
            :toggle="{ color: 'neutral', variant: 'ghost' }"
            class="fixed inset-x-0 top-0 bg-default/70"
        >
            <template #title>
                <UIcon
                    name="i-ph-hash-duotone"
                    class="size-7 text-default"
                />
            </template>

            <UNavigationMenu
                :items="nav"
                variant="link"
                color="neutral"
            />

            <template #right>
                <UButton
                    label="Contact"
                    to="/#contact"
                    color="neutral"
                    variant="subtle"
                    size="sm"
                    class="max-lg:hidden"
                />
                <ThemeToggle />
            </template>

            <template #body>
                <UNavigationMenu
                    :items="nav"
                    orientation="vertical"
                    color="neutral"
                    class="-mx-2.5"
                />

                <UButton
                    label="Contact"
                    to="/#contact"
                    color="neutral"
                    variant="subtle"
                    block
                    class="mt-4"
                />
            </template>
        </UHeader>

        <UMain>
            <slot />
        </UMain>

        <UFooter
            :ui="{ root: 'border-t border-default bg-elevated/30', container: 'py-8 lg:py-10' }"
        >
            <template #left>
                <div class="flex flex-col gap-1">
                    <p class="font-medium text-highlighted">
                        {{ profile.name }}
                    </p>
                    <p class="text-sm text-muted">
                        © {{ new Date().getFullYear() }} · {{ profile.role }} · {{ profile.location }}
                    </p>
                    <USeparator class="my-1.5" />
                    <p class="font-mono text-xs text-muted">
                        Built with {{ stack.map(tech => `${tech.label} ${tech.version}`).join(' · ') }}
                    </p>
                </div>
            </template>

            <template #right>
                <UButton
                    label="Back to top"
                    trailing-icon="i-ph-arrow-up"
                    color="neutral"
                    variant="link"
                    size="sm"
                    @click="scrollToTop"
                />
            </template>
        </UFooter>
    </MotionConfig>
</template>
