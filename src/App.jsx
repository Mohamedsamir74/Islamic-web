import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrayerTimes from "./components/PrayerTimes";
import Azkar from "./pages/Azkar"; // ✅ بعد النقل

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrayerTimes />} />
        <Route path="/prayer-times" element={<PrayerTimes />} />{" "}
        <Route path="/azkar" element={<Azkar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
