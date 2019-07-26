import React from "react"
import PropTypes from "prop-types"
import { Group } from 'react-konva/lib/ReactKonvaCore'

import EmptyCell from './EmptyCell'
import Image from '../Image'

class EmptyWaterMarkCell extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    waterMarkData: PropTypes.object
  }

  static defaultProps = {
    x: 0,
    y: 0
  }

  render = () => {
    const { base64, width, height, src, srcSet } = this.props.waterMarkData.childImageSharp.fixed

    return (
      <Group x={this.props.x} y={this.props.y}>
        <EmptyCell />
        <Image
          x={20}
          y={45}
          base64={base64}
          width={width / 2} // [NOTE] hotfix, for retina resolution support
          height={height / 2}
          src={src}
          srcSet={srcSet}
        />
      </Group>
    )
  }
}

export default EmptyWaterMarkCell
