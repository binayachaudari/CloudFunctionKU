const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var ref = functions.database.ref('Updates/{noticeID}');

exports.sendNotification = ref.onUpdate((change, context)=>{
  const after = change.after.val();

  const payload ={
     data: {
       title: after.title,
       category: after.category,
       link: after.link
     }
  }


  admin.messaging().sendToDevice(deviceRegistrationToken,payload)
    .then(function(response){
      console.log("Successfully sent message:", response);
      return null;
    })
    .catch(function(err){
      console.log('Error Sending Notification', err);
    });

    return true;
});
