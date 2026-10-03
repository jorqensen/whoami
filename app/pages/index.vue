<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import { experience, openSource, profile, socials } from '~/data/content';

const firstName = profile.name.split(' ')[0];
const taglineParts = profile.tagline.split(' · ');

const FEATURED_COUNT = 4;
const showEarlier = ref(false);
const showSkills = ref(false);

const toItem = (job: typeof experience[number]) => ({
    date: job.period,
    title: job.role,
    description: job.company,
    tags: job.tags
});

const featured = experience.slice(0, FEATURED_COUNT).map(toItem);
const earlier = experience.slice(FEATURED_COUNT).map(toItem);

const emailLink: ButtonProps[] = [{
    label: profile.email,
    to: `mailto:${profile.email}`,
    trailingIcon: 'i-ph-arrow-up-right',
    color: 'neutral',
    variant: 'link',
    size: 'xl',
    ui: { base: 'px-0', label: 'text-2xl font-medium break-all sm:text-4xl', trailingIcon: 'size-6 text-primary sm:size-9' }
}];

// 3-column rows of one wide (2) and one narrow (1) card, alternating which side is wide;
// a lone last card spans the full row.
const openSourceSpan = (i: number) => {
    if (i === openSource.length - 1 && i % 2 === 0) return 'lg:col-span-3';
    return i % 2 === Math.floor(i / 2) % 2 ? 'lg:col-span-2' : '';
};

const heroLinks = [
    ...socials.map(s => ({ ...s, target: '_blank' })),
    { label: 'Email', href: `mailto:${profile.email}`, icon: 'i-ph-mailbox-duotone', target: undefined },
];

const contactLinks = socials.map(s => ({ label: s.label, to: s.href, target: '_blank', icon: s.icon }));
</script>

