const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e97b1fccb1d8615cf7726d19141a4745&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        forecast: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
      });
    }
  });
};

module.exports = forecast;
