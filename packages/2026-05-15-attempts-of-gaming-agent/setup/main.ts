import { NuAsciinemaPlayer } from '@nolebase/ui-asciinema'
import { defineAppSetup } from '@slidev/types'
import '@fontsource-variable/comfortaa'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/nunito'
import '@fontsource/kiwi-maru'
import '@proj-airi/font-chillroundm/index.css'
import 'asciinema-player/dist/bundle/asciinema-player.css'

export default defineAppSetup(({ app }) => {
  app.component('NuAsciinemaPlayer', NuAsciinemaPlayer)
})
