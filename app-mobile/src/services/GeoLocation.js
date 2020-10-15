import * as firebase from 'firebase'
import * as Location from 'expo-location';
import Constants from 'expo-constants'
export default{
    async registerForGeoLocation(){
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
        const location = await Location.getCurrentPositionAsync({});
        let uid = Constants.deviceId;
        firebase.database().ref("users").child(uid).update({
            location: location
        })
    }
}