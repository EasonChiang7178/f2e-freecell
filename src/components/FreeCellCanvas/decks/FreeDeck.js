import React from "react"
import PropTypes from "prop-types"
import { Group } from 'react-konva/lib/ReactKonvaCore'

import EmptyCell from "../cells/EmptyCell"
import Card from "../cells/Card"

class FreeDeck extends React.PureComponent {
  static propTypes = {
    pos0Card: PropTypes.string,
    pos1Card: PropTypes.string,
    pos2Card: PropTypes.string,
    pos3Card: PropTypes.string,
    onDragStart: PropTypes.func.isRequired
  }

  renderCell = (i) => {
    const cardId = this.props[`pos${i}Card`]
    
    return (
      <Group x={(100 + 16) * i} y={0} name={`freecell-${i}`}>
        <EmptyCell />
        {cardId && <Card key={cardId} id={cardId} draggable={true} />}
      </Group>
    )
  }

  render = () => {
    return (
      <Group x={139} y={51} name="free-deck" onDragStart={this.props.onDragStart}>
        {this.renderCell(0)}
        {this.renderCell(1)}
        {this.renderCell(2)}
        {this.renderCell(3)}
      </Group>
    )
  }
}

export default FreeDeck