import React from "react"

import SEO from "../layouts/SEO"
import GlobalStyles from "../layouts/GlobalStyles"
import FreeCellCanvas from "../components/FreeCellCanvas"

const IndexPage = () => (
  <>
    <SEO title="Retro Free Cell" />
    <GlobalStyles />

    <FreeCellCanvas />
  </>
)

export default IndexPage
