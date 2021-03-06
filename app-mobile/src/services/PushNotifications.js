import Constants from 'expo-constants'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import {Platform} from 'react-native';

export default{
    async registerForPushNotifications() {
        const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = status
        if(status !=='granted'){
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            finalStatus = status
        }
    
        if(finalStatus!=='granted'){
            return;
        }
        let token = await Notifications.getExpoPushTokenAsync()
        let uid = Constants.deviceId;
        firebase.database().ref("users").child(uid).update({
            expoPushToken: token
        })
        
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('projeto-antiassedio', {
              name: 'Projeto Antiassedio',
              importance: Notifications.AndroidImportance.MAX,
              vibrationPattern: [0, 250, 250, 250],
            });
        }
    
    
    }
}