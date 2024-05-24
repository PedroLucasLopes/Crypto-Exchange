import axios from "axios";

const cache = {};

const cacheDuration = 15 * 60 * 1000;

const instance = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 1000,
  headers: {
    x_cg_api_key: "CG-DfyS63LUJe4oubdRqX8hv87K",
    "Content-Type": "application/json",
  },
  withCredentials: false,
  xsrfHeaderName: null,
});

function getFromCache(url) {
  const cached = cache[url];
  if (cached) {
    const isExpired = Date.now() - cached.timestamp > cacheDuration;
    if (!isExpired) {
      return cached.data;
    } else {
      delete cache[url];
    }
  }
  return null;
}


function saveToCache(url, data) {
  cache[url] = {
    data: data,
    timestamp: Date.now(),
  };
}

async function getWithCache(url) {
  const cachedData = getFromCache(url);
  if (cachedData) {
    return cachedData;
  }

  const response = await instance.get(url);
  saveToCache(url, response.data);
  return response.data;
}

export { instance, getWithCache };
