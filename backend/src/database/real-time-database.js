const firebase = require('firebase')
const turf = require('@turf/turf')
const Notification = require('../services/notification')
class RealTimeDatabase{
    static async saveOccurrence(location){
        firebase.database().ref("harrassementOccurrences").child(location.timestamp).update({
            location: location,
            reportedAt: new Date()
        })
    }
    
}
module.exports = RealTimeDatabase