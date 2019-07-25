import React from "react"
import { Normalize } from 'styled-normalize'
import { createGlobalStyle } from 'styled-components'

import COLORS from "../constants/COLORS"

const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=DM+Serif+Text&display=swap');
  body {
    font-family: 'DM Serif Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${COLORS.GREY};
  }
`

class GlobalStyles extends React.PureComponent {
  render = () => (
    <>
      <Normalize />
      <Global />
    </>
  )
}

export default GlobalStyles
