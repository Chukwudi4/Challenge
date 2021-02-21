export const BASE_URL = "http://192.168.0.156:3000/";

export async function get(endpoint, params) {
  return new Promise((resolve) => {
    try {
      const URL = `${BASE_URL}${endpoint}?${params}`;
      fetch(URL).then(async (rawResponse) => {
        const res = await rawResponse.json();
        resolve(res);
      });
    } catch (error) {
      console.log(error);
      resolve(false);
    }
  });
}
