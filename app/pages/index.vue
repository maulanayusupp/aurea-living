<script setup lang="ts">
// Homepage — assembles the marketing sections. SEO title/description react to
// locale. Adds Organization + WebSite structured data via useSchemaOrg.
const { t } = useI18n()

usePageSeo(
  () => t('meta.home.title'),
  () => t('meta.home.description'),
)

useSchemaOrg([
  defineOrganization({
    name: 'Aurea Living',
    description: () => t('meta.home.description'),
  }),
  defineWebSite({ name: 'Aurea Living' }),
])
</script>

<template>
  <div>
    <HeroShowcase />
    <StatsBand />
    <FeaturedCollection />
    <ExperienceStrip />
    <ProcessSteps />
    <TestimonialBand />
    <CtaBand />
  </div>
</template>
