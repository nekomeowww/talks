import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import Basemove, { createS3Provider } from 'unplugin-basemove/vite'
import { defineConfig, loadEnv } from 'vite'

const remoteAssetPattern = /\.(?:mp4|mov|webm)$/i
const envDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir, '')

  return {
    publicDir: false,
    plugins: [
      ...((!env.S3_ENDPOINT || !env.S3_ACCESS_KEY_ID || !env.S3_SECRET_ACCESS_KEY)
        ? []
        : [
            Basemove({
              prefix: env.BASEMOVE_PREFIX || 'talks/2026-05-15-attempts-of-gaming-agent',
              include: [remoteAssetPattern],
              manifest: true,
              clean: false,
              dryRun: env.BASEMOVE_DRY_RUN === 'true',
              contentTypeBy: (filename: string) => {
                if (filename.endsWith('.mp4')) {
                  return 'video/mp4'
                }
                if (filename.endsWith('.mov')) {
                  return 'video/quicktime'
                }
                if (filename.endsWith('.webm')) {
                  return 'video/webm'
                }
              },
              provider: createS3Provider({
                endpoint: env.S3_ENDPOINT,
                accessKeyId: env.S3_ACCESS_KEY_ID,
                secretAccessKey: env.S3_SECRET_ACCESS_KEY,
                region: env.S3_REGION,
                publicBaseUrl: env.WARP_DRIVE_PUBLIC_BASE || env.S3_ENDPOINT,
              }),
            }),
          ]),
    ],
  }
})
