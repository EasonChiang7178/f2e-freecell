import React from "react"
import PropTypes from "prop-types"

import { Rect } from 'react-konva/lib/ReactKonvaCore'
import "konva/lib/shapes/Rect"

import COLORS from "../../../constants/COLORS"


class EmptyCell extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
  }

  static defaultProps = {
    x: 0,
    y: 0
  }

  render = () => (
    <Rect
      x={this.props.x}
      y={this.props.y}
      width={100}
      height={150}
      cornerRadius={5}
      fill="transparent"
      stroke={COLORS.BLACK}
      strokeWidth={1}
      opacity={0.2}
    />
  )
}

export default EmptyCell
