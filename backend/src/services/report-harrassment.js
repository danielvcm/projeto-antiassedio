const Notification = require('./notification')
const RealTimeDatabase = require('../database/real-time-database')
class ReportHarassment{
    static async report(location){
        RealTimeDatabase.saveOccurrence(location)
        Notification.notifyNearByUsers(location)
    }
}
module.exports = ReportHarassment