function calculateTimeUserBids(date1, date2) {

    if ((date2 - date1) <= 0) {
        return "Auction ended"
    }

    const diffMs = Math.abs(date2 - date1);
    var diffDays = Math.floor(diffMs / 86400000);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
    var diffSec = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000)

    if (diffDays == 0) {
        if (diffHrs == 0) {
            if (diffMins == 0) {
                return diffSec + "sec"
            }
            return diffMins + "min"
        }
        return diffHrs + "h"
    }
    if (diffDays < 7) {
        return diffDays + " days, " + diffHrs + "h"
    }
    var diffWeeks = Math.floor(diffDays / 7)
    return diffWeeks + " weeks"
};
export default calculateTimeUserBids;