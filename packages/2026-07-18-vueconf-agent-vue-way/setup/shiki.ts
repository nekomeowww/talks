import { defineShikiSetup } from '@slidev/types'

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
    ],
  }
})
