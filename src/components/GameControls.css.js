import styled from "styled-components"
import COLORS from "../constants/COLORS"

export const Wrapper = styled.div`
  position: absolute;
  bottom: 32px;
  right: 32px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
`

export const Button = styled.button`
  border: none;
  padding: 0;
  font-size: 18px;
  line-height: 1.39;
  color: ${COLORS.BLACK};
  background: transparent;
  opacity: 0.5;
  transition: opacity .15s ease;
  cursor: pointer;

  &:hover, &:active {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

  & + & {
    margin-top: 16px;
  }
`
