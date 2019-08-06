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

import { STACKED_CARD_OFFSET_Y, CARD_SHADOW_BLUR } from '../../constants/LAYOUTS'

class FreeCellCanvas extends React.PureComponent {
  static propTypes = {
    gameState: PropTypes.object.isRequired,
    draggingStartPos: PropTypes.object,
    draggingCards: PropTypes.array,
    prevDraggingCardsPos: PropTypes.object,
    moveCardsToDrag: PropTypes.func.isRequired,
    moveFreeCardToDrag: PropTypes.func.isRequired,
    moveDraggingCardsToPuzzle: PropTypes.func.isRequired,
    moveDraggingCardsToFreeCell: PropTypes.func.isRequired,
    moveDraggingCardsToSolvedDeck: PropTypes.func.isRequired
  }

  static defaultProps = {
    draggingStartPos: { x: 0, y: 0 },
    draggingCards: [],
  }

  state = {
    dragDisabled: false,
  }

  componentDidMount = () => {
    this.stageNode.on('dblclick dbltap', this.handleStageNodeDoubleClick)
  }

  getCanvasWidth = () => 1440 // [TODO] Support SSR and responsive simultaneously

  getCanvasHeight = () => 821 // [TODO] Support SSR and responsive simultaneously

  getDroppableFreeCells = () => {
    const freeDeck = this.stageNode.findOne(".free-deck")
    const allFreeCells = freeDeck.children
    const freeCells = allFreeCells.filter(cell => {
      const cellInside = cell.children
      return !cellInside[cellInside.length - 1].name()
    })

    return freeCells
  }

  getDroppableSolvedTopCards = () => {
    const solvedDeck = this.stageNode.findOne(".solved-deck")
    const allSolvedCells = solvedDeck.children
    const solvedTopCards = allSolvedCells.map(cell => {
      const cellInside = cell.children
      return cellInside[cellInside.length - 1]
    })

    return solvedTopCards
  }

  getDroppablePuzzleLeafCards = () => {
    const puzzleBoard = this.stageNode.findOne(".puzzle-board")
    const stackDecks = puzzleBoard.children
    const leafCards = stackDecks.map(deck => {
      const cards = deck.children
      return cards.length !== 0 ? cards[cards.length - 1] : null
    })

    return leafCards
  }

  handlePuzzleDeckDragStart = e => {
    const cardId = e.target.name()

    const [deckIndex, cardIndex] = Freecell.getCardPosInPuzzleDeck(
      this.props.gameState.puzzle,
      cardId
    )
    const { x, y } = e.target.getClientRect()

    this.props.moveCardsToDrag(deckIndex, cardIndex, { x, y })
  }

  handleFreeDeckDragStart = e => {
    const cardId = e.target.name()
    const { x, y } = e.target.getClientRect()

    const freeCells = this.props.gameState.free
    const freeIndex = Object.keys(freeCells).findIndex(
      key => (freeCells[key] && freeCells[key].id) === cardId
    )

    this.props.moveFreeCardToDrag(freeIndex, { x, y })
  }

  handleDraggingLayerDragStart = e => {
    e.cancelBubble = true

    e.target.getChildren().each(child => {
      child.setAttrs({
        shadowBlur: 16,
        shadowOpacity: 0.4,
        shadowOffset: { x: 0, y: 4 },
      })
    })

    e.target.setAttrs({
      scaleX: 1.05,
      scaleY: 1.05,
    })
  }

  handleDraggingLayerDragEnd = e => {
    this.setState(() => ({ dragDisabled: true }))
    const draggingCards = e.target
    const pointerClientX = e.evt.clientX
    const pointerClientY = e.evt.clientY

    if (this.checkFreeCellsAndDropCard(draggingCards, pointerClientX, pointerClientY)) {
      return
    }

    if (this.checkSolvedDecksAndDropCard(draggingCards, pointerClientX, pointerClientY)) {
      return
    }

    if (this.checkPuzzleDecksAndDropCards(draggingCards, pointerClientX, pointerClientY)) {
      return
    }

    this.bounceBackDraggingCards(draggingCards)
  }

