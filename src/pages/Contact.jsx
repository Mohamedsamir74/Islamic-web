// pages/Contact.jsx
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="contact-title">تواصل معنا</h2>
      <p className="contact-text">
        يمكنك إرسال أي اقتراح، استفسار، أو ملاحظة بشكل مجهول تمامًا عبر الرابط
        التالي 👇
      </p>
      <a
        href="https://muha74.sarhne.com" // ✅ غيّر الرابط لرابط صراحة الخاص بك
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button"
      >
        أرسل رسالة الآن
      </a>
    </div>
  );
}
