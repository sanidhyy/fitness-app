export const EXERCISE_DB_URL = "https://exercisedb.p.rapidapi.com";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY ?? "";

export const exerciseOptions: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": rapidApiKey,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions: RequestInit = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": rapidApiKey,
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
  },
};

export const exerciseListUrl = (path = "/exercises") => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const encodedPath = normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${EXERCISE_DB_URL}${encodedPath}?limit=0`;
};

export const getExerciseGifUrl = (id?: string, resolution = 180) => {
  if (!id) return "";

  const params = new URLSearchParams({
    exerciseId: id,
    resolution: String(resolution),
    "rapidapi-key": rapidApiKey,
  });

  return `${EXERCISE_DB_URL}/image?${params.toString()}`;
};

export const fetchData = async <T,>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, options);
    const data: unknown = await response.json();

    if (!response.ok) {
      return (Array.isArray(data) ? [] : {}) as T;
    }

    return data as T;
  } catch {
    return {} as T;
  }
};
