import React from "react"
import PropTypes from "prop-types"
import { Group } from 'react-konva/lib/ReactKonvaCore'

import StackedDeck from "./decks/StackedDeck"

class PuzzleBoard extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    deckOfCards: PropTypes.array,
    dragDisabled: PropTypes.bool
  }

  static defaultProps = {
    x: 179,
    y: 234,
    deckOfCards: [],
    dragDisabled: false
  }

  renderStackedDecks = () => this.props.deckOfCards.map((cards, i) => (
    <StackedDeck key={i} cards={cards} x={(100 + 16) * i} y={0} dragDisabled={this.props.dragDisabled} />
  ))

  render = () => {
    const { x, y } = this.props

    return (
      <Group x={x} y={y} name="puzzle-board">
        {this.renderStackedDecks()}
      </Group>
    )
  }
}

export default PuzzleBoard
