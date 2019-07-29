import React from "react"
import PropTypes from "prop-types"

import { Image } from 'react-konva/lib/ReactKonvaCore'
import "konva/lib/shapes/Image"

class CanvasImage extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    base64: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    src: PropTypes.string,
    srcSet: PropTypes.string,
    draggable: PropTypes.bool.isRequired
  }

  static defaultProps = {
    x: 0,
    y: 0,
    draggable: false
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
    this.image.srcSet = this.props.srcSet // [NOTE] not working, maybe canvas image not support srcSet?
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

  render = () => {
    const { name, x, y, width, height, draggable } = this.props

    return (
      <Image
        name={name}
        x={x}
        y={y}
        width={width}
        height={height}
        image={this.state.image}
        draggable={draggable}
        ref={node => {
          this.imageNode = node
        }}
        {...(draggable && {
          onMouseOver: this.handleMoveOver,
          onMouseOut: this.handleMoveOut,
          onDragStart: () => {}, // [NOTE] handle the drag events by event delegation in State component
          onDragEnd: () => {}
        })}
      />
    )
  }
}

export default CanvasImage
