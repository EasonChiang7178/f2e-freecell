import React from "react"
import Image from "./Image"

class Card extends React.PureComponent {
  render = () => {
    const { base64, width, height, src, srcSet } = this.props.imageData.childImageSharp.fixed
    
    return (
      <Image
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
