
function calculateTimeLeft(date1, date2) {
    const diffMs = Math.abs(date2 - date1);
    var diffDays = Math.floor(diffMs / 86400000);
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
    var diffSec = Math.round((((diffMs % 86400000) % 3600000) % 60000) / 1000)

    if (diffDays == 0) {
        if (diffHrs == 0) {
            return diffMins + " minutes, " + diffSec + " second"
        }
        return diffHrs + " hours, " + diffMins + " minutes"
    }

    return diffDays + " days, " + diffHrs + " hours"
};
export default calculateTimeLeft;