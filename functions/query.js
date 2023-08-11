const functions = require("firebase-functions");
const admin = require("firebase-admin");

exports.checkUserIds = (userIds, uid, childId) => {
    return userIds !== undefined && (
        (childId !== undefined && Object.values(userIds).includes(childId)) || 
        Object.values(userIds).includes(uid)
    );
};

exports.secureUserIds = (value, userIds) => {
    if (value.playerIds) {
        for (const memberId of Object.values(value.playerIds)) {
            if (!userIds.includes(memberId)) {
                userIds.push(memberId);
            }
        }
    }
    if (value.members) {
        for (const memberId of Object.values(value.members)) {
            if (!userIds.includes(memberId)) {
                userIds.push(memberId);
            }
        }
    }
    if (value.pending) {
        for (const memberId of Object.values(value.pending)) {
            if (!userIds.includes(memberId)) {
                userIds.push(memberId);
            }
        }
    }
    if (value.managers) {
        for (const memberId of Object.values(value.managers)) {
            if (!userIds.includes(memberId)) {
                userIds.push(memberId);
            }
        }
    }
    if (value.managerPending) {
        for (const memberId of Object.values(value.managerPending)) {
            if (!userIds.includes(memberId)) {
                userIds.push(memberId);
            }
        }
    }
    if (value.coachId) {
        if (!userIds.includes(value.coachId)) {
            userIds.push(value.coachId);
        }
    }
    if (value.owner) {
        if (!userIds.includes(value.owner)) {
            userIds.push(value.owner);
        }
    }
};

exports.secureGameUserIds = (game, userIds) => {
    if (game.gameList) {
        for (const uids of Object.values(game.gameList)) {
            for (const uidCheck of Object.values(uids)) {
                if (!userIds.includes(uidCheck)) {
                    userIds.push(uidCheck);
                }
            }
        }
    }
    if (game.benchList) {
        for (const uids of Object.values(game.benchList)) {
            for (const uidCheck of Object.values(uids)) {
                if (!userIds.includes(uidCheck)) {
                    userIds.push(uidCheck);
                }
            }
        }
    }
    if (game.referees) {
        for (const uidCheck of Object.values(game.referees)) {
            if (!userIds.includes(uidCheck)) {
                userIds.push(uidCheck);
            }
        }
    }
    if (game.spectatorList) {
        for (const uidCheck of Object.values(game.spectatorList)) {
            if (!userIds.includes(uidCheck)) {
                userIds.push(uidCheck);
            }
        }
    }
};

exports.checkTeamIds = (value, clubIds) => {
    if (value.teamIds !== undefined) {
        for (const [id,] of Object.entries(value.teamIds)) {
            if (clubIds.includes(id)) {
                return true;
            }
        }
    }
    return false;
};

exports.httpsCallFunction = (callback) => {
    return functions.https.onCall(callback);
};

exports.saveDbChange = (path, value) => {
    return admin.database().ref().child(path).set(value);
};

exports.queryDb = (path) => {
    return admin.database().ref().child(path).once("value");
};

exports.queryDbByValue = (path, attr, value) => {
    return admin.database().ref().child(path).orderByChild(attr).equalTo(value).once("value");
};
