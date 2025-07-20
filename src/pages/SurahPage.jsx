import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SurahPage.css";

export default function SurahPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurah = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ar`);
        const json = await res.json();

        if (json?.status !== "OK") {
          setError("لم يتم العثور على بيانات السورة.");
        } else {
          const ayahs = json.data.ayahs.map((ayah, index) => {
            // نحذف البسملة من أول آية إن وُجدت (لمنع تكرارها)
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

  if (loading) return <p className="loading">جارٍ تحميل السورة...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="surah-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← رجوع
      </button>

      <h2 className="surah-title">{surah.name}</h2>

      {surah.number !== 9 && (
        <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
      )}

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
