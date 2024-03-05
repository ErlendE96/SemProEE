import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    body: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const minCharacterLength = 3;

    if (
      formData.fullName.length >= minCharacterLength &&
      formData.subject.length >= minCharacterLength &&
      formData.email &&
      formData.body.length >= minCharacterLength
    ) {
      setSuccessMessage('Form submitted successfully!');
      console.log('Form Data:', formData);
      setFormData({
        fullName: '',
        subject: '',
        email: '',
        body: '',
      });

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } else {
      setErrorMessage(`Please ensure all fields meet the minimum character length of ${minCharacterLength}.`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="label-container">
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="contact-input"
            required
          />
        </label>
      </div>

      <div className="label-container">
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="contact-input"
            required
          />
        </label>
      </div>

      <div className="label-container">
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="contact-input"
            required
          />
        </label>
      </div>

      <div className="label-container">
        <label>
          Body:
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="contact-input"
            required
          ></textarea>
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactPage;
