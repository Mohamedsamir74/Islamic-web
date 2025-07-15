// src/components/PrayerTimeCard.jsx
import "./prayertimecard.css"; // لو عايز استايل خاص

export default function PrayerTimeCard({ name, time }) {
  return (
    <div className="prayer-card">
      <h3 className="prayer-name">{name}</h3>
      <p className="prayer-time">{time}</p>
    </div>
  );
}
