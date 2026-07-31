<script setup lang="ts">
// Privacy page. Reflects the actual (minimal) data flow: enquiries are handed
// off to email; the site itself stores no personal data server-side.
import { getLegalSections } from '~/services/content.service'
import type { LegalSection } from '~/types'

const { t } = useI18n()
const sections = getLegalSections('privacy')

usePageSeo(
  () => t('meta.privacy.title'),
  () => t('meta.privacy.description'),
)

const title = (s: LegalSection) => t(s.titleKey)
const body = (s: LegalSection) => t(s.bodyKey)
</script>

<template>
  <div>
    <PageHero
      :eyebrow="t('privacy.eyebrow')"
      :title="t('privacy.title')"
      :lead="t('privacy.lead')"
    />
    <LegalDocument :sections="sections" :title="title" :body="body" :updated="t('legal.updated')" />
  </div>
</template>
