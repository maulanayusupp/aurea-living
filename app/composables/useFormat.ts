// =============================================================================
// Locale-aware formatting helpers (currency, area, number). Uses Intl with the
// active i18n locale so IDR/EN formatting follows the current language.
// =============================================================================

export function useFormat() {
  const { locale } = useI18n()

  const intlLocale = computed(() => (locale.value === 'en' ? 'en-US' : 'id-ID'))

  /** Format an IDR amount. Large luxury prices are shown in compact form
   *  (e.g. "Rp 14,5 M" / "IDR 14.5B") to stay readable on cards. */
  function price(value: number, compact = true): string {
    if (compact) {
      const billions = value / 1_000_000_000
      const millions = value / 1_000_000
      if (locale.value === 'en') {
        return billions >= 1
          ? `IDR ${trimZero(billions)}B`
          : `IDR ${trimZero(millions)}M`
      }
      return billions >= 1
        ? `Rp ${trimZero(billions, 'id')} M`
        : `Rp ${trimZero(millions, 'id')} Jt`
    }
    return new Intl.NumberFormat(intlLocale.value, {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  /** Format an area in square metres. */
  function area(value: number): string {
    return `${new Intl.NumberFormat(intlLocale.value).format(value)} m²`
  }

  /** Plain localized integer. */
  function number(value: number): string {
    return new Intl.NumberFormat(intlLocale.value).format(value)
  }

  function trimZero(n: number, loc: 'en' | 'id' = 'en'): string {
    const rounded = Math.round(n * 10) / 10
    const str = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
    return loc === 'id' ? str.replace('.', ',') : str
  }

  return { price, area, number }
}
