/**
 * Makes a single API request to retrieve user's IP address
 * Input:
 *   - Callback (pass back error or IP string)
 * Returns:
 *   - Error, if any (nullable - like jsonthecat)
 *   - IP address as a string (null if err). Ex: "162.135.34.188"
 */
const request = require("request");

const fetchMyIP = (calllback) => {
  //use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      calllback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      calllback(Error(msg), null);
      return;
    } else {
      let data = JSON.parse(body);
      calllback(null, data);
    }
  });
};

//❕code check - was having errors running index.js. need to wrap imported variable in {}❕
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Sorry, that didn't work!", error);
//     return;
//   }
//   console.log("it worked! Returned IP:", ip);
// });

module.exports = { fetchMyIP };
