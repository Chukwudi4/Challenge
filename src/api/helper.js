export const BASE_URL = "http://192.168.0.156:3000/";

export async function get(endpoint, params) {
  try {
    const URL = `${BASE_URL}${endpoint}?${params}`;
    const rawResponse = await fetch(URL);
    return rawResponse;
  } catch (error) {
    console.log(error);
    return false;
  }
}
