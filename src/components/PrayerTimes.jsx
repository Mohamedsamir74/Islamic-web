import "./prayertimes.css";
import PrayerTimeCard from "./PrayerTimeCard";
import { useEffect, useState } from "react";

// List of supported cities
const cities = [
  { name: "القاهرة", value: "Cairo" },
  { name: "الإسكندرية", value: "Alexandria" },
  { name: "الجيزة", value: "Giza" },
  { name: "أسوان", value: "Aswan" },
];

// Convert time from 24-hour format to 12-hour format with AM/PM (ص/م)
function formatTo12Hour(time) {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "م" : "ص";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function PrayerTimes() {
  const [prayers, setPrayers] = useState([]); // Holds prayer times
  const [selectedCity, setSelectedCity] = useState("Cairo"); // Currently selected city
  const [currentTime, setCurrentTime] = useState(""); // Current time display

  // Fetch prayer times whenever selectedCity changes
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Egypt&method=5`
        );
        const data = await response.json();
        const timings = data.data.timings;

        // Set only the five main daily prayers
        setPrayers([
          { name: "الفجر", time: timings.Fajr },
          { name: "الظهر", time: timings.Dhuhr },
          { name: "العصر", time: timings.Asr },
          { name: "المغرب", time: timings.Maghrib },
          { name: "العشاء", time: timings.Isha },
        ]);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity]);

  // Update and display the current time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    };

    updateTime(); // Run immediately
    const intervalId = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <section>
      <div className="container">
        {/* Top section: city selection and current date */}
        <div className="top-sec">
          <div className="city">
            <h3>المدينة</h3>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city_obj) => (
                <option value={city_obj.value} key={city_obj.value}>
                  {city_obj.name}
                </option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{new Date().toLocaleDateString("ar-EG")}</h4>
          </div>
        </div>

        {/* Display current time */}
        <div className="current-time">الوقت الحالي: {currentTime}</div>

        {/* Render prayer cards */}
        <div className="prayer-times">
          {prayers.map((prayer) => (
            <PrayerTimeCard
              key={prayer.name}
              name={prayer.name}
              time={formatTo12Hour(prayer.time)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
