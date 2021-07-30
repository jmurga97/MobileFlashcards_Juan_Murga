import AsyncStorage from '@react-native-async-storage/async-storage'

export const MOBILE_FLASHCARDS_KEY = 'MobileFlashcardsDecks'

export async function saveDeckTitle(id,timestamp,title){
    try {
        await AsyncStorage.mergeItem(MOBILE_FLASHCARDS_KEY, JSON.stringify({
            [id]: {
                id,
                timestamp,
                title,
                questions: []
            }
        }))

    } catch (e) {
        console.warn(e)
    }
}

export async function getDecks(){
    try{
        const response = await AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
        const data = response !== null ? JSON.parse(response) : null
        return data
    }catch(e){
        console.warn(e)
    }
}

export async function getDeck(id) {
    try {
        const response = await AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
        const data = JSON.parse(response)
        return data[id]
    } catch (e) {
        console.warn(e)
    }
}

export async function addCardToDeck(id,question) {
    const response = await AsyncStorage.getItem(MOBILE_FLASHCARDS_KEY)
    const data = JSON.parse(response)
    await AsyncStorage.setItem(MOBILE_FLASHCARDS_KEY,JSON.stringify({
        ...data,
        [id]:{
            ...data[id],
            questions: [...data[id].questions, question]
        }
    }))
}

export async function clearAll() {
    try {
        await AsyncStorage.clear()
    } catch(e) {
        console.warn(e)
    }
    console.log('Done.')
}

