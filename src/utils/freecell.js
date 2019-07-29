class Freecell {
  static isCardInStackDraggable(cards, cardInIndex) {
    if (cards.length === 0) {
      return false
    }

    const stackLength = cards.length
    if (stackLength === cardInIndex + 1) {
      return true
    } 
    
    return cards.slice(cardInIndex).every((card, i, self) => {
      if (self.length === i + 1) {
        return true
      }

      const [cardColor, cardNumber] = this.getCardColorAndNumber(card.id)
      const [nextCardColor, nextCardNumber] = this.getCardColorAndNumber(self[i + 1].id)

      return (
        (cardColor !== nextCardColor) &&
        (cardNumber === nextCardNumber + 1)
      )
    })
  }

  static getCardPosInPuzzleDeck(cardsOfDecks, cardId) {
    for (let i = 0; i < cardsOfDecks.length; i++) {
      for (let j = 0; j < cardsOfDecks[i].length; j++) {
        if (cardsOfDecks[i][j].id === cardId) {
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
