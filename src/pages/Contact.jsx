// pages/Contact.jsx
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      {/* Page title */}
      <h2 className="contact-title">تواصل معنا</h2>

      {/* Informative text */}
      <p className="contact-text">
        يمكنك إرسال أي اقتراح، استفسار، أو ملاحظة بشكل مجهول تمامًا عبر الرابط
        التالي 👇
      </p>

      {/* External anonymous feedback link (e.g., Sarhne or similar) */}
      <a
        href="https://muha74.sarhne.com" // ✅ Replace with your own Sarhne link if needed
        target="_blank" // Opens link in new tab
        rel="noopener noreferrer" // Security best practice for external links
        className="contact-button"
      >
        أرسل رسالة الآن
      </a>
    </div>
  );
}
