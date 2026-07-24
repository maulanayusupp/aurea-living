// =============================================================================
// Navigation structure. Labels resolve against i18n `nav.*`. Routes are locale-
// agnostic; <NuxtLink> + localePath() handle the locale prefix at render time.
// =============================================================================
import type { ContactChannel, NavItem } from '~/types'

export const primaryNav: NavItem[] = [
  { id: 'residences', labelKey: 'nav.residences', to: '/residences' },
  { id: 'about', labelKey: 'nav.about', to: '/about' },
  { id: 'experience', labelKey: 'nav.experience', to: '/', hash: '#experience' },
  { id: 'contact', labelKey: 'nav.contact', to: '/contact' },
]

export const footerNav: NavItem[] = [
  { id: 'residences', labelKey: 'nav.residences', to: '/residences' },
  { id: 'about', labelKey: 'nav.about', to: '/about' },
  { id: 'contact', labelKey: 'nav.contact', to: '/contact' },
  { id: 'compliance', labelKey: 'nav.compliance', to: '/compliance' },
  { id: 'privacy', labelKey: 'nav.privacy', to: '/privacy' },
  { id: 'terms', labelKey: 'nav.terms', to: '/terms' },
]

/** Social / directory channels shown in the footer. Values are placeholders. */
export const socialChannels: ContactChannel[] = [
  {
    id: 'instagram',
    icon: 'instagram',
    labelKey: 'contact.channels.instagram',
    value: '@aurea.living',
    href: 'https://instagram.com',
  },
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    labelKey: 'contact.channels.whatsapp',
    value: '+62 878-2276-6333',
    href: '#',
    primary: true,
  },
]
