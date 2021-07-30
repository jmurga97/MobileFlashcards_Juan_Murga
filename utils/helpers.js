import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = 'MobileFlashcardsNotifications'

export function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(() => {
            Notifications.cancelAllScheduledNotificationsAsync()
        })
}
export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(async (data) => {
            if(data === null){
                await Notifications.requestPermissionsAsync()
                .then(({status}) => {
                    if(status === 'granted'){
                        Notifications.cancelAllScheduledNotificationsAsync()

                        //Set the date for tomorrow at 6:00 pm
                        let trigger = new Date()
                        trigger.setDate(trigger.getDate() + 1)
                        trigger.setHours(18)
                        trigger.setMinutes(0)

                        Notifications.scheduleNotificationAsync({
                            content: createNotification(),
                            trigger,
                        })

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}
export function createNotification() {
    return {
        title: 'Do your Homework!',
        body:"👋 Don't forget to study today!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}