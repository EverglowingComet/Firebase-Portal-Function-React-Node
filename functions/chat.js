const { error } = require("firebase-functions/logger");
const { httpsCallFunction, queryDb, saveDbChange, queryDbByValue, generateId } = require("./query");

exports.loadMyDialogs = httpsCallFunction((data, context) => {
    
    if (!context.auth) return {status: "error", code: 401, message: "Not signed in"};

    const uid = context.auth ? context.auth.uid : null;

    const dialogList = {};
    const messageList = {};
    const userList = {};
    const dialogIds = [];
    const uids = [];

    return queryDb("dialog")
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                if (value.userIds && Object.values(value.userIds).includes(uid)) {
                    dialogList[key] = value;
                    dialogIds.push(key);
                    for (const userId of Object.values(value.userIds)) {
                        if (!uids.includes(userId)) {
                            uids.push(userId);
                        }
                    }
                }
            }
        }
        
        return queryDb("message");
    })
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                if (dialogIds.includes(value.dialogId)) {
                    messageList[key] = value;
                    if (value.uid && !uids.includes(value.uid)) {
                        uids.push(value.uid);
                    }
                }
            }
        }
        
        
        return queryDb("user");
    })
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                userList[key] = value;
            }
        }
        
        return {
            success: true,
            dialogList: dialogList,
            messageList: messageList,
            userList: userList,
        };
    }).catch((error) => {
        console.log("Club Competition Query Failed.", error);
        return {
            success: false,
            error: error,
        };
    });
});

exports.loadDialog = httpsCallFunction((data, context) => {
    
    if (!context.auth) return {status: "error", code: 401, message: "Not signed in"};

    const uid = context.auth ? context.auth.uid : null;
    const dialogId = data.dialogId;

    let dialog = {};
    const messageList = {};
    const userList = {};
    const uids = [];

    return queryDb("/dialog/" + dialogId)
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                dialog[key] = value;
            }
            for (const userId of Object.values(dialog.userIds)) {
                if (!uids.includes(userId)) {
                    uids.push(userId);
                }
            }
        } else {
            dialog = {
                id: dialogId,
                userIds: {uid: uid},
                createdAt: new Date().valueOf()
            };
        }
        
        return queryDbByValue("message", "dialogId", dialogId);
    })
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                messageList[key] = value;
                if (value.uid && !uids.includes(value.uid)) {
                    uids.push(value.uid);
                }
            }
        }
        
        
        return queryDb("user");
    })
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                if (uids.includes(key)) {
                    userList[key] = value;
                }
            }
        }
        
        return {
            success: true,
            dialog: dialog,
            messageList: messageList,
            userList: userList,
        };
    }).catch((error) => {
        console.log("Club Competition Query Failed.", error);
        return {
            success: false,
            error: error,
        };
    });
});

exports.createDialog = httpsCallFunction(async (data, context) => {
    
    const uid = context.auth ? context.auth.uid : null;

    if (!context.auth) return {status: "error", code: 401, message: "Not signed in"};

    const title = data.title;
    const userIds = data.userIds;
    if (userIds && Object.values(userIds).includes(uid)) {
        const dialog = {
            id: generateId("/dialog"),
            userIds: userIds,
            createdAt: new Date().valueOf()
        };
        if (title) {
            dialog.title = title;
        }
        saveDbChange("/dialog/" + dialog.id, dialog);
    
        return {
            success: true,
            dialog: dialog
        };
    }
    return {
        success: false,
        error: "Not a valid user ids"
    };
});

exports.submitDialogMessage = httpsCallFunction(async (data, context) => {
    
    const uid = context.auth ? context.auth.uid : null;

    if (!context.auth) return {status: "error", code: 401, message: "Not signed in"};

    const dialog = {};
    const dialogId = data.dialogId;
    const messageId = data.messageId;
    const text = data.text;
    const photoUri = data.photoUri;
    const audioUri = data.audioUri;

    return queryDb("/dialog/" + dialogId)
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                dialog[key] = value;
            }
        }
        
        return queryDb("/message/", messageId ? messageId : null);
    })
    .then((snapshot) => {
        const original = snapshot.val();

        const message = {
            dialogId: dialogId,
            text: text,
            uid: uid,
            photoUri: photoUri,
            audioUri: audioUri,
        };
        
        if (original) {
            message.id = messageId;
            message.createdAt = original.createdAt;
            message.editedAt= new Date().valueOf();
        } else {
            message.id = generateId("message");
            message.createdAt = new Date().valueOf();

            dialog.lastMessageId = message.id;
        }
        if (!dialog.messageIds) {
            dialog.messageIds = {};
        }
        dialog.messageIds[messageId] = messageId;

        saveDbChange("/dialog/" + dialog.id, dialog);
        saveDbChange("/message/" + message.id, message);
        
        return {
            success: true,
            dialog: dialog,
            message: message,
        };
    }).catch((error) => {
        console.log("Club Competition Query Failed.", error);
        return {
            success: false,
            error: error,
        };
    });
});

exports.addUserToDialog = httpsCallFunction(async (data, context) => {
    
    const uid = context.auth ? context.auth.uid : null;

    if (!context.auth) return {status: "error", code: 401, message: "Not signed in"};

    const dialog = {};
    const dialogId = data.dialogId;
    const userId = data.userId;
    
    return queryDb("/dialog/" + dialogId)
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                dialog[key] = value;
            }
        }
        if (dialog.userIds && Object.values(dialog.userIds).includes(uid)) {
            dialog.userIds[userId] = userId;
            saveDbChange("/dialog/" + dialog.id, dialog);
            return {
                success: true,
                dialog: dialog,
            };
        }
        
        return {
            success: false,
            error: "No Authentication to edit"
        };
    }).catch((error) => {
        console.log("Club Competition Query Failed.", error);
        return {
            success: false,
            error: error,
        };
    });
});
