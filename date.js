

exports.getDate = function () {
    const today = new Date();
    
    let options = {
        weekday:'long',
        day:'numeric',
        month:'long',
    };
    
    let day = today.toLocaleDateString('en-US', options)
    return day;
}

exports.getDay = function () {
    const today = new Date();

    let options = {
        weekday:'long',
    };

    let weekday = today.toLocaleDateString('en-US', options)
    return weekday;
}
