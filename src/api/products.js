import { get } from "./helper";

export async function fetchProducts(page = 1, limit = 20, sort = "price") {
  try {
    const rawResponse = await get(
      "products",
      `_page=${page}&_limit=${limit}&_sort=${sort}`
    );
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
