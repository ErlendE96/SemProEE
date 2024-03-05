import { profile } from "../auth/state.js";
import { apiPath } from "../constants.js";
import { headers } from "../headers.js";

export async function updatePost(newImageUrl) {
  const user = profile();

  try {
    const response = await fetch(`${apiPath}/auction/profiles/${user.name}/media`, {
      method: "PUT",
      headers: headers("application/json"),
      body: JSON.stringify({ avatar: newImageUrl }),
    });

    if (response.ok) {
      const updatedUser = await response.json();

   
      if (updatedUser && updatedUser.avatar) {
        user.avatar = updatedUser.avatar;
      }

      return updatedUser;
    } else {
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }
  } catch (error) {
    console.error("Error updating profile image:", error);
    throw error;
  }
}
