const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=0a834c7944220e594a2a3b4b512d2a2e`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.message !== 0) {
      
      callback(
        "Unable to find the desired location . Please Try another search",
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.list[0].weather[0].description}  It is currently ${body.list[0].main.temp} degree out . There is ${body.list[1].clouds.all}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
