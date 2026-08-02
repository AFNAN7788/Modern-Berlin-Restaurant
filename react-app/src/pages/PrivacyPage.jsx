import '../styles/global.css';

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <h1>Privacy & Data Protection</h1>
      <p>
        At Modern Berlin Restaurant, we respect your privacy and handle your data in
        accordance with applicable data protection laws, including GDPR where
        relevant.
      </p>

      <h2>What data we collect</h2>
      <ul>
        <li>Basic account details such as your name and email address.</li>
        <li>Authentication details needed to keep you logged in.</li>
        <li>
          Order-related information such as items added to your cart and
          purchase details.
        </li>
      </ul>

      <h2>How we use your data</h2>
      <p>We process your data to:</p>
      <ul>
        <li>Create and manage your account and log you in securely.</li>
        <li>Process and deliver your food orders.</li>
        <li>Provide customer support and respond to your requests.</li>
      </ul>

      <h2>Cookies and local storage</h2>
      <p>
        We use cookies and browser storage (such as localStorage) only for
        essential purposes, for example:
      </p>
      <ul>
        <li>Remembering that you are logged in.</li>
        <li>Storing temporary information needed for your cart and orders.</li>
        <li>Remembering your consent choice from the cookie banner.</li>
      </ul>

      <h2>Your rights</h2>
      <p>Subject to applicable law, you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction or deletion of your personal data.</li>
        <li>Object to or restrict certain types of processing.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        To exercise your rights or ask questions about this policy, please
        contact us using the email or phone number listed on the website.
      </p>
    </main>
  );
}