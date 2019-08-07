import React from "react"

import { ImageDataProvider } from "../contexts/ImageDataContext"
import { useCardImageData } from "../hooks/useCardImageData"
import { useBoardData } from "../hooks/useBoardData"

import SEO from "../layouts/SEO"
import GlobalStyles from "../layouts/GlobalStyles"
import FreeCellBoard from "../components/FreeCellBoard"

export default () => {
  const data = useCardImageData()
  const boardData = useBoardData()

  return (
    <ImageDataProvider imageData={data}>
      <SEO title="Retro Free Cell" />
      <GlobalStyles />

      <FreeCellBoard boardData={boardData} />
    </ImageDataProvider>
  )
}
