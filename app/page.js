"use client";

import { useState } from "react";

export default function Home() {
  const [slots, setSlots] = useState(["-", "-", "-", "-", "-", "-"]);
  const [result, setResult] = useState(["-", "-", "-", "-", "-", "-"]);

  const handleSpin = () => {
    const newId = String(Math.floor(100000 + Math.random() * 900000)).split("");
    setSlots(["?", "?", "?", "?", "?", "?"]);

    setTimeout(() => {
      setSlots(newId);
      setResult(newId);
    }, 900);
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="header-title">Cam Pha Cement Company</div>
        <div className="header-sub">Year-End Lucky Draw 2024</div>
      </div>

      {/* Status */}
      <div style={{ textAlign: "center", marginBottom: 20, opacity: 0.8 }}>
        ⭐ Ready to draw
      </div>

      {/* 6 Slots */}
      <div className="box-wrapper">
        {slots.map((n, i) => (
          <div key={i} className="slot">{n}</div>
        ))}
      </div>

      {/* Spin Button */}
      <button className="spin-btn" onClick={handleSpin}>
        🎉 Spin Now
      </button>

      {/* Result panel */}
      <div className="result-panel">
        <div className="result-title">🏆 Winning Employee ID</div>

        <div className="result-box">
          {result.map((n, i) => (
            <div key={i} className="slot" style={{ width: 60, height: 90 }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
