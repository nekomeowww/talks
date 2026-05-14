import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
// @ts-expect-error - Ignoring the error of missing types for the uno config
import config from '@slidev/client/uno.config'
import { mergeConfigs, presetAttributify, presetIcons, presetWebFonts, presetWind3 } from 'unocss'

const cuteFontFamily = '"Nunito Variable", "Nunito", "ChillRoundM", "Kiwi Maru", "Comfortaa Variable", "Comfortaa", "DM Sans Variant", "DM Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
const roundedFontFamily = '"Comfortaa Variable", "Comfortaa", "DM Sans Variant", "DM Sans", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'

export default mergeConfigs([
  config,
  {
    rules: [
      ['font-math', { 'font-family': 'Latin Modern Roman, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }],
      ['font-cover', { 'font-family': `${roundedFontFamily} !important` }],
    ],
    safelist: [
      ...Array.from({ length: 30 }, (_, i) => `delay-${(i + 1) * 100}`),
    ],
    presets: [
      presetWind3({
        dark: 'class',
      }),
      presetAttributify(),
      presetIcons({
        collections: {
          ...createExternalPackageIconLoader('@proj-airi/lobe-icons'),
        },
      }),
      presetWebFonts({
        fonts: {
          nunitoWeb: {
            name: 'Nunito',
            provider: 'fontsource',
          },
          cn: 'Noto Serif SC',
          hand: 'Playwrite IT Moderna',
          comfortaaWeb: {
            name: 'Comfortaa',
            provider: 'fontsource',
          },
          dmSansWeb: {
            name: 'DM Sans',
            provider: 'fontsource',
          },
          kiwiMaruWeb: {
            name: 'Kiwi Maru',
            provider: 'fontsource',
          },
        },
        timeouts: {
          failure: 30000,
          warning: 30000,
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
