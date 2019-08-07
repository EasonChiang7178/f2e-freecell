import styled from "styled-components"
import COLORS from "../constants/COLORS"

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.GREY};
  transition: visibility 0s linear, opacity .15s ease;

  ${props => props.isHided ? ({
    opacity: 0,
    visibility: "hidden",
    transition: "opacity .6s ease, visibility 0s linear .6s"
  }) : null}
`

export const Title = styled.h1`
  margin: 0;
  font-size: 50px;
  line-height: 1.38;
  text-align: left;
  color: ${COLORS.BLACK};
`
