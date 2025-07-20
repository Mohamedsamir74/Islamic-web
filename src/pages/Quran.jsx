import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Quran.css";

export default function Quran() {
  const [surahs, setSurahs] = useState([]);
  const [surah, setSurah] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.quran.gading.dev/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`https://api.quran.gading.dev/surah/${id}`)
        .then((res) => res.json())
        .then((data) => setSurah(data.data));
    } else {
      setSurah(null); // Reset if no id
    }
  }, [id]);

  return (
    <div className="quran-container">
      <div className="surah-list">
        {surahs.map((s) => (
          <button key={s.number} onClick={() => navigate(`/quran/${s.number}`)}>
            {s.name.short}
          </button>
        ))}
      </div>

      <div className="surah-content">
        {surah ? (
          <>
            <h2>{surah.name.long}</h2>
            {surah.verses.map((ayah) => (
              <p key={ayah.number.inSurah}>
                {ayah.text.ar} ﴿{ayah.number.inSurah}﴾
              </p>
            ))}
          </>
        ) : (
          <p>اختر سورة من القائمة</p>
        )}
      </div>
    </div>
  );
}
