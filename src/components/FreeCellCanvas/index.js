import React from 'react'
import { Stage, Layer } from 'react-konva/lib/ReactKonvaCore'

import ImageDataConsumer, { ImageDataProvider } from '../../contexts/ImageDataContext'

import FreeDeck from './decks/FreeDeck'
import SolvedDeck from './decks/SolvedDeck'
import PuzzleBoard from './PuzzleBoard'

class FreeCellCanvas extends React.PureComponent {

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
                deckOfCards={[
                  [{ id: 'heart_k' }, { id: 'club_2' }, { id: 'diamond_10' }, { id: 'heart_3' }, { id: 'heart_6' }, { id: 'spade_a' }, { id: 'spade_10' }],
                  [{ id: 'diamond_2' }, { id: 'spade_7' }, { id: 'diamond_6' }, { id: 'spade_5' }, { id: 'club_10' }, { id: 'diamond_k' }, { id: 'heart_8' }],
                  [{ id: 'spade_9' }, { id: 'heart_4' }, { id: 'club_q' }, { id: 'spade_4' }, { id: 'club_7' }, { id: 'spade_2' }, { id: 'club_9' }],
                  [{ id: 'heart_a' }, { id: 'spade_8' }, { id: 'diamond_4' }, { id: 'heart_j' }, { id: 'heart_q' }, { id: 'diamond_9' }, { id: 'spade_q' }],
                  [{ id: 'club_8' }, { id: 'diamond_q' }, { id: 'heart_9' }, { id: 'club_k' }, { id: 'spade_k' }, { id: 'diamond_a' }],
                  [{ id: 'heart_10' }, { id: 'club_a' }, { id: 'diamond_7' }, { id: 'heart_2' }, { id: 'club_j' }, { id: 'spade_6' }],
                  [{ id: 'club_6' }, { id: 'diamond_3' }, { id: 'heart_5' }, { id: 'diamond_j' }, { id: 'diamond_5' }, { id: 'heart_7' }],
                  [{ id: 'spade_3' }, { id: 'diamond_8' }, { id: 'club_5' }, { id: 'club_3' }, { id: 'spade_j' }, { id: 'club_4' }],
                ]}
              />
            </Layer>
          </ImageDataProvider>
        </Stage>
      )}
    </ImageDataConsumer>
  )
}

export default FreeCellCanvas
