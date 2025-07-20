import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Quran.css";

export default function Quran() {
  // State to store the list of all surahs
  const [surahs, setSurahs] = useState([]);

  // State to store the currently selected surah's details
  const [surah, setSurah] = useState(null);

  // Get the surah ID from the route parameters
  const { id } = useParams();

  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Fetch all surahs when component mounts
  useEffect(() => {
    fetch("https://api.quran.gading.dev/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  // Fetch specific surah details when ID changes
  useEffect(() => {
    if (id) {
      fetch(`https://api.quran.gading.dev/surah/${id}`)
        .then((res) => res.json())
        .then((data) => setSurah(data.data));
    } else {
      setSurah(null); // Reset if no surah selected
    }
  }, [id]);

  return (
    <div className="quran-container">
      {/* Sidebar / Surah list */}
      <div className="surah-list">
        {surahs.map((s) => (
          <button key={s.number} onClick={() => navigate(`/quran/${s.number}`)}>
            {s.name.short}
          </button>
        ))}
      </div>

      {/* Surah content */}
      <div className="surah-content">
        {surah ? (
          <>
            {/* Surah title */}
            <h2>{surah.name.long}</h2>

            {/* List of ayat */}
            {surah.verses.map((ayah) => (
              <p key={ayah.number.inSurah}>
                {ayah.text.ar} ﴿{ayah.number.inSurah}﴾
              </p>
            ))}
          </>
        ) : (
          // Message if no surah selected
          <p>اختر سورة من القائمة</p>
        )}
      </div>
    </div>
  );
}
