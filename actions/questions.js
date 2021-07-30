import { generateUID } from "../utils/helpers"
import { saveDeckTitle, addCardToDeck } from "../utils/api"
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SAVE_DECK = 'SAVE_DECK'
export const SAVE_QUESTION = 'SAVE_QUESTION'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function saveDeck(id, timestamp, title) {
    return {
        type: SAVE_DECK,
        id,
        timestamp,
        title
    }
}

function saveQuestion(id, question) {
    return {
        type: SAVE_QUESTION,
        id,
        question
    }
}

export function handleSaveDeck(title) {
    return async (dispatch) => {
        const id = generateUID()
        const timestamp = Date.now()
        dispatch(saveDeck(id,timestamp,title))
        await saveDeckTitle(id,timestamp,title)
    }
}

export function handleSaveQuestion(id,question) {
    return async (dispatch) => {
        dispatch(saveQuestion(id,question))
        await addCardToDeck(id,question)
    }
}