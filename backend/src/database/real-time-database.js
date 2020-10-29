const firebase = require('firebase')
class RealTimeDatabase{
    static async saveOccurrence(location){
        firebase.database().ref("harrassementOccurrences").child(location.timestamp).update({
            location: location,
            reportedAt: new Date()
        })
    }
    
}
module.exports = RealTimeDatabase