import React, { useState, useEffect } from 'react';
import * as authModule from '../LoginPage/LoginPage';
import { load } from '../js/storage/index.js';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const { auth } = authModule;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const loggedInUser = auth.getProfile();

        if (!loggedInUser) {
          setErrorMessage('User not logged in.');
          setLoading(false);
          return;
        }

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setErrorMessage('Access token not found.');
          setLoading(false);
          return;
        }

        const apiKey = load('apiKey');
        if (!apiKey) {
          setErrorMessage('API key not found.');
          setLoading(false);
          return;
        }

        console.log('Access Token:', accessToken);
        console.log('API Key:', apiKey.key);

        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${loggedInUser.name}`, {
          method: 'GET', // Make sure it's a GET request
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'X-Noroff-API-Key': apiKey.key,
          },
        });

        console.log('Response Status:', response.status);
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        if (response.ok) {
          setUserProfile(responseData.data);
        } else {
          setErrorMessage(`Failed to fetch user profile: ${responseData.message}`);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setErrorMessage(`Error fetching user profile: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <p>Bio: {userProfile.bio}</p>
          {/* Add similar lines for other profile properties */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
