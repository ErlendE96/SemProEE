import { apiPath as apiPathConstant } from "../constants.js";
import { headers } from "../headers.js";

export async function register(name, email, password, bio, avatar, banner) {
  const requestBody = {
    name,
    email,
    password,
    bio,
    avatar: avatar && avatar.url ? avatar : undefined,
    banner: banner && banner.url ? banner : undefined,
  };

  const response = await fetch(`${apiPathConstant}auth/register`, {
    method: "post",
    body: JSON.stringify(requestBody),
    headers: headers("application/json"),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(`Registration Failed. Response Status: ${response.status} Body: ${await response.text()}`);
}



