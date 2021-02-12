const BASE_URL = "http://http://localhost:3000/";

export async function get(endpoint, params) {
  try {
    const rawResponse = await fetch(`${BASE_URL}/${endpoint}?${params}`);
    return rawResponse;
  } catch (error) {
    console.log(error);
    return false;
  }
}
