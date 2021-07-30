import { receiveDecks } from "./questions"
import { getDecks } from "../utils/api"

export function handleInitialData() {
    return async (dispatch) => {
        const response = await getDecks()
        console.log(response)
        dispatch(receiveDecks(response))
    }
}