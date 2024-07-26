import React from "react";
import "../../CSS/home/about.css"; // Verify the path is correct

const ContactPage = () => {
  return (
  
      <div className="bg-light p-5 Contact-Con ">
        <div className="text-center text-center1  mb-4">
          <h2>Contact Us</h2>
          <p>
            If you have any questions, feedback, or inquiries, please don’t
            hesitate to get in touch with us. Our dedicated team is here to
            assist you.
          </p>
        </div>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
  
  );
};

export default ContactPage;
