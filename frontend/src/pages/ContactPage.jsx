import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message Sent Successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-green-600">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-4">
            Have questions? We’d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">
              Get In Touch
            </h2>

            <div className="space-y-4 text-gray-600">
              <p><span className="font-semibold text-gray-800">Email:</span> saurabhkumarxmpt@gmail.com</p>
              <p><span className="font-semibold text-gray-800">Phone:</span> +91 9876543210</p>
              <p><span className="font-semibold text-gray-800">Address:</span> Meerut, India</p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Business Hours
              </h3>
              <p className="text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-green-600 mb-6">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-sm px-4 py-2 focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-sm px-4 py-2 focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-sm px-4 py-2 focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-sm px-4 py-2 focus:outline-none focus:border-green-600"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-sm hover:bg-green-700 transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
