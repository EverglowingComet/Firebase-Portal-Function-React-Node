const admin = require("firebase-admin");

admin.initializeApp();

exports.delivery = require("./delivery");