<template>
    <div>
        <UPageHero
            id="top"
            :ui="{
                root: 'overflow-hidden',
                container: 'max-w-5xl pt-28 sm:pt-40 pb-16 sm:pb-24',
                wrapper: 'text-left',
                headline: 'mb-4',
                title: 'font-medium tracking-tight',
                description: 'max-w-xl mx-0',
                links: 'justify-start mt-10'
            }"
        >
            <template #top>
                <HeroBackground />
            </template>

            <template #headline>
                <Motion
                    as="span"
                    class="inline-flex items-center gap-2 font-mono text-xs text-muted"
                    :initial="{ opacity: 0, y: 12 }"
                    :animate="{ opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }"
                >
                    <span class="size-1.5 rounded-full bg-primary" />
                    {{ profile.role }} · {{ profile.location }}
                </Motion>
            </template>

            <template #title>
                <Motion
                    as="span"
                    class="block"
                    :initial="{ opacity: 0, y: 12 }"
                    :animate="{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: 'easeOut' } }"
                >
                    Hi, I'm <span class="text-primary">{{ firstName }}.</span>
                </Motion>
            </template>

            <template #description>
                <Motion
                    as="span"
                    class="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest text-muted sm:text-sm"
                    :initial="{ opacity: 0, y: 12 }"
                    :animate="{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2, ease: 'easeOut' } }"
                >
                    <span
                        v-for="part in taglineParts"
                        :key="part"
                        class="whitespace-nowrap not-last:after:ml-3 not-last:after:text-primary not-last:after:content-['·']"
                    >{{ part }}</span>
                </Motion>
            </template>

            <template #links>
                <Motion
                    v-for="(s, i) in heroLinks"
                    :key="s.label"
                    :initial="{ opacity: 0, y: 12 }"
                    :animate="{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.35 + i * 0.07, ease: 'easeOut' } }"
                    :transition="{ duration: 0.1, ease: 'easeOut' }"
                    :while-press="{ scale: 0.95 }"
                >
                    <UButton
                        :to="s.href"
                        :icon="s.icon"
                        :aria-label="s.label"
                        :title="s.label"
                        :target="s.target"
                        color="primary"
                        variant="link"
                        size="xl"
                    />
                </Motion>
            </template>
        </UPageHero>

        <USeparator />

        <UPageSection
            id="about"
            headline="About"
            title="A bit about me"
            class="scroll-mt-16"
        >
            <div class="grid gap-12 md:grid-cols-[15rem_1fr] md:gap-16 lg:grid-cols-[17rem_1fr]">
                <div class="mx-auto w-48 md:sticky md:top-28 md:w-full md:self-start">
                    <NuxtImg
                        src="/profile.jpg"
                        :alt="`Portrait of ${profile.name}`"
                        width="544"
                        height="680"
                        loading="lazy"
                        decoding="async"
                        class="aspect-4/5 w-full -rotate-2 rounded-2xl border-4 border-default object-cover shadow-xl transition duration-300 ease-out hover:rotate-0 hover:scale-[1.02] motion-reduce:transition-none"
                    />
                </div>

                <UPageList class="gap-8">
                    <UPageFeature
                        v-for="item in profile.about"
                        :key="item.title"
                        :title="item.title"
                        :description="item.text"
                        :icon="item.icon"
                        :ui="{
                            leadingIcon: 'size-6 text-primary',
                            title: 'text-lg font-medium',
                            description: 'leading-relaxed text-toned'
                        }"
                    >
                        <template
                            v-if="'link' in item"
                            #description
                        >
                            {{ item.text }}
                            <ULink
                                :to="item.link.href"
                                target="_blank"
                                class="mt-2 flex items-center gap-1 font-medium text-primary hover:underline"
                            >
                                {{ item.link.label }}
                                <UIcon name="i-ph-arrow-up-right" />
                            </ULink>
                        </template>
                    </UPageFeature>
                </UPageList>
            </div>

            <USeparator class="mt-12">
                <UButton
                    :label="showSkills ? 'Hide tools & technologies' : 'Show tools & technologies'"
                    color="neutral"
                    variant="link"
                    size="sm"
                    :trailing-icon="showSkills ? 'i-ph-caret-up' : 'i-ph-caret-down'"
                    :aria-expanded="showSkills"
                    @click="showSkills = !showSkills"
                />
            </USeparator>

            <UCollapsible v-model:open="showSkills">
                <template #content>
                    <div class="flex flex-wrap justify-center gap-2 pt-6">
                        <UBadge
                            v-for="skill in profile.skills"
                            :key="skill.label"
                            :label="skill.label"
                            :icon="skill.icon"
                            color="neutral"
                            variant="outline"
                            size="lg"
                        />
                    </div>
                </template>
            </UCollapsible>
        </UPageSection>

        <USeparator />

        <UPageSection
            id="experience"
            headline="Experience"
            title="Where I've worked"
            class="scroll-mt-16"
        >
            <UTimeline
                v-for="orientation in (['horizontal', 'vertical'] as const)"
                :key="orientation"
                :default-value="0"
                :items="featured"
                :orientation="orientation"
                :class="orientation === 'horizontal' ? 'max-md:hidden' : 'md:hidden'"
                size="xs"
                color="primary"
                :ui="{ date: 'font-mono text-xs', title: 'text-xl font-medium' }"
            >
                <template #description="{ item }">
                    <p class="text-primary">
                        {{ item.description }}
                    </p>
                    <div class="mt-4 flex flex-wrap gap-2">
                        <UBadge
                            v-for="t in item.tags"
                            :key="t"
                            :label="t"
                            color="neutral"
                            variant="outline"
                        />
                    </div>
                </template>
            </UTimeline>

            <template v-if="earlier.length">
                <USeparator class="mt-12">
                    <UButton
                        :label="showEarlier ? 'Hide earlier experience' : `Show earlier experience (${earlier.length})`"
                        color="neutral"
                        variant="link"
                        size="sm"
                        :trailing-icon="showEarlier ? 'i-ph-caret-up' : 'i-ph-caret-down'"
                        :aria-expanded="showEarlier"
                        @click="showEarlier = !showEarlier"
                    />
                </USeparator>

                <UCollapsible v-model:open="showEarlier">
                    <template #content>
                        <UPageGrid class="pt-10 lg:grid-cols-2">
                            <UPageCard
                                v-for="item in earlier"
                                :key="item.title + item.date"
                                :title="item.title"
                                variant="subtle"
                                :ui="{ title: 'text-lg font-medium' }"
                            >
                                <template #header>
                                    <div class="flex items-center justify-between gap-3">
                                        <span class="text-sm text-muted">{{ item.description }}</span>
                                        <UBadge
                                            :label="item.date"
                                            color="neutral"
                                            variant="subtle"
                                            class="font-mono"
                                        />
                                    </div>
                                </template>
                                <template #footer>
                                    <div class="flex flex-wrap gap-2">
                                        <UBadge
                                            v-for="t in item.tags"
                                            :key="t"
                                            :label="t"
                                            color="neutral"
                                            variant="outline"
                                        />
                                    </div>
                                </template>
                            </UPageCard>
                        </UPageGrid>
                    </template>
                </UCollapsible>
            </template>
        </UPageSection>

        <USeparator />

        <UPageSection
            v-if="openSource.length"
            id="code"
            headline="Open source"
            title="Built in the open"
            description="Some of the things I've built and keep tinkering with."
            :links="[{ label: 'All repositories', to: `https://github.com/${profile.github}`, target: '_blank', trailingIcon: 'i-ph-arrow-up-right', color: 'neutral', variant: 'link' }]"
            class="scroll-mt-16"
        >
            <UPageGrid class="sm:grid-cols-1 lg:grid-cols-3">
                <UPageCard
                    v-for="(r, i) in openSource"
                    :key="r.href"
                    :title="r.title"
                    :description="r.description"
                    :to="r.href"
                    target="_blank"
                    icon="i-ph-github-logo-duotone"
                    variant="subtle"
                    spotlight
                    spotlight-color="primary"
                    :class="openSourceSpan(i)"
                    :ui="{ title: 'text-xl font-medium', footer: 'w-full' }"
                >
                    <template #footer>
                        <div class="flex flex-wrap items-center gap-2">
                            <UBadge
                                v-for="t in r.tags"
                                :key="t"
                                :label="t"
                                color="neutral"
                                variant="outline"
                            />
                        </div>
                    </template>
                </UPageCard>
            </UPageGrid>
        </UPageSection>

        <USeparator />

        <UPageSection
            id="contact"
            headline="Get in touch"
            description="Got a question, a thought on something I've written, or just want to say hi? Drop me a line — I read everything."
            :links="emailLink"
            class="scroll-mt-16"
            :ui="{
                headline: 'justify-start',
                title: 'max-w-3xl text-left text-5xl font-medium text-balance sm:text-7xl',
                description: 'max-w-xl text-left text-lg',
                links: 'justify-start'
            }"
        >
            <template #title>
                Let's <span class="text-primary">talk.</span>
            </template>

            <UPageLinks
                :links="contactLinks"
                :ui="{
                    list: 'gap-0 divide-y divide-default border-y border-default',
                    link: 'w-full gap-4 py-5 text-xl font-medium hover:text-primary',
                    linkLeadingIcon: 'text-muted group-hover:text-primary',
                    linkLabel: 'flex flex-1 items-center justify-between overflow-visible',
                    linkLabelExternalIcon: 'static size-5 text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary'
                }"
            />
        </UPageSection>
    </div>
</template>
