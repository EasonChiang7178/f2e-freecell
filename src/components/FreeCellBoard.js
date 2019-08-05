import React from "react"
import FreeCellCanvas from "./FreeCellCanvas"

class FreeCellBoard extends React.PureComponent {
  state = {
    gameState: {
      puzzle: [
        [{ id: 'heart_k' }, { id: 'club_2' }, { id: 'diamond_10' }, { id: 'heart_3' }, { id: 'heart_6' }, { id: 'spade_a' }, { id: 'spade_10' }],
        [{ id: 'diamond_2' }, { id: 'spade_7' }, { id: 'diamond_6' }, { id: 'spade_5' }, { id: 'club_10' }, { id: 'diamond_k' }, { id: 'heart_8' }],
        [{ id: 'spade_9' }, { id: 'heart_4' }, { id: 'club_q' }, { id: 'spade_4' }, { id: 'club_7' }, { id: 'spade_2' }, { id: 'club_9' }],
        [{ id: 'heart_a' }, { id: 'spade_8' }, { id: 'diamond_4' }, { id: 'heart_j' }, { id: 'heart_q' }, { id: 'diamond_9' }, { id: 'spade_q' }],
        [{ id: 'club_8' }, { id: 'diamond_q' }, { id: 'heart_9' }, { id: 'club_k' }, { id: 'spade_k' }, { id: 'diamond_a' }],
        [{ id: 'heart_10' }, { id: 'club_a' }, { id: 'diamond_7' }, { id: 'heart_2' }, { id: 'club_j' }, { id: 'spade_6' }],
        [{ id: 'club_6' }, { id: 'diamond_3' }, { id: 'heart_5' }, { id: 'diamond_j' }, { id: 'diamond_5' }, { id: 'heart_7' }],
        [{ id: 'spade_3' }, { id: 'diamond_8' }, { id: 'club_5' }, { id: 'club_3' }, { id: 'spade_j' }, { id: 'club_4' }],
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
