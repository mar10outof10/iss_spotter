const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ipAdd) => {
  if (error) {
    console.log("Error occurred: ", error);
    return;
  }
  console.log('It works! Return IP: ', ipAdd);

});

fetchCoordsByIP(' ', (err, data) => {
  console.log(err);
  console.log(data);
});