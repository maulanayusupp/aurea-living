<script setup lang="ts">
// Compliance page — honest disclosures only. No fabricated certifications or
// partner/licence claims (see project rule: avoid over-claiming).
import { getLegalSections } from '~/services/content.service'
import type { LegalSection } from '~/types'

const { t } = useI18n()
const sections = getLegalSections('compliance')

usePageSeo(
  () => t('meta.compliance.title'),
  () => t('meta.compliance.description'),
)

const title = (s: LegalSection) => t(s.titleKey)
const body = (s: LegalSection) => t(s.bodyKey)
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('compliance.eyebrow')"
      :title="t('compliance.title')"
      :lead="t('compliance.lead')"
    />
    <LegalDocument :sections="sections" :title="title" :body="body" :updated="t('legal.updated')" />
  </div>
</template>
