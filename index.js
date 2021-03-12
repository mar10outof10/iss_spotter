const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = passTimes => {
  for (const pass of passTimes) {
    const datetime = new Date();
    datetime.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${datetime} for ${pass.duration} seconds.`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("Error occurred: ", error);
    return;
  }
  
  printPassTimes(passTimes);
});