class Freecell {
  static isSolvable(topCardId, droppedCardId) {
    const [topCardCategory, topCardNumber] = this.getCardCategoryAndNumber(topCardId)
    const [droppedCategory, droppedCardNumber] = this.getCardCategoryAndNumber(droppedCardId)

    if (
      topCardCategory !== droppedCategory ||
      (topCardNumber + 1) !== droppedCardNumber
    ) {
      return false
    }

    return true
  }

  static isStackable(leafCardId, emptyDeckNum, emptyFreeCellNum, droppedCardId, droppedCardsNum) {
    const afterEmptyDeckNum = leafCardId === "empty-cell" ? emptyDeckNum - 1 : emptyDeckNum
    const enabledDraggingCardNum = 1 + emptyFreeCellNum + afterEmptyDeckNum * 2
    if (droppedCardsNum > enabledDraggingCardNum) {
      return false
    }

    if (leafCardId === "empty-cell") {
      return true
    }

    const [leafCardColor, leafCardNumber] = this.getCardColorAndNumber(leafCardId)
    const [droppedCardColor, droppedCardNumber] = this.getCardColorAndNumber(droppedCardId)

    return (
      (leafCardColor !== droppedCardColor) &&
      (leafCardNumber === droppedCardNumber + 1)
    )
  }

  static isCardInStackDraggable(cards, cardInIndex) {
    if (cards.length === 0) {
      return false
    }

    const stackLength = cards.length
    if (stackLength === cardInIndex + 1) {
      return true
    } 
    
    return cards.slice(cardInIndex).every((cardId, i, self) => {
      if (self.length === i + 1) {
        return true
      }

      const [cardColor, cardNumber] = this.getCardColorAndNumber(cardId)
      const [nextCardColor, nextCardNumber] = this.getCardColorAndNumber(self[i + 1])

      return (
        (cardColor !== nextCardColor) &&
        (cardNumber === nextCardNumber + 1)
      )
    })
  }

  static getCardPosInPuzzleDeck(cardIdsOfDecks, cardId) {
    for (let i = 0; i < cardIdsOfDecks.length; i++) {
      for (let j = 0; j < cardIdsOfDecks[i].length; j++) {
        if (cardIdsOfDecks[i][j] === cardId) {
          return [i, j]
        }
      }
    }

    throw Error("Card not find in puzzle!")
  }

  static getCardCategoryAndNumber(cardId) {
    const [ category, number ] = cardId.split("_")
    return [ category, this.getCardNumber(number) ]
  }

  static getCardColorAndNumber(cardId) {
    const [category, number] = cardId.split("_")
    return [this.getCardColor(category), this.getCardNumber(number)]
  }

  static getCardNumber(numString) {
    switch(numString) {
      case "k":
        return 13
      case "q":
        return 12
      case "j":
        return 11
      case "a":
        return 1
      default:
        return parseInt(numString)
    }
  }

  static getCardColor(category) {
    switch(category) {
      case "club":
      case "spade":
        return "black"
      case "heart":
      case "diamond":
        return "red"
      default:
        throw Error("Unknown card category!")
    }
  }
}

export default Freecell
