import React from "react"
import PropTypes from "prop-types"
import StackedDeck from "./StackedDeck";

class DraggingDeck extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.array,
    x: PropTypes.number,
    y: PropTypes.number,
    dragDisabled: PropTypes.bool
  }

  static defaultProps = {
    cards: [],
    x: 0,
    y: 0,
    dragDisabled: false
  }

  componentDidUpdate = (oldProps) => {
    if (oldProps.cards.length === 0 && this.props.cards.length !== 0 && this.props.dragDisabled === false) {
      this.draggingNode.startDrag()
    }
  }

  setDraggingDeckRef = (node) => {
    this.draggingNode = node
  }

  render = () => {
    const { cards, x, y } = this.props

    return cards.length !== 0 && (
      <StackedDeck cards={cards} x={x} y={y} dragDisabled={true} setRef={this.setDraggingDeckRef} />
    )
  }
}

export default DraggingDeck