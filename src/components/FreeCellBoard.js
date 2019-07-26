import React from "react"
import FreeCellCanvas from "./FreeCellCanvas"

class FreeCellBoard extends React.PureComponent {
  render = () => {
    const { cardImageData } = this.props

    return (
      <FreeCellCanvas
        cardImageData={cardImageData}
      />
    )
  }
}

export default FreeCellBoard