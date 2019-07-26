import React from 'react'
import { Stage, Layer } from 'react-konva'
import Card from './cards'

class FreeCellCanvas extends React.PureComponent {

  getCanvasWidth = () => window.innerWidth

  getCanvasHeight = () => window.innerHeight

  renderCards = () => {
    const cardImageData = this.props.cardImageData

    return Object.keys(cardImageData).map((cardId) => (
      <Card key={cardId} imageData={cardImageData[cardId]} />
    ))
  }

  render = () => (
    <Stage width={this.getCanvasWidth()} height={this.getCanvasHeight()}>
      <Layer>
        {this.renderCards()}
      </Layer>
    </Stage>
  )
}

export default FreeCellCanvas
