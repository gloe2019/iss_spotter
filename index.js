const { fetchMyIP, fetchCoordsbyIP } = require("./iss");
//confirmed fetchMyIP functionality
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Sorry, that didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

fetchCoordsbyIP("174.93.95.202", (error, data) => {
  if (error) console.log(error);
  else console.log(data);
});
