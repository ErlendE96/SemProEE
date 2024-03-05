import React, { useState } from 'react';
import { register } from '../js/api/auth/register.js';

const RegisterModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    avatar: {
      url: '', // Default value for optional field
      alt: '', // Default value for optional field
    },
    banner: {
      url: '', // Default value for optional field
      alt: '', // Default value for optional field
    },
    venueManager: false, // Added venueManager field with default value
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, update the value based on whether it's checked or not
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleAvatarChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      avatar: value ? { ...prevData.avatar, [name]: value } : prevData.avatar,
    }));
  };

  const handleBannerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      banner: {
        ...prevData.banner,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Filter out empty optional fields
      const filteredFormData = {
        ...formData,
        avatar: Object.keys(formData.avatar).length === 0 ? undefined : formData.avatar,
        banner: Object.keys(formData.banner).length === 0 ? undefined : formData.banner,
      };

      // Call your registration function with filteredFormData
      const response = await register(
        filteredFormData.name,
        filteredFormData.email,
        filteredFormData.password,
        filteredFormData.bio,
        filteredFormData.avatar,
        filteredFormData.banner
      );

      // Log the response to the console
      console.log('Registration response:', response);

      // Handle any further actions, such as closing the modal or redirecting
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('There was a problem creating your account');
    }
  };



  return (
    <div
      className="modal fade"
      id="registerModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <form className="modal-content" id="registerForm" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title" id="registerModalLabel">
              Create Profile
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                className="form-control"
                id="registerName"
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
              <label htmlFor="registerName">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="email"
                className="form-control"
                id="registerEmail"
                name="email"
                placeholder="name@example.com"
                pattern="[\w\-.]+@(stud.)?noroff.no$"
                title="Only Noroff student or teacher emails are valid."
                onChange={handleChange}
              />
              <label htmlFor="registerEmail">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                required
                type="password"
                minLength="8"
                className="form-control"
                id="registerPassword"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <label htmlFor="registerPassword">Password</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                name="bio"
                id="registerBio"
                placeholder="Bio (optional)"
                maxLength="160"
                onChange={handleChange}
              ></textarea>
              <label htmlFor="registerBio">Bio</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                id="registerAvatarUrl"
                name="url"
                placeholder="Avatar URL"
                onChange={handleAvatarChange}
              />
              <label htmlFor="registerAvatarUrl">Avatar URL</label>
            </div>
            {formData.avatar.url && (
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="registerAvatarAlt"
                  name="alt"
                  placeholder="Avatar Alt Text"
                  maxLength="120"
                  onChange={handleAvatarChange}
                />
                <label htmlFor="registerAvatarAlt">Avatar Alt Text</label>
              </div>
            )}
            <div className="form-floating mb-3">
              <input
                type="url"
                className="form-control"
                id="registerBannerUrl"
                name="url"
                placeholder="Banner URL"
                onChange={handleBannerChange}
              />
              <label htmlFor="registerBannerUrl">Banner URL</label>
            </div>
            {formData.banner.url && (
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="registerBannerAlt"
                  name="alt"
                  placeholder="Banner Alt Text"
                  maxLength="120"
                  onChange={handleBannerChange}
                />
                <label htmlFor="registerBannerAlt">Banner Alt Text</label>
              </div>
            )}
          </div>
          <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="registerVenueManager"
          name="venueManager"
          checked={formData.venueManager}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="registerVenueManager">
          Register as a Venue Manager
        </label></div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="submit" className="btn btn-success">
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
