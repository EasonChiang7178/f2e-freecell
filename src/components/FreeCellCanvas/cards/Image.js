import React from "react"
import PropTypes from "prop-types"

import { Image } from 'react-konva'

class CanvasImage extends React.PureComponent {
  static propTypes = {
    base64: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string,
    srcSet: PropTypes.string,
    draggable: PropTypes.bool.isRequired
  }

  static defaultProps = {
    draggable: true
  }

  state = {
    image: this.loadPlaceholder()
  }

  componentDidMount() {
    this.loadImage()
  }

  componentDidUpdate(oldProps) {
    if (
      oldProps.src !== this.props.src &&
      oldProps.srcSet !== this.props.srcSet
    ) {
      this.loadImage()

      if (this.props.base64) {
        this.setState(() => ({
          placeholder: this.loadPlaceholder()
        }))
      }
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad)
  }

  loadPlaceholder() {
    if (!this.props.base64) {
      return null
    }

    const placeholder = new window.Image()
    placeholder.src = this.props.base64
    return placeholder
  }

  loadImage() {
    this.image = new window.Image()
    this.image.src = this.props.src
    this.image.srcSet = this.props.srcSet
    this.image.addEventListener('load', this.handleLoad)
  }

  handleLoad = () => {
    this.setState({
      image: this.image
    })
  }

  handleMoveOver = () => {
    document.body.style.cursor = 'pointer'
  }

  handleMoveOut = () => {
    document.body.style.cursor = 'default'
  }

  render = () => (
    <Image
      x={this.props.x}
      y={this.props.y}
      width={this.props.width}
      height={this.props.height}
      image={this.state.image}
      draggable={this.props.draggable}
      ref={node => {
        this.imageNode = node
      }}
      onMouseOver={this.handleMoveOver}
      onMouseOut={this.handleMoveOut}
    />
  )
}

export default CanvasImage
