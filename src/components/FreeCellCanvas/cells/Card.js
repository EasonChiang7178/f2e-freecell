import React from "react"
import PropTypes from "prop-types"

import ImageDataConsumer from "../../../contexts/ImageDataContext"
import Image from "../Image"
import { CARD_SHADOW_BLUR } from "../../../constants/LAYOUTS"

class Card extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    draggable: PropTypes.bool
  }

  static defaultProps = {
    x: 0,
    y: 0,
    draggable: false
  }

  render = () => {
    const { id, x, y, draggable } = this.props
    const { base64, width, height, src, srcSet } = this.props.imageData.childImageSharp.fixed
    
    return (
      <Image
        x={x}
        y={y}
        name={id}
        base64={base64}
        width={width / 2} // [NOTE] hotfix, for retina resolution support
        height={height / 2}
        src={src}
        srcSet={srcSet}
        draggable={draggable}
        style={{
          shadowColor: "black",
          shadowOpacity: .3,
          shadowBlur: CARD_SHADOW_BLUR,
          shadowOffsetY: 2
        }}
      />
    )
  }
}

export default (props) => (
  <ImageDataConsumer>
    {(imageData) => <Card imageData={imageData[props.id]} {...props} />}
  </ImageDataConsumer>
)
