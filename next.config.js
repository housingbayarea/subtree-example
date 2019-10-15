const withTM = require("next-transpile-modules")
const withSass = require("@zeit/next-sass")
const withMDX = require("@next/mdx")()
const axios = require("axios")
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
const DATA_SERVICE = process.env.DATA_SERVICE || "http://localhost:3001"

// Tell webpack to compile the ui components package
// https://www.npmjs.com/package/next-transpile-modules
module.exports = withMDX(
  withSass(
    withTM({
      transpileModules: ["@bloom"],
      // exportPathMap adapted from https://github.com/zeit/next.js/blob/canary/examples/with-static-export/next.config.js
      async exportPathMap() {
        // we fetch our list of listings, this allow us to dynamically generate the exported pages
        let listings = []

        try {
          const response = await axios.get(DATA_SERVICE)
          listings = response.data.listings
        } catch (error) {
          console.log(error)
        }

        // tranform the list of posts into a map of pages with the pathname `/post/:id`
        const listingPaths = listings.reduce(
          (listingPaths, listing) =>
            Object.assign({}, listingPaths, {
              [`/listing/${listing.id}`]: {
                page: "/listing",
                query: { id: listing.id }
              }
            }),
          {}
        )

        // define page paths for various available languages
        const translatablePaths = Object.assign({}, listingPaths, {
          "/": { page: "/" },
          "/listings": { page: "/listings" }
        })
        const languages = ["es"] // add new language codes here
        const languagePaths = {}
        Object.entries(translatablePaths).forEach(([key, value]) => {
          languagePaths[key] = value
          languages.forEach(language => {
            const query = Object.assign({}, value.query)
            query.language = language
            languagePaths[`/${language}${key.replace(/^\/$/, "")}`] = {
              ...value,
              query: query
            }
          })
        })

        // combine the map of all various types of page paths
        return Object.assign({}, languagePaths, {
          "/disclaimer": { page: "disclaimer" },
          "/privacy": { page: "/privacy" }
        })
      }
    })
  )
)
