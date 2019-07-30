import React from "react"
import PropTypes from "prop-types"
import { Group } from 'react-konva/lib/ReactKonvaCore'

import EmptyWaterMarkCell from "../cells/EmptyWaterMarkCell"
import Card from "../cells/Card"

class SolvedDeck extends React.PureComponent {
  static propTypes = {
    spadeSolvedCards: PropTypes.array,
    heartSolvedCards: PropTypes.array,
    diamondSolvedCards: PropTypes.array,
    clubSolvedCards: PropTypes.array
  }

  static defaultProps = {
    spadeSolvedCards: [],
    heartSolvedCards: [],
    diamondSolvedCards: [],
    clubSolvedCards: []
  }

  renderSolvedSpadeDeck = () => this.renderDeck(0, "spade")
  renderSolvedHeartDeck = () => this.renderDeck(1, "heart")
  renderSolvedDiamondDeck = () => this.renderDeck(2, "diamond")
  renderSolvedClubDeck = () => this.renderDeck(3, "club")

  renderDeck = (i, category) => {
    const solvedCards = this.props[`${category}SolvedCards`]
    const topCard = solvedCards.length > 0 ? solvedCards[solvedCards.length - 1] : null
    
    return (
      <Group x={(100 + 16) * i} y={0}>
        <EmptyWaterMarkCell category={category} />
        {topCard && <Card key={topCard.id} id={topCard.id} />}
      </Group>
    )
  }

  render = () => {
    return (
      <Group x={687} y={51} name="solved-deck">
        {this.renderSolvedSpadeDeck()}
        {this.renderSolvedHeartDeck()}
        {this.renderSolvedDiamondDeck()}
        {this.renderSolvedClubDeck()}
      </Group>
    )
  }
}

export default SolvedDeck
