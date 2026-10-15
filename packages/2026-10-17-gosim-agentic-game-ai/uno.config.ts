import { createExternalPackageIconLoader } from '@iconify/utils/lib/loader/external-pkg'
// @ts-expect-error - Ignoring the error of missing types for the uno config
import config from '@slidev/client/uno.config'
import { mergeConfigs, presetIcons } from 'unocss'

// Quicksand for Latin, Noto Sans SC for CJK.
const sansFontFamily = '"Quicksand Variable", "Quicksand", "ChillRoundM", "Noto Sans SC Variable", "Noto Sans SC", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji"'

// GOSIM Shenzhen 2026 palette, taken from the .pptx template.
export default mergeConfigs([
  config,
  {
    safelist: [
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
      colors: {
        ink: '#0A2540',
        gosim: {
          navy: '#293655',
          deep: '#285091',
          blue: '#456E95',
          sky: '#6292BF',
          cyan: '#91D2DD',
          sand: '#F7DB8F',
          gold: '#CEAA5B',
          pink: '#F9C4DA',
          rose: '#E87AA4',
        },
      },
      fontFamily: {
        sans: sansFontFamily,
        cute: sansFontFamily,
        rounded: sansFontFamily,
      },
    },
  },
])