  handleStageNodeDoubleClick = e => {
    const clickedCard = e.target
    const clickedCardId = clickedCard.name()
    const puzzleLeafCards = this.getDroppablePuzzleLeafCards()
    if (puzzleLeafCards.some(leafCard => leafCard.name() === clickedCardId) === false) {
      return 
    }
    
    const solvedTopCards = this.getDroppableSolvedTopCards()
    const targetDropCell = solvedTopCards.find(card => (
      Freecell.isSolvable(card.name(), clickedCardId)
    ))

    if (targetDropCell) {
      const { x: droppedX, y: droppedY } = targetDropCell.getClientRect()
      const { x: cardX, y: cardY } = clickedCard.getClientRect()
      const targetPosX = droppedX - cardX
      const targetPosY = droppedY - cardY

      const [deckIndex, cardIndex] = Freecell.getCardPosInPuzzleDeck(
        this.props.gameState.puzzle, clickedCardId
      )
      const { x, y } = e.target.getClientRect()

      this.setState(() => ({ dragDisabled: true }))
      this.props.moveCardsToDrag(deckIndex, cardIndex, { x, y })

      setTimeout(() => {
        const [category, number] = Freecell.getCardCategoryAndNumber(targetDropCell.name())
  
        this.animateCardsToPos(
          this.stageNode.find(`.${clickedCardId}`),
          targetPosX + (number > 0 ? CARD_SHADOW_BLUR : 1),
          targetPosY + (number > 0 ? CARD_SHADOW_BLUR : 1),
          () => {
            this.setState(() => ({ dragDisabled: false }))
            this.props.moveDraggingCardsToSolvedDeck(category)
          }
        )
      }, 0)
    }
  }

  checkFreeCellsAndDropCard = (draggingCards, pointerClientX, pointerClientY) => {
    if (this.props.draggingCards.length !== 1) {
      return false
    }

    const freeCells = this.getDroppableFreeCells()
    const targetDropCell = freeCells.find(cell => {
      const rect = cell.getClientRect()
      return this.isPosInsideRect(
        pointerClientX, pointerClientY,
        rect.x, rect.y, rect.width, rect.height
      )
    })

    if (targetDropCell) {
      const targetDropFreeCellIndex = this.stageNode
        .findOne(".free-deck")
        .children.findIndex(cell => cell === targetDropCell)

      const { x: targetPosX, y: targetPosY } = targetDropCell.getClientRect()
      this.animateCardsToPos(
        draggingCards,
        targetPosX + 1,
        targetPosY + 1,
        () => {
          this.setState(() => ({ dragDisabled: false }))
          this.props.moveDraggingCardsToFreeCell(targetDropFreeCellIndex)
        }
      )

      return true
    }
    return false
  }

  checkSolvedDecksAndDropCard = (draggingCards, pointerClientX, pointerClientY) => {
    if (this.props.draggingCards.length !== 1) {
      return false
    }

    const solvedTopCards = this.getDroppableSolvedTopCards()
    const targetDropCell = solvedTopCards.find(card => {
      const rect = card.getClientRect()
      return (
        Freecell.isSolvable(
          card.name(),
          this.props.draggingCards[0].id
        ) &&
        this.isPosInsideRect(
          pointerClientX, pointerClientY,
          rect.x, rect.y, rect.width, rect.height
        )
      )
    })

    if (targetDropCell) {
      const { x: targetPosX, y: targetPosY } = targetDropCell.getClientRect()
      const [category, number] = Freecell.getCardCategoryAndNumber(
        targetDropCell.name()
      )

      this.animateCardsToPos(
        draggingCards,
        targetPosX + (number > 0 ? CARD_SHADOW_BLUR : 1),
        targetPosY + (number > 0 ? CARD_SHADOW_BLUR : 1),
        () => {
          this.setState(() => ({ dragDisabled: false }))
          this.props.moveDraggingCardsToSolvedDeck(category)
        }
      )

      return true
    }
    return false
  }

  checkPuzzleDecksAndDropCards = (draggingCards, pointerClientX, pointerClientY) => {
    const puzzleLeafCards = this.getDroppablePuzzleLeafCards()
    const emptyDecksNum = puzzleLeafCards.reduce((totalNum, card) => card.name() === "empty-cell" ? totalNum + 1 : totalNum, 0)
    const emptyFreeCellNum = this.getDroppableFreeCells().length

    const targetDropCell = puzzleLeafCards.find(cell => {
      const rect = cell.getClientRect()
      return (
        Freecell.isStackable(
          cell.name(), emptyDecksNum,
          emptyFreeCellNum,
          this.props.draggingCards[0].id, this.props.draggingCards.length
        ) &&
        this.isPosInsideRect(
          pointerClientX, pointerClientY,
          rect.x, rect.y, rect.width, rect.height
        )
      )
    })

    if (targetDropCell) {
      const targetDropPuzzleDeckIndex = puzzleLeafCards.findIndex(card => card.name() === targetDropCell.name())

      const { x: targetPosX, y: targetPosY } = targetDropCell.getClientRect()
      const dropPosOffsetX = targetDropCell.name() !== "empty-cell" ? CARD_SHADOW_BLUR : 0
      const dropPosOffsetY = targetDropCell.name() !== "empty-cell" ? STACKED_CARD_OFFSET_Y + CARD_SHADOW_BLUR : 0

      this.animateCardsToPos(
        draggingCards,
        targetPosX + dropPosOffsetX,
        targetPosY + dropPosOffsetY,
        () => {
          this.setState(() => ({ dragDisabled: false }))
          this.props.moveDraggingCardsToPuzzle(targetDropPuzzleDeckIndex)
        }
      )

      return true
    }
    return false
  }

