<template>
    <ClientOnly>
        <UColorModeButton
            color="neutral"
            variant="ghost"
            size="sm"
            class="rounded-full"
        />
        <template #fallback>
            <div class="size-8" />
        </template>
    </ClientOnly>
</template>
