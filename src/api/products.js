import { get } from "./helper";

export async function fetchProducts(page = 10, limit = 0) {
  try {
    const rawResponse = await get(
      "api/products",
      `_page=${page}&_limit=${limit}`
    );
    const response = await rawResponse.json();
    console.log(response);
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
