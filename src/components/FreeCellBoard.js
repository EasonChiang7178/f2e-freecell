import React from "react"
import FreeCellCanvas from "./FreeCellCanvas"

class FreeCellBoard extends React.PureComponent {
  state = {
    gameState: {
      puzzle: [
        ['heart_k', 'club_2', 'diamond_10', 'heart_3', 'heart_6', 'spade_a', 'spade_10'],
        ['diamond_2', 'spade_7', 'diamond_6', 'spade_5', 'club_10', 'diamond_k', 'heart_8'],
        ['spade_9', 'heart_4', 'club_q', 'spade_4', 'club_7', 'spade_2', 'club_9'],
        ['heart_a', 'spade_8', 'diamond_4', 'heart_j', 'heart_q', 'diamond_9', 'spade_q'],
        ['club_8', 'diamond_q', 'heart_9', 'club_k', 'spade_k', 'diamond_a'],
        ['heart_10', 'club_a', 'diamond_7', 'heart_2', 'club_j', 'spade_6'],
        ['club_6', 'diamond_3', 'heart_5', 'diamond_j', 'diamond_5', 'heart_7'],
        ['spade_3', 'diamond_8', 'club_5', 'club_3', 'spade_j', 'club_4'],
      ],
      free: {
        pos0Card: null, pos1Card: null, pos2Card: null, pos3Card: null
      },
      solved: {
        spadeSolvedCards: [],
        heartSolvedCards: [],
        diamondSolvedCards: [],
        clubSolvedCards: []
      }
    },
    history: [],
    draggingStartPos: { x: 0, y: 0 },
    draggingCards: [],
    prevDraggingCardsPos: { deckIndex: -1, cardIndex: -1, freeIndex: -1 }
  }

  moveCardsToDrag = (deckIndex, cardIndex, startPos) => {
    const { gameState } = this.state

    const updatedDeckCards = gameState.puzzle[deckIndex].slice(0, cardIndex)
    const toDraggingCards = gameState.puzzle[deckIndex].slice(cardIndex)

    this.setState(state => ({
      gameState: {
        ...state.gameState,
        puzzle: [
          ...state.gameState.puzzle.slice(0, deckIndex),
          updatedDeckCards,
          ...state.gameState.puzzle.slice(deckIndex + 1)
        ]
      },
      draggingCards: toDraggingCards,
      draggingStartPos: startPos,
      prevDraggingCardsPos: { ...state.prevDraggingCardsPos, deckIndex, cardIndex }
    }))
  }

  moveFreeCardToDrag = (freeIndex, startPos) => {
    this.setState(state => ({
      gameState: {
        ...state.gameState,
        free: {
          ...state.gameState.free,
          [`pos${freeIndex}Card`]: null,
        },
      },
      draggingCards: [ state.gameState.free[`pos${freeIndex}Card`] ],
      draggingStartPos: startPos,
      prevDraggingCardsPos: { ...state.prevDraggingCardsPos, freeIndex },
    }))
  }

  moveDraggingCardsToPuzzle = (deckIndex) => {
    const { gameState, draggingCards, prevDraggingCardsPos } = this.state
    const targetDeckIndex = typeof deckIndex !== "undefined"
      ? deckIndex
      : prevDraggingCardsPos.deckIndex
    
    const updatedDeckCards = gameState.puzzle[targetDeckIndex].concat(draggingCards)

    this.setState(state => ({
      gameState: {
        ...state.gameState,
        puzzle: [
          ...state.gameState.puzzle.slice(0, targetDeckIndex),
          updatedDeckCards,
          ...state.gameState.puzzle.slice(targetDeckIndex + 1)
        ]
      }
    }))

    setTimeout(() => this.setState(() => ({
      draggingCards: [],
      draggingStartPos: { x: 0, y: 0 },
      prevDraggingCardsPos: { deckIndex: -1, cardIndex: -1, freeIndex: -1 }
    })), 0)
  }

  moveDraggingCardsToFreeCell = (i) => {
    this.setState(state => ({
      gameState: {
        ...state.gameState,
        free: {
          ...state.gameState.free,
          [`pos${i}Card`]: state.draggingCards[0]
        },
      },
    }))

    setTimeout(() => this.setState(() => ({
      draggingCards: [],
      draggingStartPos: { x: 0, y: 0 },
      prevDraggingCardsPos: { deckIndex: -1, cardIndex: -1, freeIndex: -1 },
    })), 0)
  }

  moveDraggingCardsToSolvedDeck = (category) => {
    this.setState(state => ({
      gameState: {
        ...state.gameState,
        solved: {
          ...state.gameState.solved,
          [`${category}SolvedCards`]: state.gameState.solved[
            `${category}SolvedCards`
          ].concat(state.draggingCards),
        },
      },
    }))

    setTimeout(() => this.setState(() => ({
      draggingCards: [],
      draggingStartPos: { x: 0, y: 0 },
      prevDraggingCardsPos: { deckIndex: -1, cardIndex: -1, freeIndex: -1 },
    })), 0)
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
        moveFreeCardToDrag={this.moveFreeCardToDrag}
        moveDraggingCardsToPuzzle={this.moveDraggingCardsToPuzzle}
        moveDraggingCardsToFreeCell={this.moveDraggingCardsToFreeCell}
        moveDraggingCardsToSolvedDeck={this.moveDraggingCardsToSolvedDeck}
      />
    )
  }
}

export default FreeCellBoard
