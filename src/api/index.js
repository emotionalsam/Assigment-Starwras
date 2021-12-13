import axios from "axios";

const api = axios.create({
  baseURL: "https://swapi.dev/api",
});

const getVehicle = (page = 1) =>
  api.get(`/vehicles/?page=${page}`).then((res) => res.data);

const searchPlanetByName = (planet) =>
  api.get(`/planets?search=${planet}`).then((res) => ({
    name: res.data.results[0].name,
    population:
      res.data.results[0].population === "unknown"
        ? 0
        : parseInt(res.data.results[0].population),
  }));

const get = (url) => api.get(url).then((res) => res.data);

export { getVehicle, get, searchPlanetByName };
