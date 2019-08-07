import { renderToString } from "react-dom/server"
import { ServerStyleSheet } from "styled-components"

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const sheet = new ServerStyleSheet()
  const bodyHTML = renderToString(sheet.collectStyles(bodyComponent))
  replaceBodyHTMLString(bodyHTML)

  const styleElement = sheet.getStyleElement()
  setHeadComponents(styleElement)
}
