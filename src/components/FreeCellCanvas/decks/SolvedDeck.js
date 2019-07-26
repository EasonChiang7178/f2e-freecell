import React from "react"
import PropTypes from "prop-types"
import { Group } from 'react-konva/lib/ReactKonvaCore'

import EmptyWaterMarkCell from "../cells/EmptyWaterMarkCell"
import Card from "../cells/cards"

class SolvedDeck extends React.PureComponent {
  static propTypes = {
    spadeSolvedCards: PropTypes.array,
    heartSolvedCards: PropTypes.array,
    diamondSolvedCards: PropTypes.array,
    clubSolvedCards: PropTypes.array,
    imageData: PropTypes.object
  }

  static defaultProps = {
    spadeSolvedCards: [],
    heartSolvedCards: [],
    diamondSolvedCards: [],
    clubSolvedCards: [],
    imageData: {}
  }

  renderSolvedSpadeDeck = () => this.renderDeck(0, "spade")
  renderSolvedHeartDeck = () => this.renderDeck(1, "heart")
  renderSolvedDiamondDeck = () => this.renderDeck(2, "diamond")
  renderSolvedClubDeck = () => this.renderDeck(3, "club")

  renderDeck = (i, category) => {
    const waterMarkData = this.props.imageData[`${category}_watermark`]
    const solvedCards = this.props[`${category}SolvedCards`]
    const topCard = solvedCards.length > 0 ? solvedCards[solvedCards.length - 1] : null

    return (
      <Group x={(100 + 16) * i} y={0}>
        <EmptyWaterMarkCell waterMarkData={waterMarkData} />
        {topCard && <Card key={topCard.id} imageData={topCard.imageData} />}
      </Group>
    )
  }

  render = () => {
    return (
      <Group x={687} y={51}>
        {this.renderSolvedSpadeDeck()}
        {this.renderSolvedHeartDeck()}
        {this.renderSolvedDiamondDeck()}
        {this.renderSolvedClubDeck()}
      </Group>
    )
  }
}

export default SolvedDeck
