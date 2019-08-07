import React, { useState } from "react"
import PropTypes from "prop-types"
import Lottie from "react-lottie"

import { Wrapper, Title } from "./LoadingOverlay.css"

import loadingAnimation from "../lottie/loading.json"

const LoadingOverlay = ({ isStopped, onCompleted }) => {
  const lottieOption = {
    loop: 1,
    autoplay: true,
    animationData: loadingAnimation,
  }

  const lottieEvents = [{
    eventName: "complete",
    callback: () => onCompleted()
  }]

  return (
    <Wrapper isHided={isStopped}>
      <Title>Free Cell</Title>
      <Lottie
        options={lottieOption}
        isStopped={isStopped}
        width={360}
        height={160}
        eventListeners={lottieEvents}
      />
    </Wrapper>
  )
}

LoadingOverlay.propTypes = {
  isStopped: PropTypes.bool,
  onCompleted: PropTypes.func
}
LoadingOverlay.defaultProps = {
  isStopped: false,
  onCompleted: () => {}
}

export default LoadingOverlay
