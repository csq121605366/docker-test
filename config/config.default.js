'use strict';

exports.keys = 'my secret keys';

exports.mongoose = {
  client: {
    // url: "mongodb://insurance_admin:csqcsq1214@47.52.63.21:27017/insurance",
    url: "mongodb://root:mypassword1234@127.0.0.1:27017/insurance",
    options: {
      useMongoClient: true,
      autoReconnect: true,
      socketTimeoutMS: 0,
      keepAlive: true,
      reconnectTries: 30
    }
  }
};
