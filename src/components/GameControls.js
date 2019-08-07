import React from "react"
import PropTypes from "prop-types"

import { Wrapper, Button } from "./GameControls.css"

const GameControls = ({ onNewGameClick, onGameRestartClick }) => {

  return (
    <Wrapper>
      <Button onClick={onGameRestartClick}>RESTART GAME</Button>
      <Button onClick={onNewGameClick}>NEW GAME</Button>
    </Wrapper>
  )
}

GameControls.propTypes = {
  onNewGameClick: PropTypes.func.isRequired,
  onGameRestartClick: PropTypes.func.isRequired
}

export default GameControls
