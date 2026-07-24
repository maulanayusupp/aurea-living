<script setup lang="ts">
// Renders a legal/compliance document from LegalSection[]. Titles/bodies are
// resolved from i18n by the parent page and passed as ready strings via a
// render map so this component stays presentational.
import type { LegalSection } from '~/types'

defineProps<{
  sections: LegalSection[]
  /** Resolved title for a section id. */
  title: (section: LegalSection) => string
  /** Resolved body (may contain \n paragraphs) for a section id. */
  body: (section: LegalSection) => string
  updated?: string
}>()
</script>

<template>
  <div class="legal container">
    <nav class="legal__toc" :aria-label="'Sections'">
      <ol>
        <li v-for="(section, i) in sections" :key="section.id">
          <a :href="`#${section.id}`">
            <span class="legal__toc-num">{{ String(i + 1).padStart(2, '0') }}</span>
            {{ title(section) }}
          </a>
        </li>
      </ol>
    </nav>

    <article class="legal__body">
      <p v-if="updated" class="legal__updated">{{ updated }}</p>
      <section
        v-for="(section, i) in sections"
        :id="section.id"
        :key="section.id"
        class="legal__section"
      >
        <h2 class="legal__section-title">
          <span class="legal__section-num">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ title(section) }}
        </h2>
        <p
          v-for="(para, p) in body(section).split('\n')"
          :key="p"
          class="legal__para"
        >
          {{ para }}
        </p>
      </section>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.legal {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  padding-block: clamp(3rem, 7vw, 5.5rem);

  @include respond-to('lg') {
    grid-template-columns: 16rem 1fr;
    align-items: start;
  }
}

.legal__toc {
  @include respond-to('lg') {
    position: sticky;
    top: calc(var(--header-h) + 2rem);
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    counter-reset: none;
  }

  a {
    display: flex;
    gap: 0.6rem;
    font-size: 0.92rem;
    color: var(--color-text-soft);
    transition: color var(--dur) var(--ease-out);

    &:hover {
      color: var(--color-accent-strong);
    }
  }
}

.legal__toc-num {
  font-family: $font-display;
  color: var(--color-accent);
  font-weight: 600;
}

.legal__updated {
  @include eyebrow;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.legal__section {
  padding-block: 1.75rem;
  border-top: 1px solid var(--color-line);

  &:first-of-type {
    border-top: none;
    padding-top: 0;
  }
}

.legal__section-title {
  display: flex;
  gap: 0.9rem;
  align-items: baseline;
  margin-bottom: 1rem;
}

.legal__section-num {
  font-size: 1rem;
  color: var(--color-accent);
}

.legal__para {
  color: var(--color-text-soft);
  margin-bottom: 0.85rem;
  max-width: 42rem;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
