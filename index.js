const { fetchMyIP, fetchCoordsbyIP, fetchISSFlyOverTimes } = require("./iss");

const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, flyoverTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(flyoverTimes);
});

//confirmed fetchMyIP functionality
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Sorry, that didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsbyIP("174.93.95.202", (error, data) => {
//   if (error) console.log(error);
//   else console.log(data);
// });

// let ip = fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Sorry that did not work!", error);
//     return;
//   }
//   return ip;
// });

// fetchCoordsbyIP("174.93.95.202", (error, coordinates) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log("Returned coordinates: ", coordinates);
// });

// fetchISSFlyOverTimes(
//   { latitude: 42.3239, longitude: -82.9048 },
//   (error, flyoverTimes) => {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     console.log("Returned flyover times:", flyoverTimes);
//   }
// );