  isPosInsideRect = (x, y, rectX, rectY, rectW, rectH) =>
    rectX <= x && x <= rectX + rectW && rectY <= y && y <= rectY + rectH

  animateCardsToPos(cards, x, y, callback) {
    let callbackCalled = false

    cards.to({
      x: x,
      y: y,
      duration: 0.15,
      easing: Konva.Easings.EaseOut,
      onFinish: () => {
        cards.getChildren().each(child => {
          child.to({
            duration: 0.45,
            easing: Konva.Easings.ElasticEaseOut,
            shadowOffsetX: 0,
            shadowOffsetY: 2,
            shadowBlur: CARD_SHADOW_BLUR,
            shadowOpacity: 0.3,
            onFinish: () => {
              if (callbackCalled === false) {
                callback()
                callbackCalled = true
              }
            },
          })
        })

        cards.to({
          duration: 0.45,
          easing: Konva.Easings.ElasticEaseOut,
          scaleX: 1,
          scaleY: 1,
        })
      },
    })
  }

  bounceBackDraggingCards = (draggingCards) => {
    const { deckIndex, cardIndex, freeIndex } = this.props.prevDraggingCardsPos

    if (freeIndex >= 0) {
      const targetDropCell = this.stageNode.findOne(`.freecell-${freeIndex}`)
      const targetDropPos = targetDropCell.getClientRect()

      this.animateCardsToPos(
        draggingCards,
        targetDropPos.x + 1,
        targetDropPos.y + 1,
        () => {
          this.setState(() => ({ dragDisabled: false }))
          this.props.moveDraggingCardsToFreeCell(freeIndex)
        }
      )
    } else {
      const endPosCardId = this.props.gameState.puzzle[deckIndex][cardIndex - 1]
      const targetDropCard = endPosCardId
        ? this.stageNode.findOne(`.${endPosCardId.id}`)
        : this.stageNode.findOne(`.empty-cell`)

      const targetDropPos = targetDropCard.getClientRect()
      const dropPosOffsetX = endPosCardId ? CARD_SHADOW_BLUR : 0
      const dropPosOffsetY = endPosCardId
        ? STACKED_CARD_OFFSET_Y + CARD_SHADOW_BLUR
        : 0

      this.animateCardsToPos(
        draggingCards,
        targetDropPos.x + dropPosOffsetX,
        targetDropPos.y + dropPosOffsetY,
        () => {
          this.setState(() => ({ dragDisabled: false }))
          this.props.moveDraggingCardsToPuzzle()
        }
      )
    }
  }

  setStageRef = node => (this.stageNode = node)

  render = () => {
    const { gameState, draggingCards, draggingStartPos } = this.props
    const { dragDisabled } = this.state

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
              <Layer>
                <FreeDeck
                  pos0Card={gameState.free.pos0Card}
                  pos1Card={gameState.free.pos1Card}
                  pos2Card={gameState.free.pos2Card}
                  pos3Card={gameState.free.pos3Card}
                  onDragStart={this.handleFreeDeckDragStart}
                />
                <SolvedDeck
                  spadeSolvedCards={gameState.solved.spadeSolvedCards}
                  heartSolvedCards={gameState.solved.heartSolvedCards}
                  diamondSolvedCards={gameState.solved.diamondSolvedCards}
                  clubSolvedCards={gameState.solved.clubSolvedCards}
                />

                <PuzzleBoard
                  deckOfCards={gameState.puzzle}
                  dragDisabled={dragDisabled}
                  onDragStart={this.handlePuzzleDeckDragStart}
                />
              </Layer>

              {/* Dragging Cards Layer */}
              <Layer
                onDragStart={this.handleDraggingLayerDragStart}
                onDragEnd={this.handleDraggingLayerDragEnd}
              >
                <DraggingDeck
                  cards={draggingCards}
                  dragDisabled={dragDisabled}
                  x={draggingStartPos.x}
                  y={draggingStartPos.y}
                />
              </Layer>
            </ImageDataProvider>
          </Stage>
        )}
      </ImageDataConsumer>
    )
  }
}

export default FreeCellCanvas
