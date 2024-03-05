import { apiPath } from "../constants.js";
import { headers } from "../headers.js";

export async function createPost(title, description, tags, media, endsAt) {
  const endsAtISOString = endsAt.toISOString(); 
  const response = await fetch(`${apiPath}/auction/listings/`, {
    method: "POST",
    body: JSON.stringify({ title, description, tags, media, endsAt: endsAtISOString }),
    headers: headers("application/json"),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(`Error: ${response.status} - ${await response.text()}`);
}
