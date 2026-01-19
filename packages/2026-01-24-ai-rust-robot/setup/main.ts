import { NuAsciinemaPlayer } from '@nolebase/ui-asciinema'
import { defineAppSetup } from '@slidev/types'
import 'asciinema-player/dist/bundle/asciinema-player.css'

export default defineAppSetup(({ app }) => {
  app.component('NuAsciinemaPlayer', NuAsciinemaPlayer)
})
