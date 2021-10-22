import React, { Component } from 'react'
import {View, Text, AsyncStorage } from 'react-native'
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'FlashCards: notifications'

export const getCardsLength = (questions) => {
    if(questions.length === 0) {
        return <Text>0 cards</Text>
    }
    else if(questions.length > 1) {
        return <Text>{questions.length} cards</Text>
    }
    else {
        return <Text> 1 card</Text>
    }
}
 export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
 function createNotification() {
     return {
         title: 'Log your status!',
         body: "DONT FORGET TO STUDY TODAY!",
         ios: {
            sound: true,
          },
          android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
          }
     }
 }
 export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({status}) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
            
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(
              createNotification(), 
              {
                time: tomorrow,
                repeat: 'day',
              }
            )
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
 }
