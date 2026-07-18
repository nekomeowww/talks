import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
// @ts-expect-error - Ignoring the error of missing types for the uno config
import config from '@slidev/client/uno.config'
import { mergeConfigs, presetIcons } from 'unocss'

const cuteFontFamily = '"Nunito Variable", "Nunito", "ChillRoundM", "Kiwi Maru", "Comfortaa Variable", "Comfortaa", "DM Sans Variant", "DM Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
const roundedFontFamily = '"Comfortaa Variable", "Comfortaa", "DM Sans Variant", "DM Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

export default mergeConfigs([
  config,
  {
    rules: [
      ['font-math', { 'font-family': 'Latin Modern Roman, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }],
      ['font-cover', { 'font-family': `${roundedFontFamily} !important` }],
      ['font-vieval', { 'font-family': `"Momo Trust Display", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` }],
    ],
    safelist: [
      'font-sans',
      'font-cover',
      ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
    ],
    presets: [
      presetIcons({
        collections: {
          ...createExternalPackageIconLoader('@proj-airi/lobe-icons'),
        },
      }),
    ],
    theme: {
      fontFamily: {
        sans: cuteFontFamily,
        cute: cuteFontFamily,
        cuteen: cuteFontFamily,
        cutejp: cuteFontFamily,
        rounded: roundedFontFamily,
        comfortaa: roundedFontFamily,
      },
    },
  },
])
