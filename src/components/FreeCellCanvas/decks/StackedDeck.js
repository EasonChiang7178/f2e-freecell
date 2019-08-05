import React from "react"
import PropTypes from "prop-types"
import { Group, Rect } from 'react-konva/lib/ReactKonvaCore'
import "konva/lib/shapes/Rect"

import Card from "../cells/Card"
import Freecell from "../../../utils/freecell"

import { STACKED_CARD_OFFSET_Y } from "../../../constants/LAYOUTS"

class StackedDeck extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    cards: PropTypes.array,
    dragDisabled: PropTypes.bool,
    setRef: PropTypes.func
  }

  static defaultProps = {
    x: 0,
    y: 0,
    dragDisabled: false,
    cards: []
  }

  isCardDraggable = (i) => {
    const { dragDisabled, cards } = this.props
    return !dragDisabled && Freecell.isCardInStackDraggable(cards, i)
  }

  renderCards = () => {
    const { cards } = this.props
    
    return cards.length > 0 ? cards.map((card, i) => (
      <Card id={card.id} key={card.id} x={0} y={STACKED_CARD_OFFSET_Y * i} draggable={this.isCardDraggable(i)} />
    )) : (
      <Rect name="empty-cell" width={100} height={150} cornerRadius={5} fill="transparent" stroke="transparent" strokeWidth={0} />
    )
  }

  render = () => {
    const { x, y, setRef } = this.props
    
    return (
      <Group x={x} y={y} {...(setRef && { ref: setRef })}>
        {this.renderCards()}
      </Group>
    )
  }
}

export default StackedDeck
