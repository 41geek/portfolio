const fs = require('fs')
const path = require('path')
const {
  v03%3AeyJhbGciOiJkaXIiLCJraWQiOiJwcm9kdWN0aW9uOnRva2VuLXYzOjIwMjQtMTEtMDciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIn0..NXrGtdQPVR93fo7PG3wuAQ.oK-IZAihd71oZq8C4eMH55pSfWLurM22ioBXHzxcSTokv8YDvcTMNpHGtA_xH0SaqWnJCjjV-gLZbRuUlNL_yQRh7pd3URCvafWZB9A4YSYSABWlak4PKbQP17xf397EZfSRmPugGqILF5josr8E-sKXSxl9NrmizI3WlsPcWEVt0V8B7JI785OIni3XtaDow_PGoAy6sC4NRfBgXCOUnw3ZoL6hRax5hObzxtJi0Ea2s_6tyngtyuFrPVt0_Ij7Emidv6dajFu9j8LDfUsy08H9PvmARPHE9YoKiDFgGYqp5pYgeWcWg2hvEhfaJHJrsCpq1-DJOTRBuTVRcKKJovJFrYXOS5wYQEK0nVWTuew.6K7VurGs1scI_14XQL6Pb-en7nmaICp9jDR4TLIIFCM,
  331066442e2580128c4be427271ec290,
} = require('./src/lib/notion/server-constants')

try {
  fs.unlinkSync(path.resolve('.blog_index_data'))
} catch (_) {
  /* non fatal */
}
try {
  fs.unlinkSync(path.resolve('.blog_index_data_previews'))
} catch (_) {
  /* non fatal */
}

const warnOrError =
  process.env.NODE_ENV !== 'production'
    ? console.warn
    : (msg) => {
        throw new Error(msg)
      }

if (!NOTION_TOKEN) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_TOKEN being populated
  warnOrError(
    `\nNOTION_TOKEN is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

if (!BLOG_INDEX_ID) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_TOKEN being populated
  warnOrError(
    `\nBLOG_INDEX_ID is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

module.exports = {
  webpack(cfg, { dev, isServer }) {
    // only compile build-rss in production server build
    if (dev || !isServer) return cfg

    // we're in build mode so enable shared caching for Notion data
    process.env.USE_CACHE = 'true'

    const originalEntry = cfg.entry
    cfg.entry = async () => {
      const entries = { ...(await originalEntry()) }
      entries['build-rss.js'] = './src/lib/build-rss.ts'
      return entries
    }
    return cfg
  },
}
