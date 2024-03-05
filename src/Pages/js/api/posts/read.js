import { apiPath } from "../constants.js";
import { headers } from "../headers.js";

export async function getPosts(limit = 20, offset = 0) {
  const response = await fetch(`${apiPath}/auction/listings?limit=${limit}&offset=${offset}&_seller=true&_bids=true`, { headers: headers() });
  if (response.ok) {
    return await response.json()
  }

  throw new Error(response.statusText);
}

export async function getPost(id) {
  const response = await fetch(`${apiPath}/auction/listings/${id}?_seller=true`, { headers: headers() });
  if (response.ok) {
    return await response.json()
  }

  throw new Error(response.statusText);
}

