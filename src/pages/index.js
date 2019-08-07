import React from "react"

import { ImageDataProvider } from '../contexts/ImageDataContext'
import { useCardImageData } from "../hooks/useCardImageData"

import SEO from "../layouts/SEO"
import GlobalStyles from "../layouts/GlobalStyles"
import FreeCellBoard from "../components/FreeCellBoard"

export default () => {
  const data = useCardImageData()

  return (
    <ImageDataProvider imageData={data}>
      <SEO title="Retro Free Cell" />
      <GlobalStyles />

      <FreeCellBoard />
    </ImageDataProvider>
  )
}
