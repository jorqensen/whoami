<script setup lang="ts">
import { profile, uses } from '~/data/content';

const description = 'My PC, peripherals and the software I use every day.';

const title = `Uses — ${profile.name}`;

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description
});
</script>

<template>
    <UContainer class="max-w-5xl pt-16">
        <UPage>
            <UPageHeader
                title="Uses"
                :description="description"
                :ui="{ root: 'pt-12' }"
            />
            <UPageBody>
                <section
                    v-for="section in uses"
                    :key="section.title"
                    class="grid gap-8 py-10 md:grid-cols-3 md:gap-12"
                >
                    <div class="md:sticky md:top-24 md:self-start">
                        <UBadge
                            :label="`${section.items.length} items`"
                            variant="subtle"
                            color="primary"
                            class="mb-3"
                        />
                        <h2 class="text-2xl font-semibold text-highlighted">
                            {{ section.title }}
                        </h2>
                        <p class="mt-2 text-muted">
                            {{ section.description }}
                        </p>
                    </div>

                    <div class="flex flex-col gap-3 md:col-span-2">
                        <UPageCard
                            v-for="item in section.items"
                            :key="item.name"
                            :title="item.name"
                            :description="item.description"
                            :icon="item.icon"
                            orientation="horizontal"
                            variant="subtle"
                            spotlight
                            spotlight-color="primary"
                            :ui="{
                                container: 'lg:grid-cols-1',
                                leadingIcon: 'size-6',
                                leading: 'rounded-lg bg-primary/10 p-2.5',
                                title: 'text-base font-medium'
                            }"
                        />
                    </div>
                </section>
            </UPageBody>
        </UPage>
    </UContainer>
</template>
