import { useState } from 'react';
import { faqs } from '../data/menuData';
import '../styles/faq.css';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="heading">
        <h1 className="head">
          Frequently Asked <span className="sp">Questions</span>
        </h1>
        <p className="para">Feel free to have any queries.</p>
      </div>
      <div className="questions">
        {faqs.map((faq, index) => (
          <div key={index} className="card-container">
            <div className="heading-button-container">
              <h1>{faq.heading}</h1>
              <div className="button-container">
                <div className="toggle" onClick={() => toggle(index)}>
                  <div className="toggle-icon">{openIndex === index ? '-' : '+'}</div>
                </div>
              </div>
            </div>
            <div className="pgg">
              <p style={{ display: openIndex === index ? 'block' : 'none' }}>
                {faq.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}