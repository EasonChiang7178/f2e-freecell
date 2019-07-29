import React from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva/lib/ReactKonvaCore'

import ImageDataConsumer, { ImageDataProvider } from '../../contexts/ImageDataContext'

import FreeDeck from './decks/FreeDeck'
import SolvedDeck from './decks/SolvedDeck'
import PuzzleBoard from './PuzzleBoard'

class FreeCellCanvas extends React.PureComponent {
  static propTypes = {
    state: PropTypes.array.isRequired
  }

  getCanvasWidth = () => 1440 // [TODO] Support SSR and responsive simultaneously

  getCanvasHeight = () => 821 // [TODO] Support SSR and responsive simultaneously

  render = () => (
    <ImageDataConsumer>
      {imageData => (
        <Stage width={this.getCanvasWidth()} height={this.getCanvasHeight()}>
          <ImageDataProvider imageData={imageData}>
            <Layer>
              <FreeDeck />
              <SolvedDeck />

              <PuzzleBoard
                deckOfCards={this.props.state}
              />
            </Layer>
          </ImageDataProvider>
        </Stage>
      )}
    </ImageDataConsumer>
  )
}

export default FreeCellCanvas
