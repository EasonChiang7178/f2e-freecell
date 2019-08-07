import React from "react"
import PropTypes from "prop-types"

import { Container } from "./FreeCellBoard.css"
import FreeCellCanvas from "./FreeCellCanvas"
import GameControls from "./GameControls"
import LoadingOverlay from "./LoadingOverlay"

class FreeCellBoard extends React.PureComponent {
  static propTypes = {
    boardData: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)

    const boardIndex = this.getRandomBoardDataIndex()
    this.state = {
      gameState: {
        puzzle: props.boardData[boardIndex],
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
      curBoardIndex: boardIndex,
      history: [],
      draggingStartPos: { x: 0, y: 0 },
      draggingCards: [],
      prevDraggingCardsPos: { deckIndex: -1, cardIndex: -1, freeIndex: -1 },
      isLoadingStopped: false
    }
  }

  handleNewGameClick = () => {
    let newBoardIndex = this.state.curBoardIndex
    do {
      newBoardIndex = this.getRandomBoardDataIndex()
    } while (newBoardIndex === this.state.curBoardIndex)

    this.setState(() => ({ isLoadingStopped: false }))

    setTimeout(() => {
      this.setState(() => ({
        gameState: {
          puzzle: this.props.boardData[newBoardIndex],
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
        curBoardIndex: newBoardIndex
      }))
    }, 150)
  }

  handleGameRestartClick = () => {
    this.setState(() => ({ isLoadingStopped: false }))

    setTimeout(() => {
      this.setState(state => ({
        gameState: {
          puzzle: this.props.boardData[state.curBoardIndex],
          free: {
            pos0Card: null, pos1Card: null, pos2Card: null, pos3Card: null
          },
          solved: {
            spadeSolvedCards: [],
            heartSolvedCards: [],
            diamondSolvedCards: [],
            clubSolvedCards: []
          }
        }
      })
    )}, 150)
  }

  handleLoadingCompleted = () => this.setState(() => ({ isLoadingStopped: true }))

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

  getRandomBoardDataIndex = () => {
    const { boardData } = this.props
    return Math.floor((Math.random() * 10) % boardData.length)
  }

  render = () => {
    const { gameState, draggingStartPos, draggingCards, prevDraggingCardsPos, isLoadingStopped } = this.state
    
    return (
      <Container>
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
        <GameControls
          onNewGameClick={this.handleNewGameClick}
          onGameRestartClick={this.handleGameRestartClick}
        />
        <LoadingOverlay isStopped={isLoadingStopped} onCompleted={this.handleLoadingCompleted} />
      </Container>
    )
  }
}

export default FreeCellBoard
