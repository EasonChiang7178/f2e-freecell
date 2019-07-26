import React from "react"

const defaultContextValue = {}

const { Provider, Consumer } = React.createContext(defaultContextValue)

class ImageDataProvider extends React.PureComponent {
  render = () => (
    <Provider value={this.props.imageData}>
      {this.props.children}
    </Provider>
  )
}

export { Consumer as default, ImageDataProvider }
