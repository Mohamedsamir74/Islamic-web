import { useEffect, useState } from "react";
import azkarData from "../data/azkar.json";
import "./Azkar.css";

export default function Azkar() {
  const [sections, setSections] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // نحول الـ object (اللي فيه keys زي "أذكار الصباح") إلى array
    const transformed = Object.entries(azkarData).map(([category, zekrs]) => ({
      category,
      zekr: zekrs.flat(), // علشان بعض القيم جواها arrays تانية
    }));
    setSections(transformed);
  }, []);

  if (!sections.length) return <p>لا توجد أذكار متاحة حالياً.</p>;

  const selectedSection = sections[selectedIndex];

  return (
    <div className="azkar-container">
      <aside className="azkar-sidebar">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`azkar-tab ${index === selectedIndex ? "active" : ""}`}
            onClick={() => setSelectedIndex(index)}
          >
            {section.category}
          </button>
        ))}
      </aside>

      <main className="azkar-content">
        <h2>{selectedSection.category}</h2>
        {selectedSection.zekr.map((item, idx) => (
          <div key={idx} className="zekr-card">
            <p className="zekr-text">{item.content}</p>
            {item.count && (
              <p className="zekr-count">📿 التكرار: {item.count}</p>
            )}
            {item.description && (
              <p className="zekr-description">✨ الفضل: {item.description}</p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
