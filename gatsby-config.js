require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `sidereal`,
    // Default title of the page
    siteTitleAlt: `sidereal`,
    // Can be used for e.g. JSONLD
    siteHeadline: `sidereal`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://blog.linkletter.dev`,
    // Used for SEO
    siteDescription: `personal blog`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          {
            title: `Posts`,
            slug: `/posts`,
          },
          {
            title: `About`,
            slug: `/about`,
          }
        ],
        externalLinks: [
          {
            name: `Twitter`,
            url: `https://twitter.com/iburistu`
          },
          {
            name: `Github`,
            url: `https://github.com/iburistu`
          },
          {
            name: `Portfolio`,
            url: `https://linkletter.dev`
          }
        ],
        feedTitle: "sidereal",
        formatString: "MM/DD/YY",
        blogPath: "/posts"
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `sidereal`,
        short_name: `sidereal`,
        description: `personal blog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
}
