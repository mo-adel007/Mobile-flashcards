export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECKS = 'RECIEVE_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}
export function deleteDeck(id) {
    return {
        type: DELETE_DECK,
        id
    }
}

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}
export function addCard(card) {
    return{
        type: ADD_CARD,
        card
    }
}