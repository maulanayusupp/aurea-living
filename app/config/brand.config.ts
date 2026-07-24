// =============================================================================
// Brand structure & identity constants. Text that is user-facing is referenced
// by i18n key elsewhere; this file holds stable, non-translated facts.
//
// NOTE: "Aurea Living" is an editable PLACEHOLDER brand for demonstration — not
// a real company. Do not present it as an actual registered developer.
// =============================================================================
import type { Stat } from '~/types'

export const brand = {
  name: 'Aurea Living',
  /** Short mark used by the logo lockup. */
  monogram: 'A',
  /** Founding/establishment year shown in the footer (placeholder). */
  since: 2019,
  /** City where the collection is presented. */
  city: 'Bandung',
  country: 'Indonesia',
} as const

/** Headline figures shown on the homepage stats band. Values are illustrative
 *  and intentionally modest to avoid over-claiming. */
export const brandStats: Stat[] = [
  { id: 'residences', value: '12', labelKey: 'stats.residences' },
  { id: 'collections', value: '4', labelKey: 'stats.collections' },
  { id: 'area', value: '5.4', labelKey: 'stats.area' },
  { id: 'since', value: '2019', labelKey: 'stats.since' },
]
