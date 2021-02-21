import { get } from "./helper";

export async function fetchProducts(page = 1, limit = 20, sort = "price") {
  return new Promise((resolve) => {
    try {
      get("products", `_page=${page}&_limit=${limit}&_sort=${sort}`).then(
        (rawResponse) => {
          resolve(rawResponse);
        }
      );
    } catch (error) {
      console.log(error);
      resolve([]);
    }
  });
}

export async function fetchAds(number) {
  try {
    const rawResponse = await get("ads", `r=${number}`);
    const response = await rawResponse.text();
    return response;
  } catch (error) {
    return "sfwfwf";
  }
}
