import React from "react"
import FreeCellCanvas from "./FreeCellCanvas"

class FreeCellBoard extends React.PureComponent {
  state = {
    gameState: [
      [{ id: 'heart_k' }, { id: 'club_2' }, { id: 'diamond_10' }, { id: 'heart_3' }, { id: 'heart_6' }, { id: 'spade_a' }, { id: 'spade_10' }],
      [{ id: 'diamond_2' }, { id: 'spade_7' }, { id: 'diamond_6' }, { id: 'spade_5' }, { id: 'club_10' }, { id: 'diamond_k' }, { id: 'heart_8' }],
      [{ id: 'spade_9' }, { id: 'heart_4' }, { id: 'club_q' }, { id: 'spade_4' }, { id: 'club_7' }, { id: 'spade_2' }, { id: 'club_9' }],
      [{ id: 'heart_a' }, { id: 'spade_8' }, { id: 'diamond_4' }, { id: 'heart_j' }, { id: 'heart_q' }, { id: 'diamond_9' }, { id: 'spade_q' }],
      [{ id: 'club_8' }, { id: 'diamond_q' }, { id: 'heart_9' }, { id: 'club_k' }, { id: 'spade_k' }, { id: 'diamond_a' }],
      [{ id: 'heart_10' }, { id: 'club_a' }, { id: 'diamond_7' }, { id: 'heart_2' }, { id: 'club_j' }, { id: 'spade_6' }],
      [{ id: 'club_6' }, { id: 'diamond_3' }, { id: 'heart_5' }, { id: 'diamond_j' }, { id: 'diamond_5' }, { id: 'heart_7' }],
      [{ id: 'spade_3' }, { id: 'diamond_8' }, { id: 'club_5' }, { id: 'club_3' }, { id: 'spade_j' }, { id: 'club_4' }],
    ],
    history: [],
    draggingStartPos: { x: 0, y: 0 },
    draggingCards: [],
    prevDraggingCardsPos: { deckIndex: 0, cardIndex: 0 }
  }

  moveCardsToDrag = (deckIndex, cardIndex, startPos) => {
    const { gameState } = this.state

    const updatedDeckCards = gameState[deckIndex].slice(0, cardIndex)
    const toDraggingCards = gameState[deckIndex].slice(cardIndex)

    this.setState(state => ({
      gameState: [
        ...state.gameState.slice(0, deckIndex),
        updatedDeckCards,
        ...state.gameState.slice(deckIndex + 1)
      ],
      draggingCards: toDraggingCards,
      draggingStartPos: startPos,
      prevDraggingCardsPos: { deckIndex, cardIndex }
    }))
  }

  moveDraggingCardsToPuzzle = (deckIndex) => {
    const { gameState, draggingCards, prevDraggingCardsPos } = this.state
    const targetDeckIndex = deckIndex || prevDraggingCardsPos.deckIndex

    const updatedDeckCards = gameState[targetDeckIndex].concat(draggingCards)

    this.setState(state => ({
      gameState: [
        ...state.gameState.slice(0, targetDeckIndex),
        updatedDeckCards,
        ...state.gameState.slice(targetDeckIndex + 1)
      ]
    }))

    setTimeout(() => this.setState(({
      draggingCards: [],
      draggingStartPos: { x: 0, y: 0 },
      prevDraggingCardsPos: { deckIndex: 0, cardIndex: 0 }
    })), 50)
  }

  render = () => {
    const { gameState, draggingStartPos, draggingCards, prevDraggingCardsPos } = this.state
    
    return (
      <FreeCellCanvas
        gameState={gameState}
        draggingStartPos={draggingStartPos}
        draggingCards={draggingCards}
        prevDraggingCardsPos={prevDraggingCardsPos}
        moveCardsToDrag={this.moveCardsToDrag}
        moveDraggingCardsToPuzzle={this.moveDraggingCardsToPuzzle}
      />
    )
  }
}

export default FreeCellBoard
