import React, { useState } from "react";
import { toast } from "react-toastify";
import "../../CSS/home/about.css"; // Verify the path is correct

const backend = process.env.REACT_APP_BACKEND_URL;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.id]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.message) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return; // Exit if validation fails

    setIsSubmitting(true); // Show loading indicator
    setFormErrors({}); // Clear previous errors

    try {
      const response = await fetch(`${backend}/admin/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form
      } else {
        console.error("Error submitting form:", response.statusText);
        toast.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false); // Hide loading indicator
    }
  };

  return (
    <div className="bg-light p-5 Contact-Con">
      <div className="text-center text-center1 mb-4">
        <h2>Contact Us</h2>
        <p>
          If you have any questions, feedback, or inquiries, please don’t
          hesitate to get in touch with us. Our dedicated team is here to assist
          you.
        </p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            aria-describedby="name-error" // For accessibility
          />
          {formErrors.name && (
            <small id="name-error" className="text-danger">
              {formErrors.name}
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="email-error" // For accessibility
          />
          {formErrors.email && (
            <small id="email-error" className="text-danger">
              {formErrors.email}
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            aria-describedby="phone-error" // For accessibility
          />
          {formErrors.phone && (
            <small id="phone-error" className="text-danger">
              {formErrors.phone}
            </small>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control"
            id="message"
            rows="4"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            aria-describedby="message-error" // For accessibility
          ></textarea>
          {formErrors.message && (
            <small id="message-error" className="text-danger">
              {formErrors.message}
            </small>
          )}
        </div>
        {formErrors.general && (
          <div className="alert alert-danger mt-2">{formErrors.general}</div>
        )}
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
