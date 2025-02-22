import React from 'react';
import { Mail, MessageSquare, User } from 'lucide-react';

const ContactForm = () => (
  <div className="w-full flex items-center justify-center ml-60">
    <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex gap-8">
          {/* Left Section - Contact Form */}
          <div className="flex-1">
            {/* Header */}
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
              <p className="mt-4 text-lg text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {/* Contact Form */}
            <form className="mt-8 space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>Name</span>
                  </div>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-green-500"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail size={18} />
                    <span>Email</span>
                  </div>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span>Message</span>
                  </div>
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    rows={6}
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 inline-flex items-center justify-center rounded-md border border-transparent  px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                >
                  Send message
                </button>
              </div>
            </form>

            {/* Additional Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-2 text-gray-600">
                    psxap13@nottingham.ac.uk
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Office</h3>
                  <p className="mt-2 text-gray-600">
                    University of Nottingham<br />
                    Nottingham, NG7 2EG
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContactForm;