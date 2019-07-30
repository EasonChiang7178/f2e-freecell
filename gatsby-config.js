module.exports = {
  pathPrefix: "/f2e-freecell",
  siteMetadata: {
    title: `Retro Free Cell`,
    description: `復古風新接龍 | Designed by cyc`,
    author: `@EasonChiang7178`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `retro-free-cell`,
        short_name: `free-cell`,
        start_url: `/`,
        background_color: `#dbd3ca`,
        theme_color: `#a93d2d`,
        display: `minimal-ui`,
        icon: `src/images/freecell-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // `gatsby-plugin-remove-serviceworker`
  ],
}
