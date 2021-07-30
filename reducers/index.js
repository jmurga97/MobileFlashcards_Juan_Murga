import { RECEIVE_DECKS, SAVE_DECK, SAVE_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
    switch(action.type){
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case SAVE_DECK:
            return{
                ...state,
                [action.id]:{
                    id: action.id,
                    title: action.title,
                    timestamp: action.timestamp,
                    questions: []
                }
            }
        case SAVE_QUESTION:
            return{
                ...state,
                [action.id]: {
                    ...state[action.id],
                    questions: state[action.id].questions.concat(action.question) //[...state[action.id].questions, action.question]
                }
            }
        default:
            return state
    }
}