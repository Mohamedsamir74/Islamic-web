import { useEffect, useState } from "react";
import azkarData from "../data/azkar.json";
import "./Azkar.css";

export default function Azkar() {
  // State to hold all azkar sections
  const [sections, setSections] = useState([]);
  // State to track the currently selected category
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Convert the azkar JSON object into an array of sections
    // Each key (like "أذكار الصباح") becomes a category
    // Some zekr values are nested arrays, so we flatten them
    const transformed = Object.entries(azkarData).map(([category, zekrs]) => ({
      category,
      zekr: zekrs.flat(),
    }));
    setSections(transformed);
  }, []);

  // Show a fallback message if no sections are available
  if (!sections.length) return <p>No Azkar available at the moment.</p>;

  const selectedSection = sections[selectedIndex];

  return (
    <div className="azkar-container">
      {/* Sidebar to display category buttons */}
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

      {/* Main content for displaying selected Azkar */}
      <main className="azkar-content">
        <h2>{selectedSection.category}</h2>
        {selectedSection.zekr.map((item, idx) => (
          <div key={idx} className="zekr-card">
            <p className="zekr-text">{item.content}</p>

            {/* Optional repetition count */}
            {item.count && <p className="zekr-count">📿 Count: {item.count}</p>}

            {/* Optional virtue/description */}
            {item.description && (
              <p className="zekr-description">✨ Virtue: {item.description}</p>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
