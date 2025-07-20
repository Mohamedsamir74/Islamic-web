import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrayerTimes from "./components/PrayerTimes";
import Azkar from "./pages/Azkar";
import Scholar from "./pages/Scholar";
import Quran from "./pages/Quran";
import SurahPage from "./pages/SurahPage";
import Contact from "./pages/Contact"; // ✅ أضف الاستيراد هنا

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrayerTimes />} />
        <Route path="/prayer-times" element={<PrayerTimes />} />
        <Route path="/azkar" element={<Azkar />} />
        <Route path="/scholar" element={<Scholar />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/quran/:id" element={<SurahPage />} />
        <Route path="/contact" element={<Contact />} /> {/* ✅ أضف هذا السطر */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
