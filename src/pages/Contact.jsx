import React from 'react';
import ContactForm from '../components/ContactForm';
import MRIDisplay from '../components/MRIDisplay';

const Contact = () => (
  <div className="pt-20 px-20 items-center justify-center">
    <div className="flex">
      <ContactForm />
      <MRIDisplay />
    </div>
  </div>
);

export default Contact;