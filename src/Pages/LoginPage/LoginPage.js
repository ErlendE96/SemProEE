import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { load, save, remove } from '../js/storage/index.js';

const apiPath = "https://v2.api.noroff.dev";
const loginEndpoint = `${apiPath}/auth/login`;
const createApiKeyEndpoint = `${apiPath}/auth/create-api-key`;

const headers = (contentType, apiKey) => {
  const token = load("accessToken");
  const baseHeaders = {
    "Content-Type": contentType,
  };

  if (token) {
    return {
      ...baseHeaders,
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    };
  }

  return baseHeaders;
};

export const auth = {
  login: async (email, password) => {
    try {
      const response = await fetch(loginEndpoint, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: headers("application/json", ""), // No API Key at login
      });

      if (response.ok) {
        const profile = await response.json();
        save("accessToken", profile.data.accessToken);
        delete profile.data.accessToken;
        save("user", profile.data);

        console.log('Login successful. Profile:', profile.data);

        // Create API Key after successful login
        await createApiKey(profile.data);

        return profile.data;
      } else {
        throw {
          status: response.status,
          message: response.statusText,
        };
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      throw new Error(`Login failed: ${error.message}`);
    }
  },

  isLoggedIn: () => Boolean(load("accessToken")),

  getProfile: () => load("user"), // Added getProfile method

  logout: () => {
    remove('user');
    remove('accessToken');
    console.log('Logout successful.');
  },
};

const createApiKey = async (profileData) => {
  try {
    const accessToken = load("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found. Logging out...");
    }

    const response = await fetch(createApiKeyEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: profileData?.name || "Default API Key Name", // Use a default name if profileData.name is undefined
      }),
    });

    if (response.ok) {
      const apiKeyData = await response.json();
      console.log('API Key created successfully:', apiKeyData.data);
      return apiKeyData.data; // Return the created API key
    } else {
      const errorDetails = await response.json();
      console.error('Error creating API Key:', response.statusText);
      console.error('Error details:', errorDetails);
      throw new Error(errorDetails?.errors[0]?.message || 'Unknown error');
    }
  } catch (error) {
    console.error('Error creating API Key:', error.message);
    throw new Error(`Error creating API Key: ${error.message}`);
  }
};

const LoginListener = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loggedInUser = auth.getProfile();
    if (loggedInUser) {
      navigate(`./?view=profile&name=${loggedInUser.name}`);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAccessToken = () => {
    return load("accessToken");
  };
  
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const user = await auth.login(formData.email, formData.password);
      console.log('AccessToken after login:', load('accessToken'));
      navigate(`./?view=profile&name=${user.name}`);
    } catch (error) {
      console.error('Login failed:', error.message);
      const errorMessage = error.status === 401
        ? 'Invalid username or password'
        : 'An error occurred during login';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    auth.logout();
    navigate('./');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            required
            type="email"
            className="form-control"
            id="loginEmail"
            name="email"
            pattern="[\w\-.]+@(stud.)?noroff.no$"
            title="Only Noroff student or teacher emails are valid."
            placeholder="name@example.com"
            onChange={handleChange}
          />
          <label htmlFor="loginEmail">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            required
            type="password"
            minLength="8"
            className="form-control"
            id="loginPassword"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <label htmlFor="loginPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};
export { LoginListener, createApiKey }; // Export createApiKey function
