import React from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva/lib/ReactKonvaCore'
import Konva from "konva"

import ImageDataConsumer, { ImageDataProvider } from '../../contexts/ImageDataContext'

import FreeDeck from './decks/FreeDeck'
import SolvedDeck from './decks/SolvedDeck'
import DraggingDeck from './decks/DraggingDeck'
import PuzzleBoard from './PuzzleBoard'
import Freecell from '../../utils/freecell'

import { STACKED_CARD_OFFSET_Y } from '../../constants/LAYOUTS'
import COLORS from '../../constants/COLORS'

class FreeCellCanvas extends React.PureComponent {
  static propTypes = {
    gameState: PropTypes.array.isRequired,
    draggingStartPos: PropTypes.object,
    draggingCards: PropTypes.array,
    prevDraggingCardsPos: PropTypes.object,
    moveCardsToDrag: PropTypes.func.isRequired,
    moveDraggingCardsToPuzzle: PropTypes.func.isRequired
  }

  static defaultProps = {
    draggingStartPos: { x: 0, y: 0 },
    draggingCards: []
  }

  getCanvasWidth = () => 1440 // [TODO] Support SSR and responsive simultaneously

  getCanvasHeight = () => 821 // [TODO] Support SSR and responsive simultaneously

  handlePuzzleLayerDragStart = (e) => {
    const cardId = e.target.name()

    const [deckIndex, cardIndex] = Freecell.getCardPosInPuzzleDeck(this.props.gameState, cardId)
    const { x, y } = e.target.getClientRect()
    
    this.props.moveCardsToDrag(deckIndex, cardIndex, { x, y })
  }

  handleDraggingLayerDragEnd = (e) => {
    const { deckIndex, cardIndex } = this.props.prevDraggingCardsPos
    const endPosCardId = this.props.gameState[deckIndex][cardIndex - 1]
    
    const targetDropCard = this.stageNode.findOne(`.${endPosCardId.id}`)
    const targetDropPos = targetDropCard.getClientRect()

    e.target.to({
      x: targetDropPos.x,
      y: targetDropPos.y + STACKED_CARD_OFFSET_Y,
      duration: 0.15,
      easing: Konva.Easings.EaseOut,
      onFinish: () => {
        e.target.getChildren().each(child => {
          child.to({
            duration: 0.6,
            easing: Konva.Easings.ElasticEaseOut,
            shadowOffsetX: 0, shadowOffsetY: 0,
            shadowBlur: 0,
          })
        })

        e.target.to({
          duration: 0.6,
          easing: Konva.Easings.ElasticEaseOut,
          scaleX: 1, scaleY: 1,
          onFinish: () => {
            this.props.moveDraggingCardsToPuzzle()
          }
        })
      }
    })
  }

  handleDraggingLayerDragStart = (e) => {
    e.cancelBubble = true
    
    e.target.getChildren().each(child => {
      child.setAttrs({
        shadowColor: COLORS.BLACK,
        shadowBlur: 16,
        shadowOpacity: .4,
        shadowOffset: { x: 0, y: 4 },
      })
    })

    e.target.setAttrs({
      scaleX: 1.05, scaleY: 1.05
    })
  }

  setStageRef = (node) => this.stageNode = node

  render = () => {
    const { gameState, draggingCards, draggingStartPos } = this.props

    return (
      <ImageDataConsumer>
        {imageData => (
          <Stage
            width={this.getCanvasWidth()}
            height={this.getCanvasHeight()}
            ref={this.setStageRef}
          >
            <ImageDataProvider imageData={imageData}>

              {/* Puzzle Layer */}
              <Layer onDragStart={this.handlePuzzleLayerDragStart}>
                <FreeDeck />
                <SolvedDeck />

                <PuzzleBoard deckOfCards={gameState} />
              </Layer>

              {/* Dragging Cards Layer */}
              <Layer onDragStart={this.handleDraggingLayerDragStart} onDragEnd={this.handleDraggingLayerDragEnd}>
                <DraggingDeck cards={draggingCards} x={draggingStartPos.x} y={draggingStartPos.y} />
              </Layer>

            </ImageDataProvider>
          </Stage>
        )}
      </ImageDataConsumer>
    )
  }
}

export default FreeCellCanvas
