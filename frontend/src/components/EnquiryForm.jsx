import React, { useState } from "react";
import axios from "axios";
import "../styles/EnquiryForm.css";

const EnquiryForm = ({ productId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("https://product-showcase-j6i0.onrender.com/api/enquiries", {
        product_id: productId,
        name,
        email,
        phone,
        message,
      });

      if (res.data.success) {
        setSuccess("Enquiry submitted successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setError("Failed to submit enquiry");
      }
    } catch (err) {
      setError("Error submitting enquiry");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-modal">
      <div className="enquiry-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Enquire About Product</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
