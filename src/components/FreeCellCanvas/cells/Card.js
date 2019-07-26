import React from "react"
import PropTypes from "prop-types"

import ImageDataConsumer from "../../../contexts/ImageDataContext"
import Image from "../Image"

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
    const { x, y, draggable } = this.props
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
        draggable={draggable}
      />
    )
  }
}

export default (props) => (
  <ImageDataConsumer>
    {(imageData) => <Card imageData={imageData[props.id]} {...props} />}
  </ImageDataConsumer>
)
