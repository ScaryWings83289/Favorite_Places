const MAPBOX_API_KEY =
  "pk.eyJ1Ijoic2Nhcnl3aW5nczgzMjg5IiwiYSI6ImNrYTJoZGd4ZzBhaDQzZW9nc2kza2hqdmkifQ.z85-KC5zGK9PtxTj77mkKw";

export const getMapPreview = (long, lat) => {
  const imagePreview = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+d21e1e(${long},${lat})/${long},${lat},14,0/400x200?access_token=${MAPBOX_API_KEY}`;
  return imagePreview;
};
