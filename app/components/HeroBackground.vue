<script setup lang="ts">
import {
    DENMARK_DOTS,
    FLAT_MAP_COLS,
    FLAT_MAP_ROWS,
    LAND_DOTS_FLAT,
} from '~/data/land-dots-flat';

const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
let cleanup: (() => void) | undefined;

onMounted(() => {
    if (!canvas.value) return;
    const el = canvas.value;
    const ctx = el.getContext('2d')!;
    let size = 0;
    let height = 0;

    const resize = () => {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        size = el.clientWidth;
        height = el.clientHeight;
        el.width = size * dpr;
        el.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Every grid cell is the same size, so no projection maths at render time.
    const draw = () => {
        const style = getComputedStyle(el);
        const cell = size / FLAT_MAP_COLS;
        const px = (col: number) => col * cell;
        const py = (row: number) => row * cell;

        ctx.clearRect(0, 0, size, height);
        ctx.fillStyle = style.color;

        // Land, as a dot matrix; Denmark's own dots use the theme's primary colour so its shape reads clearly.
        const dot = Math.max(1.4, cell * 0.55);
        const dots = (list: readonly number[]) => {
            ctx.beginPath();
            for (let i = 0; i < list.length; i += 2) {
                const x = px(list[i]! + 0.5);
                const y = py(list[i + 1]! + 0.5);
                ctx.moveTo(x + dot / 2, y);
                ctx.arc(x, y, dot / 2, 0, Math.PI * 2);
            }
            ctx.fill();
        };
        ctx.globalAlpha = 0.5;
        dots(LAND_DOTS_FLAT);
        ctx.fillStyle = style.getPropertyValue('--ui-primary').trim() || style.color;
        ctx.globalAlpha = 0.9;
        dots(DENMARK_DOTS);
        ctx.globalAlpha = 1;
    };

    // Static render: redraw only on resize or when the theme colour changes.
    const mo = new MutationObserver(() => requestAnimationFrame(draw));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

    const ro = new ResizeObserver(() => {
        resize();
        draw();
    });
    ro.observe(el);

    resize();
    draw();

    cleanup = () => {
        ro.disconnect();
        mo.disconnect();
    };
});

onBeforeUnmount(() => cleanup?.());
</script>

<template>
    <div
        aria-hidden
        class="pointer-events-none absolute inset-0 overflow-hidden"
    >
        <div
            class="absolute inset-0 mask-[radial-gradient(ellipse_70%_60%_at_30%_35%,black,transparent)]"
            style="background-image: linear-gradient(to right, color-mix(in oklch, var(--ui-text) 7%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--ui-text) 7%, transparent) 1px, transparent 1px); background-size: 56px 56px;"
        />
        <div
            :style="{ aspectRatio: `${FLAT_MAP_COLS} / ${FLAT_MAP_ROWS}` }"
            class="absolute -right-16 bottom-0 w-104 text-highlighted opacity-20 sm:right-0 sm:bottom-0 sm:w-136 sm:opacity-30 md:opacity-50 lg:opacity-80"
        >
            <canvas
                ref="canvas"
                class="size-full"
            />
        </div>
    </div>
</template>
