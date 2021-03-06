import * as firebase from 'firebase'
import * as Location from 'expo-location';
import Constants from 'expo-constants'

export default{
    async registerForGeoLocation(){
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            return
          }        
    },
    watchPosition(){
        Location.watchPositionAsync({},(location)=>{
            this.saveLocation(location)
        })
    },
    saveLocation(location){
        let uid = Constants.deviceId;
        firebase.database().ref("users").child(uid).update({
            location: location
        })
    },
    async getLocation(){
        return await Location.getLastKnownPositionAsync({'accuracy': Location.Accuracy.Highest})
    }
}