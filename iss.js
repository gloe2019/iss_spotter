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

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, callback) => {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
        callback(Error(msg), null);
        return;
      } else {
        let data = JSON.parse(body).response;
        callback(null, data);
      }
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsbyIP, fetchISSFlyOverTimes };
