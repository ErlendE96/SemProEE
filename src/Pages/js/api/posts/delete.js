import { apiPath } from "../constants.js";
import { headers } from "../headers.js";

export async function deletePost(postId) {
  try {
    const response = await fetch(`${apiPath}/auction/listings/${postId}`, {
      method: "DELETE",
      headers: headers("application/json"),
    });

    if (response.ok) {
      return;
    } else {
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }
  } catch (error) {
    throw new Error(`Error deleting post: ${error.message}`);
  }
}
