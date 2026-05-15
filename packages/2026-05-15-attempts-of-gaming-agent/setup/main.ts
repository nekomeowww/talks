import { NuAsciinemaPlayer } from '@nolebase/ui-asciinema'
import { defineAppSetup } from '@slidev/types'
import { airiSpeakClientKey, createAiriSpeakClientService } from '../components/airi-speak/client'
import '@fontsource-variable/comfortaa/index.css'
import '@fontsource-variable/dm-sans/index.css'
import '@fontsource-variable/nunito/index.css'
import '@fontsource/kiwi-maru/index.css'
import '@proj-airi/font-chillroundm/index.css'
import 'asciinema-player/dist/bundle/asciinema-player.css'

export default defineAppSetup(({ app }) => {
  app.provide(airiSpeakClientKey, createAiriSpeakClientService())
  app.component('NuAsciinemaPlayer', NuAsciinemaPlayer)
})
