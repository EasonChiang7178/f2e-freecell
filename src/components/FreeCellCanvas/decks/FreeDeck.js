import React from "react"
import PropTypes from "prop-types"
import { Group } from 'react-konva/lib/ReactKonvaCore'

import EmptyCell from "../cells/EmptyCell"
import Card from "../cells/Card"

class FreeDeck extends React.PureComponent {
  static propTypes = {
    pos0Card: PropTypes.object,
    pos1Card: PropTypes.object,
    pos2Card: PropTypes.object,
    pos3Card: PropTypes.object
  }

  renderCell = (i) => {
    const card = this.props[`pos${i}Card`]

    return (
      <Group x={(100 + 16) * i} y={0}>
        <EmptyCell />
        {card && <Card key={card.id} imageData={card.imageData} />}
      </Group>
    )
  }

  render = () => {

    return (
      <Group x={139} y={51}>
        {this.renderCell(0)}
        {this.renderCell(1)}
        {this.renderCell(2)}
        {this.renderCell(3)}
      </Group>
    )
  }
}

export default FreeDeck