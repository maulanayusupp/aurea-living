// =============================================================================
// Scroll-reveal composable. Adds `.is-visible` to `.reveal` elements as they
// enter the viewport, using a single shared IntersectionObserver. Respects
// prefers-reduced-motion (elements stay visible via the CSS fallback).
// Client-only; a no-op during SSR. Stagger is expressed in component SCSS
// (e.g. `.reveal:nth-child(n)`), never as inline style — see project rules.
// =============================================================================

export function useReveal(targetSelector = '.reveal') {
  const root = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!import.meta.client || !('IntersectionObserver' in window)) return

    const scope: ParentNode = root.value ?? document
    const targets = scope.querySelectorAll<HTMLElement>(targetSelector)
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    targets.forEach((el) => observer.observe(el))
    onBeforeUnmount(() => observer.disconnect())
  })

  return { root }
}
