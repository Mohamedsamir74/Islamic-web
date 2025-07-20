import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SurahPage.css";

export default function SurahPage() {
  // Get the surah ID from the URL parameters
  const { id } = useParams();

  // Used for navigation (back button)
  const navigate = useNavigate();

  // State to store surah data
  const [surah, setSurah] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch surah data when component mounts or id changes
  useEffect(() => {
    const fetchSurah = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ar`);
        const json = await res.json();

        if (json?.status !== "OK") {
          // If API returns unexpected status
          setError("لم يتم العثور على بيانات السورة.");
        } else {
          // Remove the Basmala from the first ayah if it exists
          const ayahs = json.data.ayahs.map((ayah, index) => {
            if (
              index === 0 &&
              ayah.text.startsWith("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ")
            ) {
              return {
                ...ayah,
                text: ayah.text
                  .replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "")
                  .trim(),
              };
            }
            return ayah;
          });

          // Save surah info to state
          setSurah({
            number: json.data.number,
            name: json.data.name,
            ayahs,
          });
        }
      } catch (e) {
        console.error(e);
        setError("حدث خطأ أثناء تحميل السورة.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [id]);

  // Loading state
  if (loading) return <p className="loading">جارٍ تحميل السورة...</p>;

  // Error state
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="surah-container">
      {/* Back button to go to previous page */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← رجوع
      </button>

      {/* Surah title */}
      <h2 className="surah-title">{surah.name}</h2>

      {/* Basmala - displayed unless surah is At-Tawbah (surah 9) */}
      {surah.number !== 9 && (
        <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      )}

      {/* Display all ayahs */}
      <div className="ayahs">
        {surah.ayahs.map((ayah) => (
          <p key={ayah.number} className="ayah">
            {ayah.text} ﴿{ayah.numberInSurah}﴾
          </p>
        ))}
      </div>
    </div>
  );
}
