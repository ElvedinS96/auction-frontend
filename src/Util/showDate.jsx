function showDate(utcDate) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Date(utcDate).toLocaleDateString('en-GB', options)
    return date;
};
export default showDate;