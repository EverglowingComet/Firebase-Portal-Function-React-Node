export const DAY_TIME = 24 * 3600 * 1000;
export const MONTH_TIME = 31 * DAY_TIME;

export const toDateString = (timestamp) => {
    if (timestamp != null) {
        let date = new Date(timestamp);
        return date.toLocaleDateString();
    }
    return "Invalid Date";
}

export const toTimeString = (timestamp) => {
    if (timestamp != null) {
        let date = new Date(timestamp);
        return date.toLocaleTimeString();
    }
    return "Invalid Time";
}

export const timeAgo = (prevDate) => {
    const diff = new Date().valueOf() - prevDate;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
    switch (true) {
        case diff < minute:
            const seconds = Math.round(diff / 1000);
             return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} ago`
        case diff < hour:
            return Math.round(diff / minute) + ' minutes ago';
        case diff < day:
            return Math.round(diff / hour) + ' hours ago';
        case diff < month:
            return Math.round(diff / day) + ' days ago';
        case diff < year:
            return Math.round(diff / month) + ' months ago';
        case diff > year:
            return Math.round(diff / year) + ' years ago';
        default:
            return "";
    }
};

export const toSimpleTime = (timestamp) => {
    if (timestamp != null) {
        let date = new Date(timestamp);
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
    return "Invalid Time";
}

export const toDateTimeString = (timestamp) => {
    if (timestamp == null) {
        return 'Invalid';
    }
    return toDateString(timestamp) + " " + toTimeString(timestamp);
}

export const toSimpleDateTimeString = (timestamp) => {
    if (timestamp == null) {
        return 'Invalid';
    }
    return toDateString(timestamp) + " " + toSimpleTime(timestamp);
}

export const getPlaybackUrl = (playbackId) => {
    if (playbackId == null) {
        return null;
    }
    return "https://stream.mux.com/" + playbackId + ".m3u8";
}

export const getWeekStartDayTime = (timestamp, firstDayOfWeekIndex = 0) => {
    let dateObject = new Date(timestamp);
    const dayOfWeek = dateObject.getDay(),
        firstDayOfWeek = new Date(dateObject),
        diff = dayOfWeek >= firstDayOfWeekIndex ?
            dayOfWeek - firstDayOfWeekIndex :
            6 - dayOfWeek

    firstDayOfWeek.setDate(dateObject.getDate() - diff)
    firstDayOfWeek.setHours(0,0,0,0);

    let result = firstDayOfWeek.valueOf();

    return result;
    
}

export const getWeekStartDay = (timestamp, firstDayOfWeekIndex = 0) => {
    let dateObject = new Date(timestamp);
    const dayOfWeek = dateObject.getDay(),
        firstDayOfWeek = new Date(dateObject),
        diff = dayOfWeek >= firstDayOfWeekIndex ?
            dayOfWeek - firstDayOfWeekIndex :
            6 - dayOfWeek

    firstDayOfWeek.setDate(dateObject.getDate() - diff)
    //firstDayOfWeek.setHours(0,0,0,0);

    return firstDayOfWeek.valueOf();
    
}

export const copyHour = (timestamp, toCopy) => {
    let dateObject = new Date(timestamp);
    let copyObject = new Date(toCopy);
    
    let offset = dateObject.getTimezoneOffset();
    let copyOffset = copyObject.getTimezoneOffset();

    return timestamp + (offset - copyOffset) * 60000;
    
}

export const getDayStart = (timestamp) => {
    let dateObject = new Date(timestamp);
    dateObject.setHours(0,0,0,0);

    return dateObject.valueOf();
}

export const sortByTitle = (array) => {
    array.sort(function(a, b) {
        if (a.title === b.title) 
            return 0;

        return a.title < b.title ? -1 : 1;
    });
}

export const sortByNumber = (array, field) => {
    array.sort(function(a, b) {
        let t1 = a[field] ? a[field] : 0;            
        let t2 = b[field] ? b[field] : 0;

        return t1 - t2;
    })
}

export const removeFromArr = (array, item) => {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}

export const removeArrIdx = (array, index) => {
    if (index > -1) {
        array.splice(index, 1);
    }
}

export const getSortedArray = (array)=> {
    const toCopy = [];
    if (array != null) {
        for (var i = 0; i < array.length; i ++) {
            toCopy.push(array[i]);
        }
    }
    toCopy.sort(function(a, b) {return a - b});
    return toCopy;
}

export const checkYoutubeUrl = (url) => {
    if (url == null) {
        return false
    }
    if (url.startsWith('https://www.youtube.com/')) {
        return true
    }
    if (url.startsWith('https://www.youtu.be')) {
        return true
    }
    if (url.startsWith('https://youtube.com/')) {
        return true
    }
    if (url.startsWith('https://youtu.be')) {
        return true
    }
    return false
}

export const getTitle = () => {
    const domain = window.location.origin;
    let title = "Live Teams";

    if (domain.includes("live-edb25-org-test") || domain.includes("ligasietecanada.com")) {
        title = "Liga Siete Canada";
    }

    if (domain.includes("live-edb25-eagles-fc") || domain.includes("eaglesfc.ca")) {
        title = "Eagles F.C.";
    }
    if (domain.includes("live-edb25-ivy") || domain.includes("ivyfc.ca")) {
        title = "IVY LEAGUES";
    }
    
    return title;
}

export const sortByUsername = (array) => {
    array.sort((a, b) => {
        if (a.username === b.username) 
            return 0;

        return a.username < b.username ? -1 : 1;
    });
}

export const formatByDecimalFloating = (value, i) => {
    const dimension = 10 ^ i;
    return parseInt(value * dimension) / dimension;
}
