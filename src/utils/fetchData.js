export const EXERCISE_DB_URL = "https://exercisedb.p.rapidapi.com";

// exercise api options
export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

// youtube api options
export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

// list endpoints default to 10 results unless limit is set (0 = full list)
export const exerciseListUrl = (path = "/exercises") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const encodedPath = normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${EXERCISE_DB_URL}${encodedPath}?limit=0`;
};

export const getExerciseGifUrl = (id, resolution = 180) => {
  if (!id) return "";

  const params = new URLSearchParams({
    exerciseId: id,
    resolution: String(resolution),
    "rapidapi-key": process.env.REACT_APP_RAPID_API_KEY || "",
  });

  return `${EXERCISE_DB_URL}/image?${params.toString()}`;
};

// fetch data from api
export const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return Array.isArray(data) ? [] : {};
    }

    return data;
  } catch {
    return {};
  }
};
