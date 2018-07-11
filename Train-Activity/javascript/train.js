// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD7uL6vHEqcZx5pMaB56jSpTTCfw1npwlI",
    authDomain: "denver-1017.firebaseapp.com",
    databaseURL: "https://denver-1017.firebaseio.com",
    projectId: "denver-1017",
    storageBucket: "denver-1017.appspot.com",
    messagingSenderId: "645020670587"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var currentTime = moment();

    // THE MATH!
    //subtracts the first train time back a year to ensure it's before current time.
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    // the time difference between current time and the first train
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % rate;
    var minUntilTrain = rate - remainder;
    var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");


$('#addTrainBtn').on("click", function (clicker) {

    var trainName = $('#nameImput').val("");
    var destination = $('#destinationInput').val("");
    var firstTrain = $('#firstInput').val("");
    var frequency = $('#frequencyInput').val("");

    database.ref().push({

            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            min: minUntilTrain,
            next: nextTrain,

    });
});

database.ref().on("child_added", function (snapshot) {
    // clicker();
    var sv = snapshot.val();
    var name = sv.name;
    var destination = sv.destination;
    var firstTrain = sv.firstTrain;
    var min = sv.min;
    var next = sv.next;

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");



})