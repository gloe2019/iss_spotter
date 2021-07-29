/**
 * Makes a single API request to retrieve user's IP address
 * Input:
 *   - Callback (pass back error or IP string)
 * Returns:
 *   - Error, if any (nullable - like jsonthecat)
 *   - IP address as a string (null if err). Ex: "162.135.34.188"
 */
const request = require("request");

const fetchMyIP = (callback) => {
  //use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json/", (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      let data = JSON.parse(body).ip;
      callback(null, data);
    }
  });
};

//❕was having errors running index.js. need to wrap imported variable in {}❕

const fetchCoordsbyIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const dataobj = {};
      const data = JSON.parse(body);
      dataobj["latitude"] = data.latitude;
      dataobj["longitude"] = data.longitude;
      callback(null, dataobj);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsbyIP };
