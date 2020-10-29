const axios = require('axios');
const firebase = require('firebase');
const turf = require('@turf/turf');
class Notification{
    static async notifyNearByUsers(location){
        const reportedLatitude = location.coords.latitude
        const reportedLongitude = location.coords.longitude
        const harressmentSpot = turf.point([reportedLatitude,reportedLongitude])
        
        firebase.database().ref("users").on('value', function(snapshot) {
            snapshot.forEach(async function calculateProximity(userData) {
                if(userData.toJSON().location){
                    const userLatitude = userData.toJSON().location[0].coords.latitude
                    const userLongitude = userData.toJSON().location[0].coords.longitude
                    const userSpot = turf.point([userLatitude,userLongitude])
                    var distance = turf.distance(harressmentSpot, userSpot);
                    if (distance <= 0.006){
                        let response = await Notification.sendAlert(userData.toJSON().expoPushToken.data)
                        if(response.status !== 'ok'){
                            console.log(new Date())
                            console.log(response)
                        }
                    }
                }
            })
          });   
    }
    static async sendAlert(expoPushToken){
        const response = await axios.post('https://exp.host/--/api/v2/push/send',{
            to: expoPushToken,
            sound: 'default',
            title: 'Alerta de Assédio!',
            body: 'Um assédio acabou de ser denunciado no seu ônibus'})
        return response.data.data
    }
}

module.exports = Notification