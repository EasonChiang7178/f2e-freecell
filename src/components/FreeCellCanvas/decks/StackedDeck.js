import React from "react"
import PropTypes from "prop-types"
import { Group } from 'react-konva/lib/ReactKonvaCore'

import Card from "../cells/Card"

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

  isDraggable = (i) => {
    return i === this.props.cards.length - 1
  }

  renderCards = () => this.props.cards.map((card, i) => (
    <Card id={card.id} key={card.id} x={0} y={32 * i} draggable={this.isDraggable(i)} />
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
