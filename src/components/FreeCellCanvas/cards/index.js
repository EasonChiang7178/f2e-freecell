import React from "react"
import PropTypes from "prop-types"

import Image from "./Image"

class Card extends React.PureComponent {
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
  }

  static defaultProps = {
    x: 0,
    y: 0
  }

  render = () => {
    const { x, y } = this.props
    const { base64, width, height, src, srcSet } = this.props.imageData.childImageSharp.fixed
    
    return (
      <Image
        x={x}
        y={y}
        base64={base64}
        width={width / 2} // [NOTE] hotfix, for retina resolution support
        height={height / 2}
        src={src}
        srcSet={srcSet}
      />
    )
  }
}
export default Card
