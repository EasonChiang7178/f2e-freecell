import React from 'react'
import { Stage, Layer } from 'react-konva/lib/ReactKonvaCore'

import FreeDeck from './decks/FreeDeck'
import SolvedDeck from './decks/SolvedDeck'

import ImageDataConsumer, { ImageDataProvider } from '../../contexts/ImageDataContext'

class FreeCellCanvas extends React.PureComponent {

  getCanvasWidth = () => window.innerWidth

  getCanvasHeight = () => window.innerHeight

  render = () => (
    <ImageDataConsumer>
      {imageData => (
        <Stage width={this.getCanvasWidth()} height={this.getCanvasHeight()}>
          <ImageDataProvider imageData={imageData}>
            <Layer>
              <FreeDeck />
              <SolvedDeck />
            </Layer>
          </ImageDataProvider>
        </Stage>
      )}
    </ImageDataConsumer>
  )
}

export default FreeCellCanvas
