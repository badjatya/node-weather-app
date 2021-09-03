const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYmFkamF0eWEiLCJhIjoiY2tzenk4NGRnMnh1NDJ3b2QzejAxNzlvYyJ9.m3DvRsBldnIG4hLTIVfG8A`;

  request({ url, json: true }, (error, { body }) => {
    // Checking if there is an error
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
