/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = callback => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, resp, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (resp.statusCode !== 200) {
      callback(Error(`Status Code ${resp.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const ipAdd = JSON.parse(body).ip;
    callback(null, ipAdd);

  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, resp, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (resp.statusCode !== 200) {
      callback(Error(`Status Code ${resp.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude }); // runs callback on object {latitude, longitude}
  });
};

const issPass = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, resp, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (resp.statusCode !== 200) {
      callback(Error(`Status Code ${resp.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const issPasses = JSON.parse(body).response;
    callback(null, issPasses);
  });
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        return callback(err, null);
      }

      issPass(coords, (err, passes) => {
        if (err) {
          return callback(err, null);
        }

        callback(null, passes);
      });
    });
  });
};

// const dateConvert = unixTime => {
//   const monthArr = ['']
// }


module.exports = { nextISSTimesForMyLocation };