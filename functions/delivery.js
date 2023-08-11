const { httpsCallFunction, queryDb, saveDbChange } = require("./query");

exports.galleryQuery = httpsCallFunction((data, context) => {
    
    if (!context.auth) return {status: "error", code: 401, message: "Not signed in"};

    const uid = context.auth ? context.auth.uid : null;

    const galleryList = {};
    const userList = {};

    return queryDb("gallery")
    .then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                galleryList[key] = value;
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
            galleryList: galleryList,
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

exports.submitGallery = httpsCallFunction(async (data, context) => {
    
    const uid = context.auth ? context.auth.uid : null;

    if (!context.auth) return {status: "error", code: 401, message: "Not signed in"};

    const galleryItem = data.galleryItem;

    if (galleryItem && galleryItem.uid === uid) {
        saveDbChange("/gallery/" + galleryItem.id, galleryItem);

        return {
            success: true,
            update: galleryItem
        };
    } else {
        return {
            success: false
        };
    }
});
