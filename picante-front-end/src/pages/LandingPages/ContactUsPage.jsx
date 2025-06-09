import React, { useState, useEffect } from 'react';
import '../../styles/Contact.css';
import contactImage from '../../assets/cafe-about.jpg';

function ContactPage() {
  return (
    <div className="contact-page">
      <section 
        className="contact-hero" 
        style={{ backgroundImage: `url(${contactImage})` }}
        aria-label="Contact Us Hero Section"
      >
        <div className="contact-overlay">
          <div className="contact-textbox">
            <h1>Get in Touch</h1>
            <p>We’d love to hear from you! Whether it’s feedback, questions, or just a hello — reach out and connect.</p>
          </div>
          <div className="scroll-hint">↓</div>
        </div>
      </section>

      <section className="contact-section section-light">
        <div className="container contact-content">
          <div className="contact-header">
            <h2>Contact Us</h2>
            <span className="contact-subtitle">We’re here to listen and serve</span>
            <hr />
          </div>
          
          <div className="contact-grid">
            <form className="contact-form" aria-label="Contact Form">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your full name" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="your.email@example.com" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>

              <button type="submit">Send Message</button>
            </form>

            <div className="contact-info">
              <h3>Our Location</h3>
              <p>123 Brew Lane<br />Manila, Philippines</p>

              <h3>Phone</h3>
              <p>+63 912 345 6789</p>

              <h3>Email</h3>
              <p>reachus@cafenoir.ph</p>

              <h3>Follow Us</h3>
              <p>
                <a href="#!" aria-label="Facebook">Facebook</a> | 
                <a href="#!" aria-label="Instagram"> Instagram</a> | 
                <a href="#!" aria-label="Twitter"> Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ContactPage;
