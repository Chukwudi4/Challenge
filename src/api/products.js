import { get } from "./helper";

export async function fetchProducts(page = 1, limit = 20) {
  try {
    console.log(page);
    const rawResponse = await get("products", `_page=${1}&_limit=${limit}`);
    const response = await rawResponse.json();
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
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
