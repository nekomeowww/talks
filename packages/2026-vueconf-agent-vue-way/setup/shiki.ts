import type { LanguageRegistration } from 'shiki'
import { defineShikiSetup } from '@slidev/types'

import velin from './velin.tmLanguage.json'

export default defineShikiSetup(() => {
  return {
    theme: {
      dark: 'github-dark',
      light: 'github-light',
    },
    langs: [
      'ts',
      'js',
      'vue',
      'html',
      'md',
      'json',
      'yaml',
      'bash',
      velin as unknown as LanguageRegistration,
    ],
  }
})
