import { useState, useEffect } from 'react';

const GDPR_CONSENT_KEY = 'gdprConsent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(GDPR_CONSENT_KEY);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(GDPR_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(GDPR_CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="cookie-consent"
      className="cookie-consent-banner cookie-consent-banner--visible"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and privacy preferences"
    >
      <div className="cookie-consent-text">
        We use cookies and local storage for essential features like login and cart.
        See our <a href="/privacy">Privacy Policy</a> for details.
      </div>
      <div className="cookie-consent-actions">
        <button id="cookie-accept" type="button" onClick={handleAccept}>Accept</button>
        <button id="cookie-reject" type="button" onClick={handleReject}>Reject non-essential</button>
      </div>
    </div>
  );
}