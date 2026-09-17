const API_BASE = "/api";

export const exerciseUrl = (path: string, params: Record<string, string> = {}) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const search = new URLSearchParams({ path: normalized, ...params });

  return `${API_BASE}/exercises?${search.toString()}`;
};

export const exerciseListUrl = (path = "/exercises") =>
  exerciseUrl(path, { limit: "0" });

export const youtubeSearchUrl = (query: string) => {
  const search = new URLSearchParams({ query });

  return `${API_BASE}/youtube?${search.toString()}`;
};

export const getExerciseGifUrl = (id?: string, resolution = 180) => {
  if (!id) return "";

  const params = new URLSearchParams({
    id,
    resolution: String(resolution),
  });

  return `${API_BASE}/exercise-image?${params.toString()}`;
};

export const fetchData = async <T,>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    const data: unknown = await response.json();

    if (!response.ok) {
      return (Array.isArray(data) ? [] : {}) as T;
    }

    return data as T;
  } catch {
    return {} as T;
  }
};
