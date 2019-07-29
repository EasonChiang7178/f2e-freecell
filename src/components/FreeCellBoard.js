import React from "react"
import FreeCellCanvas from "./FreeCellCanvas"

class FreeCellBoard extends React.PureComponent {
  state = {
    gameState: [
      [{ id: 'heart_k' }, { id: 'club_2' }, { id: 'diamond_10' }, { id: 'heart_3' }, { id: 'heart_6' }, { id: 'spade_a' }, { id: 'spade_10' }],
      [{ id: 'diamond_2' }, { id: 'spade_7' }, { id: 'diamond_6' }, { id: 'spade_5' }, { id: 'club_10' }, { id: 'diamond_k' }, { id: 'heart_8' }],
      [{ id: 'spade_9' }, { id: 'heart_4' }, { id: 'club_q' }, { id: 'spade_4' }, { id: 'club_7' }, { id: 'spade_2' }, { id: 'club_9' }],
      [{ id: 'heart_a' }, { id: 'spade_8' }, { id: 'diamond_4' }, { id: 'heart_j' }, { id: 'heart_q' }, { id: 'diamond_9' }, { id: 'spade_q' }],
      [{ id: 'club_8' }, { id: 'diamond_q' }, { id: 'heart_9' }, { id: 'club_k' }, { id: 'spade_k' }, { id: 'diamond_a' }],
      [{ id: 'heart_10' }, { id: 'club_a' }, { id: 'diamond_7' }, { id: 'heart_2' }, { id: 'club_j' }, { id: 'spade_6' }],
      [{ id: 'club_6' }, { id: 'diamond_3' }, { id: 'heart_5' }, { id: 'diamond_j' }, { id: 'diamond_5' }, { id: 'heart_7' }],
      [{ id: 'spade_3' }, { id: 'diamond_8' }, { id: 'club_5' }, { id: 'club_3' }, { id: 'spade_j' }, { id: 'club_4' }],
    ],
    history: [],
    draggingStack: []
  }

  render = () => {
    const { gameState, draggingStack } = this.state
    
    return (
      <FreeCellCanvas
        gameState={gameState}
        draggingStack={draggingStack}
      />
    )
  }
}

export default FreeCellBoard
