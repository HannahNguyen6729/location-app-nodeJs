const axios = require("axios");
//const asyncRequest = require("async-request");
const accessToken =
  "pk.eyJ1IjoiYmludmExMiIsImEiOiJja3JlcDJiYTM1cDBiMm5sM2tzcTl1MHphIn0.6pFT1xPzTTf_UqVNHDZzVw";

const mapboxGl = require("mapbox-gl");
const getLocation = async (location) => {
  //method 1: use axios
  const response = await axios({
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${accessToken}`,
      method: 'get'
  })
  const data = response.data.features[0]
  console.log('type of data ', typeof data)
  console.log('data ', data)

  const map = {
    coordinates: data.geometry.coordinates,
    place_name:  data.place_name,
    text:  data.text
  };
  return map;
  
  //method 2: use asyncRequest
  // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${accessToken}`;
  // const response = await asyncRequest(url);
  // const data = JSON.parse(response.body);
  // const map = {
  //   geometry: data.features[0].geometry.coordinates,
  //   place_name:  data.features[0].place_name,
  //   text:  data.features[0].text
  // };
  //return map;
};

module.exports = { getLocation };
