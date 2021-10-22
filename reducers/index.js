import {ADD_CARD, ADD_DECK, RECEIVE_DECKS, DELETE_DECK} from '../actions/index'

function deck (state = {}, action) {
    switch (action.type) {
        case ADD_DECK: 
        const newDeck = {
            [action.deck]: {
                title: action.deck,
                questions: []
            }
        }
            return {
                ...state,
                ...newDeck
            }
        case DELETE_DECK:
            return {
                type: action.DELETE_DECK,
                id: id
            }
        case RECEIVE_DECKS: 
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            const {question, answer, deck, correctAnswer} = action.card
            return {
                ...state,
                [deck]: {
                    ...state[deck],
                    questions: [...state[deck].questions, {question, answer, correctAnswer}]
                }
            }
            default:
                return state
    }
}
export default deck