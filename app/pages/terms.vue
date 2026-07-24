<script setup lang="ts">
// Terms of use page.
import { getLegalSections } from '~/services/content.service'
import type { LegalSection } from '~/types'

const { t } = useI18n()
const sections = getLegalSections('terms')

usePageSeo(
  () => t('meta.terms.title'),
  () => t('meta.terms.description'),
)

const title = (s: LegalSection) => t(s.titleKey)
const body = (s: LegalSection) => t(s.bodyKey)
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('terms.eyebrow')"
      :title="t('terms.title')"
      :lead="t('terms.lead')"
    />
    <LegalDocument :sections="sections" :title="title" :body="body" :updated="t('legal.updated')" />
  </div>
</template>
