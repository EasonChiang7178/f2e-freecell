import React from "react"
import PropTypes from "prop-types"
import { Group } from 'react-konva/lib/ReactKonvaCore'

import Card from "../cells/Card"
import Freecell from "../../../utils/freecell"

class StackedDeck extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    cards: PropTypes.array
  }

  static defaultProps = {
    x: 0,
    y: 0,
    cards: []
  }

  isCardDraggable = (i) => {
    return Freecell.isCardInStackDraggable(this.props.cards, i)
  }

  renderCards = () => this.props.cards.map((card, i) => (
    <Card id={card.id} key={card.id} x={0} y={32 * i} draggable={this.isCardDraggable(i)} />
  ))

  render = () => {
    const { x, y } = this.props

    return (
      <Group x={x} y={y}>
        {this.renderCards()}
      </Group>
    )
  }
}

export default StackedDeck
