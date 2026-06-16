const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  const baseConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    images: {
      domains: ['res.cloudinary.com', 'images.unsplash.com', 'source.unsplash.com', 'picsum.photos', 'i.picsum.photos', 'images.pexels.com'],
      formats: ['image/webp'],
    },
  }

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...baseConfig,
      images: {
        ...baseConfig.images,
        domains: ['localhost', ...baseConfig.images.domains],
      },
    }
  }

  return baseConfig
}
