<script setup lang="ts">
// Detail-page gallery: a large active image + thumbnail strip. Keyboard and
// pointer selectable. Images are the property poster + gallery variants.
const props = defineProps<{ images: string[]; alt: string }>()

const active = ref(0)
watch(() => props.images, () => (active.value = 0))
</script>

<template>
  <div class="gallery">
    <div class="gallery__stage">
      <img
        :src="images[active]"
        :alt="alt"
        class="gallery__img"
        width="1200"
        height="800"
      />
    </div>
    <div v-if="images.length > 1" class="gallery__thumbs" role="tablist">
      <button
        v-for="(img, i) in images"
        :key="img"
        class="gallery__thumb"
        :class="{ 'is-active': i === active }"
        role="tab"
        :aria-selected="i === active"
        :aria-label="`${alt} — ${i + 1}`"
        @click="active = i"
      >
        <img :src="img" :alt="''" width="200" height="150" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.gallery__stage {
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-line);
  background: var(--color-surface-alt);
}

.gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__thumbs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
}

.gallery__thumb {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color var(--dur) var(--ease-out);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.is-active {
    border-color: var(--color-gold-500);
  }
  &:hover {
    border-color: var(--color-gold-400);
  }
}
</style>
