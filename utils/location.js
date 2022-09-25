// Mapbox API Key
const MAPBOX_API_KEY =
  "pk.eyJ1Ijoic2Nhcnl3aW5nczgzMjg5IiwiYSI6ImNrYTJoZGd4ZzBhaDQzZW9nc2kza2hqdmkifQ.z85-KC5zGK9PtxTj77mkKw";

export const getMapPreview = (long, lat) => {
  const imagePreview = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+d21e1e(${long},${lat})/${long},${lat},14,0/400x200?access_token=${MAPBOX_API_KEY}`;
  return imagePreview;
};

export const getAddress = async (long, lat) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${MAPBOX_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data?.features[0]?.place_name;
  return address;
};
