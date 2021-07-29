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
      let data = JSON.parse(body).ip;
      calllback(null, data);
    }
  });
};

//❕was having errors running index.js. need to wrap imported variable in {}❕

const fetchCoordsbyIP = (ip, calllback) => {
  request("https://freegeoip.app/json/", (error, response, body) => {
    if (error) {
      calllback(error, null);
    } else {
      let dataobj = {};
      let data = JSON.parse(body);
      dataobj["latitude"] = data.latitude;
      dataobj["longitude"] = data.longitude;
      calllback(null, dataobj);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsbyIP };
